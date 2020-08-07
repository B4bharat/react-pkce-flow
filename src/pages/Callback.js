import React from 'react';
import axios from 'axios';

function Callback() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const authorization_code = urlParams.get('authorization_code');
  const state = urlParams.get('state');

  if (authorization_code && state) {
    if (state === window.localStorage.getItem('state')) {
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
          // TODO: Attach the token to the AuthContext token, so that it can be used as a flag for 'authentication' state in the rest of the app
          axios
            .get('https://localhost:5000/api/v1/organisation/?page=1', {
              headers: {
                Authorization: 'Bearer ' + response.data.access_token,
              },
            })
            .then(function (res) {
              console.log('organisations', res.data);
              // removed the state and verifier from localStorage
              window.localStorage.removeItem('state');
              window.localStorage.removeItem('verifier');

              // Removed the authorization_code and state query params
              const url = new URL(window.location);
              url.searchParams.delete('authorization_code');
              url.searchParams.delete('state');
              window.history.replaceState(null, null, url);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return <div>Callback...</div>;
}

export default Callback;
