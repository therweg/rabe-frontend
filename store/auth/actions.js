import axios from 'axios';

export const types = {
  START_AUTHENTICATION: 'START_AUTHENTICATION',
  AUTHENTICATION_SUCCESSFUL: 'AUTHENTICATION_SUCCESSFUL',
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
};

const startAuthentication = () => ({
  type: types.START_AUTHENTICATION,
});

const authenticationSuccessful = (data) => ({
  type: types.AUTHENTICATION_SUCCESSFUL,
  payload: data,
});
export const authenticationFailed = () => ({
  type: types.AUTHENTICATION_FAILED,
});

export const authenticate = (data) => (dispatch) => {
  dispatch(startAuthentication());

  axios.post('/api/login/login/', data).then((response) => {
    dispatch(authenticationSuccessful(response.data.data));
  }).catch(() => {
    dispatch(authenticationFailed());
  });
};
