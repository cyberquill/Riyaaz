import React from 'react';
import './loader1.scss';

export default function Loader1() {
    return (
        <div className='loader1__wrapper'>
            <div className='loader1__text'>Loading...</div>
            <div className='loader1'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
