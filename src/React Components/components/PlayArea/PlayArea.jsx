import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { jStat } from 'jstat';
import Chart from 'react-apexcharts';
import { set_playing } from '../../../redux/actions/PLAY actions';
import play_GIF from '../../../Assets/playing.gif';
import linspace from '../../../util/linspace';
import './playarea.scss';

class PlayArea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //==========================================================================
    songClickHandler(index) {
        this.props.set_playing(index);
    }
    //==========================================================================
    getChartInput = () => {
        const { queue } = this.props.PLAY;
        const x = linspace(0.00001, 0.99999, 500);
        const series_data = new Array(queue.params.length);
        const precision = 10000;
        for (let j = 0; j < queue.params.length; j++) {
            const chart_data = new Array(x.length);
            for (let i = 0; i < x.length; i++)
                chart_data[i] = {
                    x: x[i],
                    y:
                        Math.round(
                            jStat.beta.pdf(x[i], queue.params[j][0], queue.params[j][1]) *
                                precision,
                        ) / precision,
                };
            series_data[j] = { name: `Slot ${j + 1}`, data: chart_data };
        }

        const chartInput = {
            series: series_data,
            options: {
                chart: {
                    height: '100%',
                    type: 'line',
                    /* animations: {
                        enabled: false,
                    }, */
                },
                colors: [
                    '#e81d62',
                    '#9c1ab1',
                    '#6633b9',
                    '#1093f5',
                    '#00bbd5',
                    '#46af4a',
                    '#88c440',
                    '#ccdd1e',
                    '#ffc100',
                    '#795446',
                    '#5e7c8b',
                    '#f34235',
                    '#3d4db7',
                    '#009687',
                    '#ffec16',
                ],
                stroke: {
                    show: true,
                    curve: 'smooth',
                    width: 2,
                },
                title: {
                    text: 'Beta Distribution:',
                },
                xaxis: {
                    type: 'numeric',
                    min: 0,
                    max: 1,
                    tickAmount: 5,
                    labels: {
                        formatter: function (value) {
                            return Math.round((value + Number.EPSILON) * 100) / 100;
                        },
                    },
                },
                yaxis: {
                    min: 0,
                    max: 5,
                    tickAmount: 5,
                    decimalsInFloat: 2,
                },
            },
        };

        return chartInput;
    };
    //==========================================================================
    getValuesTable = () => {
        const { queue } = this.props.PLAY;
        const values = queue.params.map((pos, index) => (
            <tr key={`row${index}`}>
                <td>{index+1}</td>
                <td>{Math.round((pos[0] + Number.EPSILON) * 100000) / 100000}</td>
                <td>{Math.round((pos[1] + Number.EPSILON) * 100000) / 100000}</td>
            </tr>
        ));
        const table = (
            <table className='table table-bordered table-striped table-hover'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Slots</th>
                        <th>&alpha;</th>
                        <th>&beta;</th>
                    </tr>
                </thead>
                <tbody>{values}</tbody>
            </table>
        );
        return table;
    };
    //==========================================================================
    render() {
        if (!this.props.PLAY.set) return <div className='playarea'></div>;
        const { playing, queue } = this.props.PLAY;

        const chartInput = this.getChartInput();
        const chart = (
            <Chart
                options={chartInput.options}
                series={chartInput.series}
                type='line'
                height='100%'
            />
        );

        const valuesTable = this.getValuesTable();

        const songs = queue.songs.map((song, index) => {
            const num =
                index === playing ? (
                    <div className='song__gif'>
                        <img src={play_GIF} alt='' className='song__gif--img' />
                    </div>
                ) : (
                    <div className='song__number'>{index + 1}&nbsp;&nbsp;</div>
                );
            return (
                <div
                    className='song'
                    onClick={this.songClickHandler.bind(this, index)}
                    key={`song${index}`}>
                    <div className='song__no'>{num}</div>
                    <div className='song__name'>{song}</div>
                </div>
            );
        });

        return (
            <div className='playarea'>
                <div className='playarea__songs'>{songs}</div>
                <div className='playarea__info'>
                    <div className='playarea__info__chart'>{chart}</div>
                    <div className='playarea__info__values'>{valuesTable}</div>
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
export default connect(mapStatesToProps, { set_playing })(withRouter(PlayArea));
