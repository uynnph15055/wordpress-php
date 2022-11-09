const baseApiUrl = "http://127.0.0.1:8000/api";
const authApi = `${baseApiUrl}/auth`;
export const jwtApiUrl = `${baseApiUrl}/v1`;
export const publicApiUrl = `${baseApiUrl}/public`;
export const environment = {
  production: false,
  GG_CLIENT_ID: "437095088104-c58gonumb2mu71c1d21ofn6ita2uvqr5.apps.googleusercontent.com",
  GG_CLIENT_SECRET: "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",
  loginUrl: authApi + "/login-token",
  publicApiUrl: `${baseApiUrl}/public`,
  sponsorListUrl: `${publicApiUrl}/sponsors`,
  contestListUrl: `${publicApiUrl}/contests`,
  majorListUrl: `${publicApiUrl}/majors`,
  roundListUrl: `${publicApiUrl}/rounds`,
  sliderListUrl: `${publicApiUrl}/sliders`,
  companyListUrl: `${publicApiUrl}/enterprise`,
  recruitment: `${publicApiUrl}/recruitments`,
  capacityListUrl: `${publicApiUrl}/capacity`,
  postListUrl: `${publicApiUrl}/posts`,
  candidateUrl: `${publicApiUrl}/candidate`,
  skillListUrl: `${publicApiUrl}/skill`,
  keywordListUrl: `${publicApiUrl}/keywords`,
  keywordTrendingUrl: `${publicApiUrl}/keywords`,
  RankCapacityUrl: `${publicApiUrl}/rating/major-capacity`,
  // Router API V1;
  userListUrl: `${jwtApiUrl}/users`,
  roundV1Url: `${jwtApiUrl}/round`,
  contestV1Url: `${jwtApiUrl}/contest`,
  teamListUrl: `${jwtApiUrl}/teams`,
  takeExamUrl: `${jwtApiUrl}/take-exam`,
  userV1Url: `${jwtApiUrl}/user`,
  wishListV1Url: `${jwtApiUrl}/wishlist`,
};

