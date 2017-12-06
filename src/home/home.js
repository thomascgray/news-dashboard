import React, { Component } from 'react';

import Panel from '../panel/panel'
import RedditWorldNews from '../panel_fulfiller/reddit_world_news';
import RedditUkNews from '../panel_fulfiller/reddit_unitedkingdom';
import BBCNews from '../panel_fulfiller/bbc_news';
import TechRadar from '../panel_fulfiller/techradar';
import Subreddit from '../panel_fulfiller/core/subreddit';
import Promise from 'bluebird';
import _ from 'lodash';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempSubredditName: '',
            panels: null,
            panelKeys: [
                'subreddit_webdev',
                'subreddit_worldnews',
                'subreddit_ukpolitics',
            ],
        };

        this.handleTempSubredditName = this.handleTempSubredditName.bind(this);
        this.addNewSubredditToPanels = this.addNewSubredditToPanels.bind(this);
    }

    updatePanels() {
        const panels = [];
        Promise.all(this.resolvePanelKeys(this.state.panelKeys))
            .then(fulfilledPanelPromises => {
                fulfilledPanelPromises.forEach(panelData => {
                    panels.push(<Panel linkset={panelData.links} data={panelData.data} />);
                });
                this.setState({ panels })
            })
            .catch(err => {
                console.log(err);
            });
    }

    resolvePanelKeys() {
        return this.state.panelKeys.map(panelKey => {
            return this.resolvePanelKey(panelKey);
        });
    }

    resolvePanelKey(panelKey) {
        if (_.startsWith(panelKey, 'subreddit_')) {
            const subredditName = panelKey.replace('subreddit_', '');
            return Subreddit.fulfill(subredditName);
        }
    }

    componentWillMount() {
        this.updatePanels();
    }

    removePanelViaKey(panelKey) {
        const panelKeys = _.clone(this.state.panelKeys);
        _.remove(panelKeys, k => k === panelKey);
        this.setState({ panelKeys }, () => {
            this.updatePanels();
        });
    }

    buildCurrentPanelList() {
        return this.state.panelKeys.map(panelKey => {
            return (<li>{ panelKey } - <button onClick={() => this.removePanelViaKey(panelKey)}>X</button></li>);
        });
    }

    handleTempSubredditName(event) {
        const tempSubredditName = _.trim(event.target.value);
        this.setState({ tempSubredditName });
    }

    addNewSubredditToPanels() {
        console.log('helloasdasds222222222222');
        const panelKeys = _.clone(this.state.panelKeys);
        panelKeys.push('subreddit_' + this.state.tempSubredditName);
        const tempSubredditName = '';
        this.setState({ panelKeys, tempSubredditName }, () => {
            this.updatePanels();
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    { this.state.panels }
                </div>

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
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
                                    { this.buildCurrentPanelList() }
                                </ul>

                                new subreddit:
                                <input type="text" value={this.state.tempSubredditName} onChange={this.handleTempSubredditName} />
                                <button onClick={this.addNewSubredditToPanels}>add subreddit</button>

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