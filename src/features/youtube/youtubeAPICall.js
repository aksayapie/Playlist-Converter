import axios from 'axios';
const API_KEY = 'AIzaSyBZJtu44YlBOHZSNiBgmlc0yG06hnhRvno';
const YOUTUBETOKEN = "ya29.a0AeTM1ieAvh-Nz89ar6oOAEEr7PcwsILLTevjMG1XC9id6A_hLQn5gxwWQLrLOQgvNX5jcVXcXmuk3ldDVN3gWwP2kddbQGi9r3trnikGj1LOJOqZvhs4yb61gtmIOnBFz-nxIw_CuXWk-t83UTLTbPo7vxruzAIaCgYKAcwSARASFQHWtWOmQEvmqt-ehf_XhvQKuqlkqQ0166";

async function youtubeAPICall(query) {
   const response = await axios.create({
    method: "GET",
    baseurl: 'https://www.googleapis.com/youtube/v3/search?',
    params:{
        part:'snippet',
        maxResults:'5',
        key:API_KEY,
        q: query
    }
  })

  console.log(response);
}

export default youtubeAPICall;