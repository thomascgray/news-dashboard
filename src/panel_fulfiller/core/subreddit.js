import Promise from 'bluebird';
import Request from 'request';
import Nlp from 'compromise';

class Subreddit {
    static fulfill(subreddit = null) {
        if (!subreddit) {
            Promise.reject('missing params');
        }
        return new Promise((resolve, reject) => {
            const data = {
                title: `Reddit /r/${subreddit}`,
            };
            Request(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`, (err, res, body) => {
                body = JSON.parse(body);
                const links = body.data.children.map(child => {
                    const topics = Nlp(child.data.title).topics().data();
                    const description = 'Topics: ' + topics.map(t => t.text.trim()).join(', ');
                    return {
                        title: child.data.title,
                        description,
                        url: child.data.url,
                        thumbnail: child.data.thumbnail
                    };
                });
                resolve({
                    links,
                    data,
                });
            });
        });
    }
}
  
export default Subreddit;