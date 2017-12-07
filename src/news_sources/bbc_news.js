import Promise from 'bluebird';
import Axios from 'axios';

class BBCNews {
    static fulfill(newsSource) {
        const url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fuk%2Frss.xml%3Fedition%3Duk';
        return Axios.get(url)
            .then(response => {
                console.log(response);
                return response.data.items.map(item => {
                    return {
                        title: item.title,
                        description: item.description,
                        url: item.link,
                    };
                });
            })
            .then(links => {
                return {
                    links,
                    data: {
                        title: newsSource.name
                    },
                };
            })
    }
}
  
export default BBCNews;