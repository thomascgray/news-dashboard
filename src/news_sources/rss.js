import Promise from 'bluebird';
import StripTags from 'striptags';
import $ from 'jquery';

class Rss {
    static fulfill(rssFeed) {
        return new Promise((resolve, reject) => {
            $(document).ready(function () {
                $.ajax({
                    url: "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(rssFeed.url),
                    dataType: "jsonp",
                }).fail((xhr, status, error) => {
                    return reject();
                }).done(response => {
                    const links = response.items.map(item => {
                        return {
                            title: item.title,
                            description: StripTags(item.description),
                            url: item.link,
                        };
                    });
                    const data = {
                        title: response.feed.title,
                    };
    
                    return resolve({
                        links,
                        data,
                    });
                });
            });
        });
    }
}
  
export default Rss;
