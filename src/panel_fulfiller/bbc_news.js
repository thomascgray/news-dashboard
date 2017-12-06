import NewsApiSource from './core/news_api_source';

class BBCNews {
    static fulfill() {
        return NewsApiSource.fulfill('BBC News', 'bbc-news');
    }
}
  
export default BBCNews;