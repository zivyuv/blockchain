import React, {Component} from 'react';
import Web3 from 'web3';
import './App.css';
import GiveNTake from '../abis/GiveNTake.json'
import Navbar from './navbar/Navbar'
import Main from './main/Main'
import {accountContext} from './AccountContext';

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

                const cardsCount = await giveNTake.methods.cardsCount().call()
                this.setState({cardsCount})

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

                // Load users
                for (var i = 1; i <= usersCount; i++) {
                    const user = await giveNTake.methods.users(i).call()
                    this.setState({
                        users: [
                            ...this.state.users,
                            user
                        ]
                    })
                    console.log(user)
                    if (user.owner == this.state.account) {
                        this.setState({user: user})
                    }
                }

                if (this.state.user) { // prevPurchases
                    const transactionsCount = await giveNTake.methods.transactionsCount().call()
                    for (var i = 1; i <= transactionsCount; i++) {
                        const transaction = await giveNTake.methods.transactions(i).call()
                        if (transaction.buyer.id == this.state.user.id) {
                            this.setState({
                                prevPurchases: [
                                    ...this.state.prevPurchases,
                                    transaction.card
                                ]
                            })
                        }
                    }


                }

                this.setState({loading: false})

                // Sort cards. Show highest rate cards first

                this.setState({
                    cards: this.state.cards.sort(
                        (a, b) => b.ownerRate - a.ownerRate
                    )
                })
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
    }


    async postOffer(header, content, price) {
        this.setState({loading: true})
        this.state.giveNTake.methods.postOffer(header, content, price).send({from: this.state.account}).on('transactionHash', (hash) => {
            window.location.reload(false)
            this.setState({loading: false})
        })
    }

    async buyOffer(cardId, price) {
        this.setState({loading: true})
        this.state.giveNTake.methods.buyOffer(cardId).send({from: this.state.account, value: price}).on('transactionHash', (hash) => {
            window.location.reload(false)
            this.setState({loading: false})
        })
    }

    async rateSeller(sellerId) {
        this.setState({loading: true})
        this.state.giveNTake.methods.rateSeller(sellerId).send({from: this.state.account}).on('transactionHash', (hash) => {
            window.location.reload(false)
            this.setState({loading: false})
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            user: null,
            prevPurchases: [],
            giveNTake: null,
            cards: [],
            users: [],
            usersCount: 0,
            cardsCount:0,
            loading: true
        }

        this.addUser = this.addUser.bind(this)
        this.postOffer = this.postOffer.bind(this)
        this.buyOffer = this.buyOffer.bind(this)
        this.rateSeller = this.rateSeller.bind(this)

    }

    render() {
        if (this.state.account == '') { // user doesn't have Metamask
            return (
                <h2 className="text-center mt-5">
                    Sorry!
                    <br/>
                    You have to have Metamask
                    <br/>
                    <h3>Please install and refresh</h3>
                </h2>
            );
        }
        const account = this.state.account
        const user = this.state.user
        const prevPurchases = this.state.prevPurchases
        const cards = this.state.cards
        const addUser = this.addUser
        const postOffer = this.postOffer
        const buyOffer = this.buyOffer
        const rateSeller = this.rateSeller

        return (
            <accountContext.Provider value={
                {
                    account,
                    user,
                    addUser,
                    rateSeller,
                    buyOffer,
                    prevPurchases
                }
            }>
                <div style={
                    {
                        margin: '0',
                        padding: '0'
                    }
                }>
                    <Navbar/> {
                    this.state.loading ? <div id="loader" className="text-center mt-5">
                        <p>Loading...</p>
                    </div> : <div>
                        <Main cards={cards}
                            usersCount={
                                this.state.usersCount
                            }
                            cardsCount={this.state.cardsCount}
                            giveNTake={
                                this.state.giveNTake
                            }
                            postOffer={postOffer}
                            buyOffer={buyOffer}/>
                    </div>
                } </div>
            </accountContext.Provider>
        );
    }
}


export default App;
