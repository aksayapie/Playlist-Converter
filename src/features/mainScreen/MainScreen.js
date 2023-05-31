import React, {useState} from 'react';
import './MainScreen.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

require('dotenv').config({ override: true, debug: true })


function MainScreen() {
  //const YOUTUBETOKEN = "ya29.a0AVvZVsqe6o751CCOndEMCJ-f_-cUhzGbP58M0zIR-8TFmVoJOEMsfgWC6rjgxIVZ2F2IDErHFSVUJ9ouL_sKhFQ747ezZfhZGUaD4XTiAJZVHLiJdgPPr-C-mFdMTKDDmlilCJLu_i1XhetaaP9tre6qIXo8N6AaCgYKAQ4SARASFQGbdwaIowK9AS2V6SZXU3GNsUXZxA0166";
  const SPOTIFYTOKEN = process.env.REACT_APP_SPOTIFY_API_KEY;
  let youtubePlaylistLink = '';

  const [inputField, setInputField] = useState({
    spotify_url: '',
  })

  const [outputField, setOutputField] = useState('');

  
  const handleSubmit = async (e) => {
    let songs = [];
    let playlistID = inputField.spotify_url.split("/").pop();
    let playlistURL = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";
    e.preventDefault();

    try {
      let res = await fetch(playlistURL, {
        headers: {
            Authorization: `Bearer ${SPOTIFYTOKEN}`
        },
      });
      let resJson = await res.json();
      let items = resJson.items;
      for(var i = 0; i<items.length; i++){
        let songDetails = {trackName: items[i].track.name, trackArtist: items[i].track.artists[0].name}
        songs.push(songDetails);
      }
    } catch (err){
      console.log(err);
    }
   
    youtubePlaylistLink = 'https://youtube.com/watch_videos?video_ids=';
    // for(var j = 0; j <songs.length; j++) {
    //   let searchTerm = songs[j].trackName + songs[j].trackArtist + 'audio';
    //   let youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&key=AIzaSyBZJtu44YlBOHZSNiBgmlc0yG06hnhRvno&q=' + searchTerm;
    //   const response = await axios(youtubeSearchURL);
    //   let videoId = response.data.items[0].id.videoId + ',';
    //   youtubePlaylistLink += videoId;
    // }
    youtubePlaylistLink.slice(0, -1);
    setOutputField(youtubePlaylistLink);
  };
  
  const handleInputs = (e) =>{
    setInputField((inputField) => ({
      ...inputField,
      [e.target.name]: e.target.value,
    }));
  }

  const handleOutput = (e) =>{
    setOutputField((outputField) => ({
      ...outputField,
      [e.target.name]: e.target.value,
    }));
  }

  /*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '582789607746-70g99c011j3q21b937hsfjh2jmnos63d.apps.googleusercontent.com',
                'redirect_uri': 'http://oauth2.googleapis.com/token',
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/youtube',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

  // const handleAuthentication = async (e) => {
  //   try {
  //     let res = await fetch('https://youtube.googleapis.com/youtube/v3/playlists?part=id%2C%20snippet&key=AIzaSyBZJtu44YlBOHZSNiBgmlc0yG06hnhRvno', {
  //       headers: {
  //           Authorization: `Bearer ${YOUTUBETOKEN}`
  //       },
  //     });
  //     console.log(res);

  //   } catch (err){
  //     console.log(err);
  //   }
  // };

  //const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

  // async function handleAuthentication() {
  //   const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
  //   console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
  //   const data = await res.json();
  //   return {
  //     props: {
  //       data
  //     }
  //   }
  // }

  return (
    <div className="main-screen-container">

      <div className="spotify-playlist-form">
        <Form onSubmit={handleSubmit} >
          <Form.Label>
            Spotify Playlist URL:
          </Form.Label>
          <Form.Control 
            id="spotifyInput"
            type="text" 
            name="spotify_url"
            placeholder="Enter Spotify playlist URL you would like to convert to a YouTube playlist"
            value={inputField.spotify_url}
            onChange={handleInputs} 
          />
          <Button variant="primary" type="submit" onChange={handleInputs}>
            Submit
          </Button>
        </Form>
      </div>

      <div className = "youtube-playlist-output">
        <Form.Label>
          Temporary Youtube Playlist URL: 
        </Form.Label>
        {(outputField !== '') && (<>
          <Form.Control 
            id="youtubeOutput"
            type="text"
            name="youtube_url"
            onChange={handleOutput} 
            value={outputField}
          ></Form.Control>
          <Button>
            Copy Link
          </Button>
          </>)}
      </div>

      <div className = "youtube-login-playlist-output">
        <Form.Label>
          Login to Youtube to add this converted playlist to your YouTube account: 
        </Form.Label>
        <br></br>
        <Button onClick={oauthSignIn}>
          Log Into YouTube
        </Button>
      </div>

    </div>
  );
};

export default MainScreen;