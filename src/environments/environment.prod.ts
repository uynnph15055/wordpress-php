const baseApiUrl = "http://api.svpoly.xyz/api";
const authApi = `${baseApiUrl}/auth`;
export const jwtApiUrl = `${baseApiUrl}/v1`;
const publicApiUrl = `${baseApiUrl}/public`;
export const environment = {
  production: false,
  GG_CLIENT_ID: "437095088104-c58gonumb2mu71c1d21ofn6ita2uvqr5.apps.googleusercontent.com",
  GG_CLIENT_SECRET: "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",
  loginUrl: authApi + "/login-token",
  userListUrl: `${jwtApiUrl}/users`,
  sponsorListUrl: `${publicApiUrl}/sponsors`,
  contestListUrl: `${publicApiUrl}/contests`,
  majorListUrl: `${publicApiUrl}/majors`,
  roundListUrl: `${publicApiUrl}/rounds`,
  sliderListUrl: `${publicApiUrl}/sliders`,
  teamListUrl: `${jwtApiUrl}/teams`,
};