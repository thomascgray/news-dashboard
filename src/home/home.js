import React, { Component } from 'react';

import Panel from '../panel/panel'
import BBCNews from '../news_sources/bbc_news';
import Rss from '../news_sources/rss';
import TechRadar from '../news_sources/techradar';
import Subreddit from '../news_sources/core/subreddit';
import Hackernews from '../news_sources/hackernews';
import Promise from 'bluebird';
import _ from 'lodash';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panels: [],
            loadedNewsSources: [
                {
                    type: 'rss',
                    meta: {
                        url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'
                    },
                },
                {
                    type: 'rss',
                    meta: {
                        url: 'http://feeds.feedburner.com/RockPaperShotgun',
                    },
                }
            ],
        };
    }

    refreshAllPanels() {
        const panels = [];
        
        // reset all the panels
        this.setState({ panels });

        this.state.loadedNewsSources.map(newsSource => {
            return this.fulfillNewsSource(newsSource);
        }).forEach(fulfilledNewsSource => {
            fulfilledNewsSource.then(panelData => {
                panels.push(<Panel key={panelData.data.title} linkset={panelData.links} data={panelData.data} />);
                this.setState({ panels });
            });
        });
    }

    /**
     * given a key for a panel, return the promise from that panels
     * fulfiller .fulfill() method
     * @param {string} panelKey 
     */
    fulfillNewsSource(newsSource) {
        switch (newsSource.type) {
            case 'rss': 
                return Rss.fulfill(newsSource.meta);
        }
    }

    componentWillMount() {
        this.refreshAllPanels();
    }

    removePanelViaKey(newsSourceToRemove) {
        const loadedNewsSources = _.clone(this.state.loadedNewsSources);
        _.remove(loadedNewsSources, k => k.key === newsSourceToRemove.key);
        this.setState({ loadedNewsSources }, () => {
            this.refreshAllPanels();
        });
    }

    buildCurrentPanelList() {
        return this.state.loadedNewsSources.map(newsSource => {
            return (<li key={newsSource.key} >{newsSource.name} - <button onClick={() => this.removePanelViaKey(newsSource)}>X</button></li>);
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    {this.state.panels}
                </div>

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Load/Unload News Sources
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Currently enabled panels are:</p>
                                <ul>
                                    {this.buildCurrentPanelList()}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
