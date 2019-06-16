import React, { Component } from 'react';
import loading from './loading.svg';

export default class Callback extends Component {

  render() {
    return (
      <div style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        height: '98vh',
        width: '98vw',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
      }}
      >
        <img src={loading} alt="loading" />
      </div>
    );
  }
}