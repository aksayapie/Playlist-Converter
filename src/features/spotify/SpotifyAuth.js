import axios from 'axios';
import qs from 'qs';

// function SpotifyAuth() {
//   const clientId = "67a2562204d8465daff8893f1d7dcbd8";
//   const clientSecret = "657dbc5134444a6f9349d279407c67a6";
  
//   const handleSubmit = async (e) => {
//     const headers = {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       auth: {
//         username: clientId,
//         password: clientSecret,
//       },
//     };
//     const data = {
//       grant_type: 'client_credentials',
//     };

//     try {
//       const response = await axios.post(
//         'https://accounts.spotify.com/api/token',
//         qs.stringify(data),
//         headers
//       );
//       console.log(response.data.access_token);
//       console.log('hi');
//       return response.data.access_token;
//     } catch (error) {
//       console.log(error);
//     }
//     }


//   return (
//     <div className="main-screen-container">
//       <form onSubmit={handleSubmit} >
//         <input type="submit" value="Submit" />
//       </form>
//     </div>
//   );
// }  

// export default SpotifyAuth;
function SpotifyAuth() {
  const getToken = async () => {
    const clientId = "67a2562204d8465daff8893f1d7dcbd8";
    const clientSecret = "657dbc5134444a6f9349d279407c67a6";
    
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };
    const data = {
      grant_type: 'client_credentials',
    };
    
    axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    ).then(function (response) {
      alert("hi");
    });
    //alert(response);
    // try {
    //   const response = await axios.post(
    //     'https://accounts.spotify.com/api/token',
    //     qs.stringify(data),
    //     headers
    //   );
    //   //console.log(response.data.access_token);
    //   alert(response);
    //   return response.data.access_token;
    // } catch (error) {
    //   console.log(error);
    // }
  };
    return (
    <div className="main-screen-container">
      <form onSubmit={getToken} >
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default SpotifyAuth;