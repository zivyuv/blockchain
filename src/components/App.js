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
import * as fs from 'fs'
// Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient()
// leaving out the arguments will default to these values

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
                
                // Load users
                for (var i = 1; i <= usersCount; i++) {
                    const user = await giveNTake.methods.users(i).call()
                    this.setState({
                        users: [
                            ...this.state.users,
                            user
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


    addUserIpfs(userName, password) {
        var reader = new FileReader();
        fs.writeFile('./users_db/curr_user.json', 
        JSON.stringify({
            'user': userName,
            'password': password
        }), function (err) {
            if (err) {
                alert('ipfs error\n' + err)
            }
        });
        reader.readAsArrayBuffer('./users_db/curr_user.json')
        reader.onloadend = () => {
            this.setState({
                buffer: Buffer(reader.result)
            })
            console.log('buffer', this.state.buffer)
        }
    }

    addUser(userName, password) { // store user in ipfs
        this.addUserIpfs( userName, password )

        ipfs.add(this.state.buffer, (error, result) => {
            console.log('Ipfs result', result)
            if (error) {
                console.error(error)
                return
            }

            this.setState({loading: true})
            fs.writeFile('./users_db/users_hash', 
            JSON.stringify({
                'user': userName,
                'password': password,
                'userHash': result[0].hash
            }), function (err) {
                if (err) {
                    alert('ipfs error\n' + err)
                }
            });
            this.state.giveNTake.methods.addUser(result[0].hash, userName).send({from: this.state.account}).on('transactionHash', (hash) => {
                window.location.reload(false)
                this.setState({loading: false})
            })
            this.setState({loading: true})
        })
    }
    
    processData(content, userName, password) {
        const allUsers = content.users
        for (var i=0; i<allUsers.length; i++) {
            if (allUsers[i].userName == userName && allUsers[i].password == password) {
                const userHash = allUsers[i].userHash
                for (var j=0; j<this.state.users.length; j++) {
                    if (this.state.users[j].userHash == userHash) {
                        this.setState({ user: this.state.users[j] })
                    }
                }
                
            }
        }
        window.alert("wrong details")
    }

    setLogin(userName, password) {
        fs.readFile('./users_db/users_hash', 'utf-8', function (err, data){
            if (err) {
                console.log('failed to read users file')
            }
            else {
                const content = JSON.parse(data);
                this.processData(content, userName, password)
            }
        })
    }

    setLogout() {
        this.setState({ userIndex: null })
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
            user: null,
            giveNTake: null,
            users: [],
            cards: [],
            usersCount: 0,
            loading: true
        }

        this.addUser = this.addUser.bind(this)
        this.setLogin = this.setLogin.bind(this)
        this.setLogout = this.setLogout.bind(this)
        this.postOffer = this.postOffer.bind(this)
        this.buyOffer = this.buyOffer.bind(this)

        // this.tipImageOwner = this.tipImageOwner.bind(this)
        // this.captureFile = this.captureFile.bind(this)
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
        const cards = this.state.cards
        const addUser = this.addUser
        const postOffer = this.postOffer
        const buyOffer = this.buyOffer
        const setLogin = this.setLogin
        const setLogout = this.setLogout
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
                        <Navbar setLogout={setLogout}/> {
                        this.state.loading ? <div id="loader" className="text-center mt-5">
                            <p>Loading...</p>
                        </div> : <div>
                            <Main 
                                cards={cards}
                                usersCount={
                                    this.state.usersCount
                                }
                                giveNTake={
                                    this.state.giveNTake
                                }
                                user={
                                    this.state.user
                                }
                                postOffer={postOffer}
                                setLogin={setLogin}
                                buyOffer={buyOffer}/>
                        </div>
                    } </div>
                </accountContext.Provider>
            </AuthContextProvider>
        );
    }
}


export default App;
