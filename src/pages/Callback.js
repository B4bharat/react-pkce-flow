import React from 'react';
import axios from 'axios';

function Callback() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const authorization_code = urlParams.get('authorization_code');
  const state = urlParams.get('state');

  if (authorization_code && state) {
    if (state === window.localStorage.getItem('state')) {
      // let params = {
      //   grant_type: 'authorization_code',
      //   client_id: 'noqoo',
      //   redirect_uri: 'http://localhost:5003/',
      //   code_verifier: window.localStorage.getItem('verifier'),
      //   authorization_code,
      // };

      // axios
      //   .post('http://127.0.0.1:5001/token', params)
      let bodyFormData = new FormData();
      bodyFormData.set('grant_type', 'authorization_code');
      bodyFormData.set('client_id', 'noqoo');
      bodyFormData.set('redirect_url', 'http://localhost:5003/');
      bodyFormData.set(
        'code_verifier',
        window.localStorage.getItem('verifier')
      );
      bodyFormData.set('authorization_code', authorization_code);

      axios({
        method: 'post',
        url: 'http://127.0.0.1:5001/token',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      // this.$axios
      //   .$post('http://pkce-back.web/oauth/token', params)
      //   .then((resp) => {
      //     window.opener.postMessage(resp);
      //     localStorage.removeItem('state');
      //     localStorage.removeItem('verifier');
      //     window.close();
      //   })
      //   .catch((e) => {
      //     console.dir(e);
      //   });
    }
  }

  return <div>Callback...</div>;
}

export default Callback;
