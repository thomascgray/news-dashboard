import React, { Component } from 'react';

import './panel.css';

class PanelTemplate extends Component {
    render() {
        const contentBlocks = this.props.linkset.map(link => {
            return (
                <a key={link.title} href={link.url} target='_blank' className='panel__link'>
                    <div className='panel__link__link_holder'>
                        <p className='panel__link__link_holder__title'>{link.title}</p>
                        <p className='panel__link__link_holder__description'>{link.description}</p>
                    </div>
                </a>
            );
        });

        return (
            <div className='col-md panel'>
                <h2>{this.props.data.title}</h2>
                 { contentBlocks }
            </div>
        );
    }
}
  
export default PanelTemplate;