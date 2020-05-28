import React, { Component } from 'react';
import img1 from '../../../Assets/4.jpg';
import img2 from '../../../Assets/6.jpg';
import img3 from '../../../Assets/5.jpg';
import img4 from '../../../Assets/2.jpg';
import img5 from '../../../Assets/3.jpg';
import img6 from '../../../Assets/7.jpg';
import './home.scss';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='home__wrapper'>
                    <div className='home__nav'></div>
                    <div className='home__container'>
                        <div className='home__search'></div>
                        <div className='rec_playlists'>
                            <div className='rec_playlists__header'>Playlists Made For You:</div>
                            <div className='rec_playlists__item-wrapper'>
                                <div className='rec_playlists__item'>
                                    <img src={img1} className='rec_playlists__item--img' />
                                </div>
                                <div className='rec_playlists__item'>
                                    <img src={img2} className='rec_playlists__item--img' />
                                </div>
                                <div className='rec_playlists__item'>
                                    <img src={img3} className='rec_playlists__item--img' />
                                </div>
                                <div className='rec_playlists__item'>
                                    <img src={img4} className='rec_playlists__item--img' />
                                </div>
                                <div className='rec_playlists__item'>
                                    <img src={img5} className='rec_playlists__item--img' />
                                </div>
                                <div className='rec_playlists__item'>
                                    <img src={img6} className='rec_playlists__item--img' />
                                </div>
                            </div>
                        </div>
                        <div className='home__section'>
                            <div className='toplist'>
                                <div className='toplist__header'>Top List:</div>
                                <div className='songs'>
                                    <div className='song'>
                                        <div className='title'>Title 1</div>
                                        <div className='artist'>Artist 1</div>
                                        <div className='album'>Album 1</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 2</div>
                                        <div className='artist'>Artist 2</div>
                                        <div className='album'>Album 2</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 3</div>
                                        <div className='artist'>Artist 3</div>
                                        <div className='album'>Album 3</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 4</div>
                                        <div className='artist'>Artist 4</div>
                                        <div className='album'>Album 4</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 5</div>
                                        <div className='artist'>Artist 5</div>
                                        <div className='album'>Album 5</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 6</div>
                                        <div className='artist'>Artist 6</div>
                                        <div className='album'>Album 6</div>
                                    </div>
                                </div>
                            </div>
                            <div className='recent'>
                                <div className='recent__header'>Recents:</div>
                                <div className='songs'>
                                    <div className='song'>
                                        <div className='title'>Title 1</div>
                                        <div className='artist'>Artist 1</div>
                                        <div className='album'>Album 1</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 2</div>
                                        <div className='artist'>Artist 2</div>
                                        <div className='album'>Album 2</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 3</div>
                                        <div className='artist'>Artist 3</div>
                                        <div className='album'>Album 3</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 4</div>
                                        <div className='artist'>Artist 4</div>
                                        <div className='album'>Album 4</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 5</div>
                                        <div className='artist'>Artist 5</div>
                                        <div className='album'>Album 5</div>
                                    </div>
                                    <div className='song'>
                                        <div className='title'>Title 6</div>
                                        <div className='artist'>Artist 6</div>
                                        <div className='album'>Album 6</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home__player'></div>
            </div>
        );
    }
}

export default Home;