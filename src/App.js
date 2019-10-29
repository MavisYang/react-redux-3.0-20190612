import React from 'react';
import {ReactComponent as Logo} from './logo.svg'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <Logo style={{width: '100px'}}/>
            </header>
        </div>
    );
}

export default App;
