import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { set_DIR, clear_DIR } from '../../../redux/actions/DIR actions';
import { clear_playlists } from '../../../redux/actions/PLAYLIST actions';
import './init.scss';

class Init extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //==========================================================================
    componentDidMount() {
        // this.props.clear_playlists();
        // this.props.clear_DIR();
    }
    //==========================================================================
    dirSelectHandler(event) {
        let dir = document.getElementById('dir').files[0].path;
        const idx = dir.lastIndexOf('\\');
        dir = dir.slice(0, idx);
        this.props.set_DIR(dir);
    }
    //==========================================================================
    render() {
        if (this.props.DIR.set) return <Redirect to='/home' />;

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
//==========================================================================
const mapStatesToProps = (store) => ({
    DIR: store.DIR,
    ERROR: store.ERROR,
});
//==========================================================================
export default connect(mapStatesToProps, { set_DIR, clear_DIR, clear_playlists })(withRouter(Init));
