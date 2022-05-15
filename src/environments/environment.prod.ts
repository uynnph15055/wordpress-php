const baseApiUrl = "https://api.svpoly.xyz/api";
const authApi = `${baseApiUrl}/auth`;

export const jwtApiUrl = `${baseApiUrl}/v1`;
const publicApiUrl = `${baseApiUrl}/public`;
export const environment = {
  production: true,
  GG_CLIENT_ID: "437095088104-c58gonumb2mu71c1d21ofn6ita2uvqr5.apps.googleusercontent.com",
  GG_CLIENT_SECRET: "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",
  loginUrl: authApi + "/login-token",
  userListUrl: `${jwtApiUrl}/users`,
  sponsorListUrl: `${publicApiUrl}/sponsors`,
  contestListUrl: `${publicApiUrl}/contests`,
  contestV1Url: `${jwtApiUrl}/contest`,
  majorListUrl: `${publicApiUrl}/majors`,
  roundListUrl: `${publicApiUrl}/rounds`,
  roundV1Url: `${jwtApiUrl}/round`,
  sliderListUrl: `${publicApiUrl}/sliders`,
  teamListUrl: `${jwtApiUrl}/teams`,
  takeExamUrl: `${jwtApiUrl}/take-exam`
};
