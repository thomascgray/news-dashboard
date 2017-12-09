import React, { Component } from 'react';

import Panel from '../panel/panel';
import Rss from '../news_sources/rss';
import _ from 'lodash';

class AddNewsSource extends Component {
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
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
                            Add a subreddit to include that subreddit's current top 10 Hot posts.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AddNewsSource;
