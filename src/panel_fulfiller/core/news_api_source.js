import Promise from 'bluebird';
import Request from 'request';

class NewsApiSource {
    static fulfill(title = null, source = null) {
        if (!title || !source) {
            Promise.reject('missing params');
        }
        return new Promise((resolve, reject) => {
            const data = {
                title,
            };
            Request(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=<apikeyhere>`, (err, res, body) => {
                body = JSON.parse(body);
                const links = body.articles.map(article => {
                    return {
                        title: article.title,
                        description: article.description,
                        url: article.url,
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
  
export default NewsApiSource;