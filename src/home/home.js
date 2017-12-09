import React, { Component } from 'react';

import Panel from '../panel/panel';
import Rss from '../news_sources/rss';
import Subreddit from '../news_sources/subreddit';
import _ from 'lodash';
import AddNewsSource from '../add-news-source/add-news-source';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panels: [],
            loadedNewsSources: [
                {
                    type: 'rss',
                    title: 'BBC News',
                    meta: {
                        url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'
                    },
                },
                {
                    type: 'rss',
                    title: 'Rock, Paper, Shotgun',
                    meta: {
                        url: 'http://feeds.feedburner.com/RockPaperShotgun',
                    },
                },
                {
                    type: 'subreddit',
                    title: '/r/webdev',
                    meta: {
                        subreddit: 'webdev',
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
            case 'subreddit': 
                return Subreddit.fulfill(newsSource.meta);
            default:
                return Promise.reject();
        }
    }

    componentWillMount() {
        this.refreshAllPanels();
    }

    removeNewsSource(newsSourceToRemove) {
        const loadedNewsSources = _.clone(this.state.loadedNewsSources);
        _.remove(loadedNewsSources, k => k.title === newsSourceToRemove.title);
        this.setState({ loadedNewsSources }, () => {
            this.refreshAllPanels();
        });
    }

    buildCurrentPanelList() {
        return this.state.loadedNewsSources.map(newsSource => {
            return (
                <li key={newsSource.title} className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>{newsSource.title}</strong>
                    <span onClick={() => {this.removeNewsSource(newsSource)}} className="badge badge-danger badge-pill"><span aria-hidden="true">&times;</span></span>
                </li>
            );
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
                                <div className="list-group">
                                    {this.buildCurrentPanelList()}
                                </div>
                                <hr />
                                <AddNewsSource />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
