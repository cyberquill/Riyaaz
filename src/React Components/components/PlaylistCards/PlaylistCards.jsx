import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mark_visited } from '../../../redux/actions/PLAYLIST actions';
import './playlist_cards.scss';

class PlaylistCards extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //==========================================================================
    componentDidMount() {}
    //==========================================================================
    playlistClickHandler(selected) {
        this.props.mark_visited(selected);
    }
    //==========================================================================
    render() {
        const items = this.props.PLAYLIST.display.map((pl, index) => (
            <div
                className='playlists__item'
                onClick={this.playlistClickHandler.bind(this, index)}
                key={`playlist ${pl.id}`}>
                <div className='playlists__item__image'>
                    <img
                        src={require(`../../../Assets/${pl.id}.jpg`)}
                        className='playlists__item__image--img'
                        title={`Position: ${index}\nPlaylist: ${pl.id}`}
                        alt=''
                    />
                </div>
                <div className='playlists__item__text'>Playlist&nbsp;&nbsp;#{index + 1}</div>
            </div>
        ));
        return (
            <div className='playlists'>
                <div className='playlists__header'>Playlists Made For You:</div>
                <div className='playlists__item-wrapper'>{items}</div>
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
export default connect(mapStatesToProps, { mark_visited })(withRouter(PlaylistCards));
