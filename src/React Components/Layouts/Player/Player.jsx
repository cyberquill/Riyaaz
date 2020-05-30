import React, { Component } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { withRouter } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import isEmpty from '../../../util/isEmpty';
import {
    set_volume,
    toggle_playing_state,
    goto_prev,
    goto_next,
} from '../../../redux/actions/PLAY actions';
import './player.scss';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 100,
        };
        this.audio = null;
        this.gainNode = null;
        this.audioContext = null;
    }
    //==========================================================================
    componentDidMount() {
        if (this.props.PLAY.set) {
            this.setState({ volume: this.props.PLAY.volume });
            this.init_song();
        }
    }
    //==========================================================================
    async componentDidUpdate(prevProps) {
        const { set, playing, queue } = this.props.PLAY;
        if (set && queue.songs) {
            if (!prevProps.PLAY.queue.songs) this.init_song();
            else if (queue.songs[playing] !== prevProps.PLAY.queue.songs[prevProps.PLAY.playing]) {
                this.init_song();
            }
        }
    }
    //==========================================================================
    init_song = async () => {
        const { playing, queue, is_playing } = this.props.PLAY;
        const { path } = this.props.DIR;
        if (isEmpty(this.audio) && isEmpty(this.audioContext) && isEmpty(this.gainNode)) {
            AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            const rawBuffer = fs.readFileSync(path + '/' + queue.songs[playing]).buffer;
            const audioBuffer = await this.audioContext.decodeAudioData(rawBuffer);

            this.audio = this.audioContext.createBufferSource();
            this.audio.buffer = audioBuffer;
            this.gainNode = this.audioContext.createGain();
            this.audio.connect(this.gainNode).connect(this.audioContext.destination);

            if (is_playing) this.audio.start();
        }
    };
    //==========================================================================
    clear_audio = () => {
        return new Promise(async (resolve, reject) => {
            await this.audioContext.close();
            this.audio = null;
            this.gainNode = null;
            this.audioContext = null;
            resolve();
        });
    };
    //==========================================================================
    gotoPrev = async () => {
        await this.clear_audio();
        this.props.goto_prev();
    };
    gotoNext = async () => {
        await this.clear_audio();
        this.props.goto_next();
    };
    togglePlayingState = async () => {
        if (this.props.PLAY.is_playing) await this.audioContext.suspend();
        else await this.audioContext.resume();
        this.props.toggle_playing_state();
    };
    //==========================================================================
    handleVolumeChange = (event, volume) => this.setState({ volume });
    handleVolumeCommit = (event, value) => {
        if (this.gainNode) this.gainNode.gain.value = value === 0 ? 0 : value / 100;
        this.setState({ volume: value });
        this.props.set_volume(value);
    };
    //==========================================================================
    render() {
        const { set, playing, queue, is_playing } = this.props.PLAY;
        if (!set) return <div className='player'></div>;

        const song_name = set ? queue.songs[playing] : null;
        return (
            <div className='player'>
                <div className='player__info'>
                    <div className='player__info__name'>{song_name}</div>
                    <div className='player__info__dir'>{this.props.DIR.path}</div>
                </div>
                <div className='player__controls'>
                    <div className='player__controls__btn' onClick={this.gotoPrev}>
                        <i className='fa fa-step-backward' aria-hidden='true'></i>
                    </div>
                    <div className='player__controls__btn' onClick={this.togglePlayingState}>
                        {is_playing ? (
                            <i className='fa fa-pause' aria-hidden='true'></i>
                        ) : (
                            <i className='fa fa-play' aria-hidden='true'></i>
                        )}
                    </div>
                    <div className='player__controls__btn' onClick={this.gotoNext}>
                        <i className='fa fa-step-forward' aria-hidden='true'></i>
                    </div>
                </div>
                <div className='player__volume'>
                    <i className='fa fa-volume-off' aria-hidden='true'></i>
                    <Slider
                        value={this.state.volume}
                        color='secondary'
                        onChange={this.handleVolumeChange}
                        onChangeCommitted={this.handleVolumeCommit}
                        aria-labelledby='continuous-slider'
                    />
                    <i className='fa fa-volume-up' aria-hidden='true'></i>
                </div>
            </div>
        );
    }
}
//==========================================================================
const mapStatesToProps = (store) => ({
    DIR: store.DIR,
    PLAY: store.PLAY,
    PLAYLIST: store.PLAYLIST,
    ERROR: store.ERROR,
});
//==========================================================================
export default connect(mapStatesToProps, {
    set_volume,
    toggle_playing_state,
    goto_prev,
    goto_next,
})(withRouter(Player));
