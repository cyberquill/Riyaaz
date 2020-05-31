import React, { Component } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { withRouter } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import {
    set_volume,
    toggle_playing_state,
    goto_prev,
    goto_next,
} from '../../../redux/actions/PLAY actions';
import isEmpty from '../../../util/isEmpty';
import './player.scss';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: null,
            gainNode: null,
            source: null,
            debounce: false,
            lastplay: null,
        };
    }
    //==========================================================================
    componentDidMount() {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const gainNode = context.createGain();
        console.log('INIT VOL:', this.props.PLAY.volume);
        gainNode.gain.value = this.props.PLAY.volume === 0 ? 0 : this.props.PLAY.volume / 100;
        this.setState({ context, gainNode });
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (this.props.PLAY.set && !isEmpty(this.props.PLAY.queue.songs)) {
            if (!prevProps.PLAY.queue.songs)
                this.start_song();
            else if (
                this.props.PLAY.queue.songs[this.props.PLAY.playing] !==
                prevProps.PLAY.queue.songs[prevProps.PLAY.playing]
            )
                this.start_song();
        } else
            this.close_audio();
    }
    //==========================================================================
    start_song = async () => {
        if(this.state.debounce)     return;
        if (this.state.lastplay === this.props.PLAY.queue.songs[this.props.PLAY.playing])   return;
        
        const { context, gainNode } = this.state;
        if (
            isEmpty(this.props.DIR.path) ||
            isEmpty(this.props.PLAY.queue) ||
            isEmpty(this.props.PLAY.playing)
        )
            return;

        this.setState({ debounce: true });
        if(this.state.source)   
            try {
                this.state.source.stop();
                this.state.source.disconnect();
            } catch (error) {}
        this.setState({lastplay: this.props.PLAY.queue.songs[this.props.PLAY.playing]});
        const rawBuffer = fs.readFileSync(
            this.props.DIR.path + '/' + this.props.PLAY.queue.songs[this.props.PLAY.playing],
        ).buffer;
        const audioBuffer = await context.decodeAudioData(rawBuffer);

        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(gainNode).connect(context.destination);

        source.start();
        this.setState({ source, debounce: false });
    };
    //==========================================================================
    close_audio = async () => {
        try {
            this.state.source.stop();
            this.setState({ source: null });
        } catch(e) {}
    };
    //==========================================================================
    gotoPrev = () => {
        if(this.state.debounce) return;
        this.close_audio();
        this.props.goto_prev();
        this.start_song();
    };
    gotoNext = () => {
        if (this.state.debounce) return;
        this.close_audio();
        this.props.goto_next();
        this.start_song();
    };
    togglePlayingState = () => {
        if (this.state.debounce) return;
        this.setState({ debounce: true });
        if (this.props.PLAY.is_playing) this.state.context.suspend();
        else this.state.context.resume();
        this.props.toggle_playing_state();
        this.setState({ debounce: false });
    };
    //==========================================================================
    // handleVolumeChange = (event, volume) => this.setState({ volume });
    handleVolumeCommit = (event, volume) => this.props.set_volume(Math.round(volume));
    handleVolumeChange = (event, volume) => {
        const { gainNode } = this.state;
        gainNode.gain.value = volume === 0 ? 0 : volume / 100;
        this.setState({ gainNode });
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
                        value={this.state.gainNode.gain.value*100}
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
