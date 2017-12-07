import Promise from 'bluebird';
import Axios from 'axios';

class BBCNews {
    static fulfill(newsSource) {
        const url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fuk%2Frss.xml%3Fedition%3Duk';
        return Axios.get(url)
            .then(response => {
                console.log(response);
                const storyPromises = response.data.map(storyId => Axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`));
                return Promise.all(storyPromises);
            })
            .then(storyResponses => {
                return storyResponses.map(storyResponse => storyResponse.data);
            })
            .then(stories => {
                return stories.map(story => {
                    const description = [
                        'Posted: ' + new Date(story.time * 1000),
                    ].join(' - ');
                    return {
                        title: story.title,
                        description,
                        url: story.url,
                    };
                })
            })
            .then(links => {
                return {
                    links,
                    data: {
                        title: newsSource.name
                    },
                }
            });
    }
}
  
export default BBCNews;