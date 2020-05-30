import React, { Component } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { withRouter, Redirect } from 'react-router-dom';
import './player.scss';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.audio = null;
    }
    //==========================================================================
    componentDidMount() {}
    //==========================================================================
    playSong = async (index) => {
        AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const rawBuffer = fs.readFileSync(this.props.DIR.path + '/Vuelie.mp3').buffer;
        const audioBuffer = await audioContext.decodeAudioData(rawBuffer);

        this.audio = audioContext.createBufferSource();
        this.audio.buffer = audioBuffer;
        this.audio.connect(audioContext.destination);

        // play audio
        this.audio.start();
    };
    //==========================================================================
    render() {
        return (
            <div className='player'>
                <div className='player__info'></div>
                <div className='player__controls'>
                    <div className='player__controls__btn'>
                        <i className='fa fa-step-backward' aria-hidden='true'></i>
                    </div>
                    <div className='player__controls__btn'>
                        <i className='fa fa-play' aria-hidden='true'></i>
                    </div>
                    <div className='player__controls__btn'>
                        <i className='fa fa-step-forward' aria-hidden='true'></i>
                    </div>
                </div>
                <div className='player__volume'></div>
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
export default connect(mapStatesToProps, {})(withRouter(Player));
