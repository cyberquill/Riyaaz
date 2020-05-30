import React, { Component } from 'react'

class RecentList extends Component {
    render() {
        return (
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
        );
    }
}

export default RecentList;