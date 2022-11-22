const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  SignUpPath: () => [apiPath, 'signup'].join('/'),
};
