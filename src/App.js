import React, { Component } from 'react';
import fs from 'fs';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        const op = fs.readFileSync(__dirname+'/someData.txt', {encoding: 'utf-8'});
        console.log(op);
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className='App-link'
                        href='https://reactjs.org'
                        target='_blank'
                        rel='noopener noreferrer'>
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
