import axios from 'axios';
var data = '{\n  "snippet": {\n    "playlistId": "PL47TckX0LHNLnSKBwWAKsi6-V2-k8_odQ",\n    "position": 0,\n    "resourceId": {\n      "kind": "youtube#video",\n      "videoId": "ZX7wZWYlJOo"\n    }\n  }\n}';

var config = {
  method: 'post',
  url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
  headers: {
    'Authorization': 'Bearer ya29.A0ARrdaM82veWZTbYzpd1VWB7IZ2wODeQBK_wUJ6eWyx6g0ljmBRd86xzixf_8L-9axKWRNsaEXTG4d-oCjIKP4spe82mscfjOd2yZwVrfVGKEj6uHSLOo1KygfcAnKQHdNGeCGWKEJI59UtbNbP-BbaVTGG11',
    'Content-Type': 'text/plain'
  },
  data: data
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });