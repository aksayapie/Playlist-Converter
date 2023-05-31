import React, {useEffect, useState} from 'react'
import youtubeAPICall from './youtubeAPICall'
import axios from 'axios'
const API_KEY = "AIzaSyBZJtu44YlBOHZSNiBgmlc0yG06hnhRvno"

function YoutubeSearch() {
  const [query, setQuery] = useState('twice talk that talk')

  const handleSubmit = async (e) => {
    console.log('testing');
    e.preventDefault();
    // const response = await youtubeAPICall.get('/search', {
    //   params: {
    //     q: query
    //   }
    // })
    let searchTerm = "twice talk that talk"
    const youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&key=AIzaSyBZJtu44YlBOHZSNiBgmlc0yG06hnhRvno&' + searchTerm;

    const response = await axios(youtubeSearchURL)
    console.log(response.data.items);
  }

    return (
      <div>
        <h1>Youtube Search</h1>
        <form onSubmit={handleSubmit} >
          <input 
            onChange={e => setQuery(e.target.value)} 
            value={query} 
            />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
}

export default YoutubeSearch;