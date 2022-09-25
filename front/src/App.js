import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/home'

import './common/styles/style.scss'

function App() {
return (
    <Router>
        <Routes>
            <Route path='*' element={<Home/>}></Route>
        </Routes>
    </Router>
    )
}

export default App;
