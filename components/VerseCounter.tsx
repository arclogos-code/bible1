import React, { Component } from 'react';

class VerseCounter extends Component {
  state = {
    number: 1
  }

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <>
        {this.state.number}
      </>
    );
  }
}

export default VerseCounter;