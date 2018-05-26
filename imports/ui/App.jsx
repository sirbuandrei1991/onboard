import React from 'react';
import Header from './pages/Header.jsx';
import '/client/style.css';
import { Link } from 'react-router-dom';

const {historu} = this.history;

export default ({children}) =>
    <div>
        <div className="header">
            <div className="head">
                <div className="container">
                    <h1><Link to="/">Blog App</Link></h1>
                    <ul className="header">
                        <li><Link to="/posts">Posts</Link></li>
                        <li><Link to="/posts/create">Create Post</Link></li>
                    </ul>
                    <ul className="myaccountpanel">
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                    <div className="content">
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="app-container" id="app-container">
            {children}
        </div>
    </div>
