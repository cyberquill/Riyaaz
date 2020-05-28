import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import fs from 'fs';
import Home from './React Components/pages/Home/Home';
import Init from './React Components/pages/Init/Init';
import isEmpty from './util/isEmpty';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dir_set: false,
            dir: null,
            nPlaylists: null,
            params: [],
        };
    }

    componentDidMount() {
        const dir = localStorage.getItem('player_dir');
        if (!isEmpty(dir)) this.setState({ dir, dir_set: true });
        console.log(dir);
    }

    updateDIR(dir) {
        this.setState({ dir, dir_set: true });
        localStorage.setItem('player_dir', dir);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={(props) => (
                            <Init
                                {...props}
                                dir_set={this.state.dir_set}
                                dir={this.state.dir}
                                updateDIR={this.updateDIR.bind(this)}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/home'
                        render={(props) => (
                            <Home
                                {...props}
                                dir_set={this.state.dir_set}
                                dir={this.state.dir}
                                updateParams={this.setError}
                            />
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
