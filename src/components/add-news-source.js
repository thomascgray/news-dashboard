import React, { Component } from 'react';

import _ from 'lodash';

class AddNewsSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subredditName: '',
            rssName: '',
            rssUrl: '',
        };
    }

    updateStateValue(key, value, callback) {
        const state = _.cloneDeep(this.state);
        state[key] = value;
        this.setState(state, callback);
    }

    render() {
        return (
            <div id="accordion" role="tablist">
                <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Add New RSS Feed
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            <p>Add a new RSS Feed to get all the posts from that feed</p>
                            <div>
                                <div className="input-group">
                                    <input type="text" value={this.state.rssName} onChange={e => {this.updateStateValue('rssName', e.target.value)}} className="form-control" placeholder="RSS Feed Name" aria-label="RSS Feed Name" />
                                </div>
                                <br />
                                <div className="input-group">
                                    <input type="text" value={this.state.rssUrl} onChange={e => {this.updateStateValue('rssUrl', e.target.value)}} className="form-control" placeholder="RSS URL" aria-label="RSS URL" />
                                </div>
                                <br />
                                <button onClick={() => {
                                    this.props.addNewRssFeed({
                                        title: this.state.rssName,
                                        url: this.state.rssUrl,
                                    });
                                    this.setState({ rssName: '', rssUrl: '' });
                                }} type="button" className="btn btn-primary">Add RSS Feed</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-header" role="tab" id="headingTwo">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Add New Subreddit
                            </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            <p>Add a subreddit to include that subreddit's current top 10 Hot posts.</p>
                            <div>
                                <div className="input-group">
                                    <input type="text" value={this.state.subredditName} onChange={e => {this.updateStateValue('subredditName', e.target.value)}} className="form-control" placeholder="Subreddit" aria-label="Subreddit" />
                                </div>
                                <br />
                                <button onClick={() => {
                                    this.props.addNewSubreddit(this.state.subredditName);
                                    this.setState({ subredditName: '' });
                                }} type="button" className="btn btn-primary">Add Subreddit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AddNewsSource;
