import CSSModules from 'react-css-modules';
import styles from './Header.scss'
import React from 'react';
import ReactDOM from 'react-dom';

const Header = () =>(
    <header>
        <h1 styleName="header-title">FrontEndTest</h1>
    </header>
)

export default CSSModules(Header, styles);
