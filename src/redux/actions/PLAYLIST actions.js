import fs from 'fs';
import { jStat } from 'jstat';
import {
    PLAYLISTS_LOAD,
    PLAYLISTS_SAMPLE,
    PLAYLISTS_VISITED,
    PLAYLISTS_UPDATE,
    PLAYLISTS_CLEAR,
} from '../types';

export const load_playlists = (DIR) => (dispatch) => {
    console.log('PLAYLISTS ARMED!');
    const arr = fs.readFileSync(DIR + '/clusters.json', {
        encoding: 'utf-8',
    });
    const query = `{ "array": ${arr} }`;
    const clusters = JSON.parse(query).array;
    const payload = {
        K: clusters.length,
        Np: Math.min(clusters.length / 2, 10),
        gamma: 0.95,
        cluster: clusters,
        playlist: [],
        visited: [],
    };

    for (let i = 0; i < payload.Np; i++) payload.visited.push(0);
    clusters.forEach((cluster, index) => {
        const params = [];
        for (let i = 0; i < payload.Np; i++) params.push([1, 1]);
        const val = { id: index, songs: [], params };
        const tmp = cluster.slice();
        const count = Math.min(20, cluster.length);
        for (let i = 0; i < count; i++) {
            const index = Math.ceil(Math.random() * 10) % tmp.length;
            val.songs.push(tmp.splice(index, 1)[0]);
        }
        payload.playlist.push(val);
    });

    dispatch({ type: PLAYLISTS_LOAD, payload });
};

export const sample_display = () => (dispatch, getState) => {
    console.log('SAMPLING DETECTED!');
    const store = getState().PLAYLIST;
    const display = [];
    let playlists = store.playlist.slice();

    for (let i = 0; i < store.Np; i++) {
        let max = -1,
            id = -1;
        playlists.forEach((pl) => {
            const random_num = jStat.beta.sample(pl.params[i][0], pl.params[i][1]);
            if (random_num > max) {
                id = pl.id;
                max = random_num;
            }
        });
        display.push(store.playlist[id]);
        playlists = playlists.filter((pl) => pl.id !== id);
    }

    dispatch({ type: PLAYLISTS_SAMPLE, payload: display });
};

export const mark_visited = (selected) => (dispatch, getState) => {
    console.log('VISITED: ',selected);
    dispatch({ type: PLAYLISTS_VISITED, payload: selected });
};

export const update_params = () => (dispatch, getState) => {
    const { playlist, display, gamma, visited, nUpdate } = getState().PLAYLIST;
    console.log('-------');
    console.log('PARAM UPDATE: ', nUpdate);
    console.log('    VISITED:');
    console.log(visited);
    console.log('    OLD:');
    console.log(playlist);
    visited.forEach((reward, pos) => {
        const clicked = display[pos].id;
        playlist.forEach((pl) => {
            if (pl.id === clicked) {
                pl.params[pos][0] = gamma * pl.params[pos][0] + reward;
                pl.params[pos][1] = gamma * pl.params[pos][1] + (1 - reward);
            } /* else {
                pl.params[pos][0] = gamma * pl.params[pos][0];
                pl.params[pos][1] = gamma * pl.params[pos][1];
            } */
        });
        visited[pos] = 0;
    });
    console.log('    NEW:');
    console.log(playlist);
    console.log('-------');
    dispatch({ type: PLAYLISTS_UPDATE, payload: { playlist, visited } });
};

export const clear_playlists = () => (dispatch) => {
    console.log('PLAYLISTS DISARMED!');
    dispatch({ type: PLAYLISTS_CLEAR });
};
