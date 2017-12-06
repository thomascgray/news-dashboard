import NewsApiSource from './core/news_api_source';

class TechRadar {
    static fulfill() {
        return NewsApiSource.fulfill('TechRadar', 'techradar');
    }
}
  
export default TechRadar;