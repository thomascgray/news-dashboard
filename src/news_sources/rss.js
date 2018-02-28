import Promise from 'bluebird';
import StripTags from 'striptags';
import $ from 'jquery';

class Rss {
    static fulfill(rssFeed) {
        return new Promise((resolve, reject) => {
            $(document).ready(function () {
                // $(document).append('')
                $.ajax({
                    url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27${encodeURIComponent(rssFeed.meta.url)}%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
                    dataType: "jsonp",
                }).fail((xhr, status, error) => {
                    return reject();
                }).done(response => {
                    console.log(response);
                    const links = response.items.map(item => {
                        return {
                            title: item.title,
                            description: StripTags(item.description),
                            url: item.link,
                        };
                    });
                    const data = {
                        title: rssFeed.title,
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
