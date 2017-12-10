import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className='footer'>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Load/Unload News Sources
                    </button>
            </footer>
        );
    }
};

export default Footer;
