import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './navbar/Navbar'
import Main from './main/Main'
import NewCard from './new_offer_card/NewCard';
import MyStatus from './my_status/MyStatus';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if(networkData) {
      
      const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address)
      this.setState({ decentragram })
      

      // get number of cards (=cardsCount)

      this.setState({ loading: false})
     
      // Load images
      // for (var i = 1; i <= cardsCount; i++) {
      //   const image = await simpleStorage.methods.images(i).call()
      //   this.setState({
      //     images: [...this.state.images, image]
      //   })
      // }
      // Sort images. Show highest rate cards first
     
      // this.setState({
      //   images: this.state.images.sort((a,b) => b.rate - a.rate )
      // })
    } else {
      window.alert('SimpleStorage contract not deployed to detected network.')
    }
  }



  // indorceSeller(cardId) {
  //   this.setState({ loading: true })
  //   this.state.simpleStorage.methods.indorceSeller(cardId)
  //   })
  // }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      simpleStorage: null,
      images: [],
      loading: true
    }

    // this.uploadImage = this.uploadImage.bind(this)
    // this.tipImageOwner = this.tipImageOwner.bind(this)
    // this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div style={{margin:'0', padding:'0'}}>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <div>
            <Main />
            {/* <Card/> */}
            </div>
        }
      </div>
    );
  }
}

export default App;