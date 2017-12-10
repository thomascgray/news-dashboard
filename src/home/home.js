import React, { Component } from 'react';

import Panel from '../panel/panel';
import Rss from '../news_sources/rss';
import Subreddit from '../news_sources/subreddit';
import _ from 'lodash';
import LoadUnloadNewsSources from '../components/load-unload-news-sources';
import Footer from '../components/footer';

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
    
    addNewRssFeed(rssFeed) {
        
    }

    addNewSubreddit(subredditName) {
        const loadedNewsSources = _.cloneDeep(this.state.loadedNewsSources);
        loadedNewsSources.push({
            type: 'subreddit',
            title: `/r/${subredditName}`,
            meta: {
                subreddit: subredditName,
            },
        });
        this.setState({ loadedNewsSources }, () => this.refreshAllPanels());
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        {this.state.panels}
                    </div>

                    

                    <LoadUnloadNewsSources
                        removeNewsSource={newsSource => this.removeNewsSource(newsSource)}
                        loadedNewsSources={this.state.loadedNewsSources}
                        addNewRssFeed={rssFeed => this.addNewRssFeed(rssFeed)}
                        addNewSubreddit={subreddit => this.addNewSubreddit(subreddit)}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
