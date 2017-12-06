import Subreddit from './core/subreddit';

class RedditWorldNews {
    static fulfill() {
        return Subreddit.fulfill('webdev');
    }
}
  
export default RedditWorldNews;