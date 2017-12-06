import Promise from 'bluebird';
import Request from 'request';
import Cheerio from 'cheerio';
import Axios from 'axios';

class Hackernews {
    static fulfill() {
        return Axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
            .then(response => {
                response.data.length = 10;
                const storyPromises = response.data.map(storyId => Axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`));
                return Promise.all(storyPromises);
            })
            .then(storyResponses => {
                return storyResponses.map(storyResponse => storyResponse.data);
            })
            .then(stories => {
                return stories.map(story => {
                    console.log(story);
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
                        title: 'Hackernews'
                    },
                }
            });
    }
}
  
export default Hackernews;