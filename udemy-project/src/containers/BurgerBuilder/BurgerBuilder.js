import React, { Component } from 'react';
import Aux from '../../hoc/aux';

class BurgerBuilder extends Component {
  render () {
    return (
      <Aux>
        <div>Burger I'm building</div>
        <div>Build controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;