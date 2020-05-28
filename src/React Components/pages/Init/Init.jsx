import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import Loader1 from '../../Layouts/Loader1/Loader1';
import './init.scss';

class Init extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    dirSelectHandler(event) {
        let dir = document.getElementById('dir').files[0].path;
        const idx = dir.lastIndexOf('\\');
        dir = dir.slice(0, idx);
        this.props.updateDIR(dir);
    }

    render() {
        if (this.props.dir_set) return <Redirect to='/home' />;

        return (
            <div className='init'>
                <div className='init__window'>
                    <div className='init__msg'>Please select the Music Directory:</div>
                    <input
                        type='file'
                        id='dir'
                        directory=''
                        webkitdirectory=''
                        style={{ display: 'none' }}
                        onChange={this.dirSelectHandler.bind(this)}
                        ref={(dirInput) => (this.dirInput = dirInput)}
                    />
                    <button href='#' className='init__btn' onClick={() => this.dirInput.click()}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Select Directory
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Init);
