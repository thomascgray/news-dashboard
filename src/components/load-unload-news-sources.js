import React, { Component } from 'react';
import AddNewsSource from '../components/add-news-source';

class LoadUnloadNewsSources extends Component {
    buildCurrentNewsSourcesList() {
        return this.props.loadedNewsSources.map(newsSource => {
            return (
                <li key={newsSource.title} className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>{newsSource.title}</strong>
                    <span onClick={() => {this.props.removeNewsSource(newsSource)}} className="badge badge-danger badge-pill"><span aria-hidden="true">&times;</span></span>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Load/Unload News Sources</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Currently enabled panels are:</p>
                            <div className="list-group">
                                {this.buildCurrentNewsSourcesList()}
                            </div>
                            <hr />
                            <AddNewsSource
                                addNewRssFeed={rssFeed => this.props.addNewRssFeed(rssFeed)}
                                addNewSubreddit={subreddit => this.props.addNewSubreddit(subreddit)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default LoadUnloadNewsSources;



