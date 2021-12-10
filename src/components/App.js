import React, {Component} from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import GiveNTake from '../abis/GiveNTake.json'
import Navbar from './navbar/Navbar'
import Main from './main/Main'
import NewCard from './new_offer_card/NewCard';
import MyStatus from './my_status/MyStatus';
import {accountContext} from './AccountContext';

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        // Network ID
        const networkId = await web3.eth.net.getId()
        const networkData = GiveNTake.networks[networkId]
        if (networkData) {

            const giveNTake = new web3.eth.Contract(GiveNTake.abi, networkData.address)
            this.setState({giveNTake})


            // get number of cards (=cardsCount)
            const usersCount = await giveNTake.methods.usersCount().call()
            this.setState({usersCount})

            console.log(usersCount)


            this.setState({loading: false})

            // Load images
            // for (var i = 1; i <= cardsCount; i++) {
            // const image = await simpleStorage.methods.images(i).call()
            // this.setState({
            //     images: [...this.state.images, image]
            // })
            // }
            // Sort images. Show highest rate cards first

            // this.setState({
            // images: this.state.images.sort((a,b) => b.rate - a.rate )
            // })
        } else {
            window.alert('SimpleStorage contract not deployed to detected network.')
        }
    }




    addUser = userName => {
        this.setState({loading: true})
        this.state.giveNTake.methods.addUser(userName).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    }

    async setAccount(accountIndex) {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      accountIndex < accounts.length && accountIndex >= 0 ? 
        this.setState({account: accounts[accountIndex]})
        : alert("This is not a valid account number")
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
            giveNTake: null,
            cards: [],
            usersCount: 0,
            loading: true,
        }

        this.addUser = this.addUser.bind(this)
        this.setAccount = this.setAccount.bind(this);

        // this.tipImageOwner = this.tipImageOwner.bind(this)
        // this.captureFile = this.captureFile.bind(this)
    }

    render() {
        const account = this.state.account
        const setAccount = this.setAccount
        return (
            <accountContext.Provider value={{account, setAccount}} >
                <div style={
                    {
                        margin: '0',
                        padding: '0'
                    }
                }>
                    <Navbar account={
                        this.state.account
                    }/> {
                    this.state.loading ? <div id="loader" className="text-center mt-5">
                        <p>Loading...</p>
                    </div> : <div>
                        <Main account={
                                this.state.account
                            }
                            usersCount={
                                this.state.usersCount
                            }/>
                    </div>
                } </div>
            </accountContext.Provider>
        );
    }
}

export default App;
