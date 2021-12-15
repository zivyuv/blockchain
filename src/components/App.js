import React, {Component} from 'react';
import Web3 from 'web3';
import './App.css';
import GiveNTake from '../abis/GiveNTake.json'
import Navbar from './navbar/Navbar'
import Main from './main/Main'
import NewCard from './new_offer_card/NewCard';
import MyStatus from './my_status/MyStatus';
import {accountContext} from './AccountContext';
import {AuthContextProvider} from './auth-context';
import {array} from 'fast-check';

class App extends Component {

    async componentWillMount() {
        const ans = await this.loadWeb3()
        await this.loadBlockchainData(ans)
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            return false
        }
        return true
    }

    async loadBlockchainData(ans) {
        if (ans == true) {

            const web3 = window.web3
            // Load account
            const accounts = await web3.eth.getAccounts()
            if (this.state.accounts.length == 0) {
                this.setState({account: "0xEeA8d6858c4E945eD024A74b1bB8f9BC974E52F0"})
            }
            else {
                this.setState({account: this.state.accounts[this.state.accountInd]})
            }
            // Network ID
            const networkId = await web3.eth.net.getId()
            const networkData = GiveNTake.networks[networkId]
            if (networkData) {
    
                const giveNTake = new web3.eth.Contract(GiveNTake.abi, networkData.address)
                this.setState({giveNTake})
    
    
                // get number of cards (=cardsCount)
                const usersCount = await giveNTake.methods.usersCount().call()
                this.setState({usersCount})
    
                const cardsCount = await giveNTake.methods.cardsCount().call()
                this.setState({cardsCount})
                console.log("cards count is " + cardsCount)
                this.setState({loading: false})
    
                // Load cards
                for (var i = 1; i <= cardsCount; i++) {
                    const card = await giveNTake.methods.cards(i).call()
                    this.setState({
                        cards: [
                            ...this.state.cards,
                            card
                        ]
                    })
                }
                
                // Sort images. Show highest rate cards first
    
                // this.setState({
                // cards: this.state.cards.sort((a,b) => b.rate - a.rate )
                // })
            } else {
                window.alert('SimpleStorage contract not deployed to detected network.')
            }
        }
    }


    async addUser(userName) {
        this.setState({loading: true})
        this.state.giveNTake.methods.addUser(userName).send({from: this.state.account}).on('transactionHash', (hash) => {
            window.location.reload(false)
            this.setState({loading: false})
        })
        this.setState({loading: true})

        const usersCountStr = await this.state.giveNTake.methods.usersCount().call()
        const usersCount = parseInt(usersCountStr)
        const allUsers = window.localStorage.getItem('UsersLogin')
        allUsers.replace('[', '{').replace(']', '}')
        const allUsersParsed = JSON.parse(allUsers)
        const currAddedUser = allUsersParsed[allUsersParsed.length - 1].userName

        let storedUsers = window.localStorage.UsersMap ? JSON.parse(window.localStorage.UsersMap) : [];
        storedUsers.push({
            userName: currAddedUser,
            userId: usersCount + 1
        });
        this.setState({
            userData: {
                userName: currAddedUser,
                userId: usersCount + 1
            }
        })
        window.localStorage.setItem('UsersMap', JSON.stringify(storedUsers));
        this.setState({loading: false})
        window.location.reload(false)
    }

    async postOffer(header, content, price) {
        this.setState({loading: true})
        this.state.giveNTake.methods.postOffer(header, content, price).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    }
   
    async buyOffer(cardId, price) {
        this.setState({loading: true})
        this.state.giveNTake.methods.buyOffer(cardId).send({from: this.state.account, value: price}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    }
    // indorceSeller(cardId) {
    // this.setState({ loading: true })
    // this.state.simpleStorage.methods.indorceSeller(cardId)
    // })
    // }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            accountInd: 0,
            accounts: [
                // "0xf587B25f57a6C14Dd4584DE6564B4714cF014E00",
                // "0x5493C922cAd3B7BbB30b6dcC015A1B26c7503317",
                // "0xb92D8d0c1aad3dfdD8eD16138199e1310E252442",
                // "0xEeA8d6858c4E945eD024A74b1bB8f9BC974E52F0",
                // "0xf652cdb0E3F1B6073261D7aeACb4C9cbcEfdF15B",
                // "0xE21e710523fD6640d7Cb47A1c85107B7e83E14A9",
                // "0xe63426e371dCFa8659B6bB28083E18c69C4F82E5",
                // "0x17EA74Bd9b07A63CcBDCB482247491d3888409C6",
                // "0x4Cb55324103C5Ff3500E2C7D17E6b2B738Be2579",
                // "0x77426DbAa6AF5Da94e93C5c231F8D6b830AaE3bF"
            ],
            userData: null,
            giveNTake: null,
            cards: [],
            usersCount: 0,
            loading: true
        }

        this.addUser = this.addUser.bind(this)
        this.postOffer = this.postOffer.bind(this)
        this.buyOffer = this.buyOffer.bind(this)

        // this.tipImageOwner = this.tipImageOwner.bind(this)
        // this.captureFile = this.captureFile.bind(this)
    }

    render() {
        if (this.state.account == '') { // user doesn't have Metamask
            return (
                <h2 className="text-center mt-5">
                    Sorry! <br/> You have to have Metamask
                    <br/> <h3>Please install and refresh</h3>
                </h2>
            );
        }

        const account = this.state.account
        const cards = this.state.cards
        const addUser = this.addUser
        const postOffer = this.postOffer
        const buyOffer = this.buyOffer
        return (
            <AuthContextProvider>
                <accountContext.Provider value={
                    {account, addUser}
                }>
                    <div style={
                        {
                            margin: '0',
                            padding: '0'
                        }
                    }>
                        <Navbar addUser={
                            this.addUser
                        }/> {
                        this.state.loading ? <div id="loader" className="text-center mt-5">
                            <p>Loading...</p>
                        </div> : <div>
                            <Main account={
                                    this.state.account
                                }
                                cards={
                                    cards
                                }
                                usersCount={
                                    this.state.usersCount
                                }
                                giveNTake={
                                    this.state.giveNTake
                                }
                                userData={
                                    this.state.userData
                                }
                                postOffer={postOffer}
                                buyOffer={buyOffer}/>
                        </div>
                    } </div>
                </accountContext.Provider>
            </AuthContextProvider>
        );
    }
}


export default App;
