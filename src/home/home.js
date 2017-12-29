import React, { Component } from 'react';

import Panel from '../components/panel';
import Rss from '../news_sources/rss';
import Subreddit from '../news_sources/subreddit';
import _ from 'lodash';
import LoadUnloadNewsSources from '../components/load-unload-news-sources';
import Footer from '../components/footer';
import Store from 'store';
import Moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panels: [],
            loadedNewsSources: Store.get('loadedNewsSources') || [],
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
                console.log('panelData', panelData);
                panels.push(<Panel key={panelData.data.title} linkset={panelData.links} data={panelData.data} />);
                this.setState({ panels });
            });
        });
    }

    /**
     * 
     * @param {string} newsSource 
     */
    async fulfillNewsSource(newsSource) {
        const cachedData = Store.get(this.getStoreKeyForNewsSource(newsSource));
        if (this.isCachedDataValid(cachedData)) {
            const timestamp = Moment(cachedData.timestamp);
            if (timestamp.isAfter(Moment().subtract(10, 'minutes'))) {
                return cachedData.body;
            }
        }

        let body;
        switch (newsSource.type) {
            case 'rss': 
                body = await Rss.fulfill(newsSource);
                break;
            case 'subreddit': 
                body = await Subreddit.fulfill(newsSource.meta);
                break;
            default:
                body = await Promise.reject();
                break;
        }

        Store.set(this.getStoreKeyForNewsSource(newsSource), { // if we've just fetched new results, update the cache
            body,
            timestamp: Moment(),
        });

        return body;
    }

    getStoreKeyForNewsSource(newsSource) {
        return JSON.stringify(newsSource);
    }

    componentWillMount() {
        this.refreshAllPanels();
    }

    removeNewsSource(newsSourceToRemove) {
        const loadedNewsSources = _.clone(this.state.loadedNewsSources);
        _.remove(loadedNewsSources, k => k.title === newsSourceToRemove.title);
        this.setState({ loadedNewsSources }, () => {
            this.refreshAllPanels();
            Store.set('loadedNewsSources', this.state.loadedNewsSources);
        });
    }

    isCachedDataValid(cachedData) {
        if (cachedData) {
            return cachedData;
        }
    }
    
    addNewRssFeed(rssFeed) {
        const loadedNewsSources = _.cloneDeep(this.state.loadedNewsSources);
        const newsSource = {
            type: 'rss',
            title: rssFeed.title,
            meta: {
                url: rssFeed.url,
            },
        };
        loadedNewsSources.push(newsSource);
        this.setState({ loadedNewsSources }, () => {
            this.refreshAllPanels();
            Store.set('loadedNewsSources', this.state.loadedNewsSources);
        });
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
        this.setState({ loadedNewsSources }, () => {
            this.refreshAllPanels();
            Store.set('loadedNewsSources', this.state.loadedNewsSources);
        });
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
