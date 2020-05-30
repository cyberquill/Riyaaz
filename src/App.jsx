import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './redux/store';
import Loader1 from './React Components/Layouts/Loader1/Loader1';
import Home from './React Components/pages/Home/Home';
import Init from './React Components/pages/Init/Init';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<Loader1 />} persistor={persistor}>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Init} />
                            <Route exact path='/home' component={Home} />
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
