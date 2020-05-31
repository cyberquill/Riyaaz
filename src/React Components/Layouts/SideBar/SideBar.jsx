import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clear_DIR } from '../../../redux/actions/DIR actions';
import {
    load_playlists,
    sample_display,
    update_params,
    clear_playlists,
} from '../../../redux/actions/PLAYLIST actions';
import './sidebar.scss';
import icon from '../../../Assets/icon1.jpg';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //==========================================================================
    restartRL = () => {
        this.props.clear_playlists();
        this.props.load_playlists(this.props.DIR.path);
        this.props.sample_display();
    };
    refreshR = () => {
        this.props.update_params();
        this.props.sample_display();
    };
    clearDir = () => this.props.clear_DIR();
    //==========================================================================
    render() {
        return (
            <div className='sidebar'>
                <div className='sidebar__icon'>
                    <img src={icon} alt='' className='sidebar__icon--img' />
                </div>
                <div className='sidebar__heading1'>Music Player</div>
                <div className='sidebar__heading2'>
                    Made By:
                    <br />
                    Brijgopal Bharadwaj
                    <br />
                    Session:&nbsp;{this.props.PLAYLIST.nSession + 1}
                </div>
                <div className='sidebar__options'>
                    <div className='sidebar__options--link' onClick={this.refreshR}>
                        Refresh Recommendations
                    </div>
                    <div className='sidebar__options--link' onClick={this.restartRL}>
                        Restart Reinforcement Learning
                    </div>
                    <div className='sidebar__options--link' onClick={this.clearDir}>
                        Disconnect Music Directory
                    </div>
                </div>
            </div>
        );
    }
}
//==========================================================================
const mapStatesToProps = (store) => ({
    DIR: store.DIR,
    PLAYLIST: store.PLAYLIST,
    ERROR: store.ERROR,
});
//==========================================================================
export default connect(mapStatesToProps, {
    clear_DIR,
    load_playlists,
    sample_display,
    update_params,
    clear_playlists,
})(withRouter(SideBar));
