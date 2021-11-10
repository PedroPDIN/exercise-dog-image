import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loadingMessage: true,
      dogs: '',
    };
    this.fetchDog = this.fetchDog.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (nextState.dogs.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { dogs, loadingMessage } = this.state;
    localStorage.setItem('dogImage', dogs);
    const breed = dogs.split('/')[4];
    if (loadingMessage === false) alert(`Raça: ${breed}`);
  }

  fetchDog() {
    this.setState({ loadingMessage: true }, () => fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((value) => this.setState({
        dogs: value.message,
        loadingMessage: false,
      })));
  }

  render() {
    const { dogs, loadingMessage } = this.state;
    const LOADING = 'Loading...';
    const image = <img src={ dogs } alt="dogs random" />;
    return (
      <div>
        <h1>Dogs</h1>
        <span>{loadingMessage ? LOADING : image}</span>
        <br />
        <br />
        <button onClick={this.fetchDog} type="button">Next dog</button>
      </div>
    );
  }

}

export default App;
