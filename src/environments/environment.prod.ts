const baseApiUrl = "http://localhost:8000/api";
const authApi =  `${baseApiUrl}/auth`;
export const jwtApiUrl = `${baseApiUrl}/v1`; 
const publicApiUrl = `${baseApiUrl}/public`;
export const environment = {
  production: false,
  GG_CLIENT_ID: "848473416580-mn36tpmh8gpm72qp1rqccjii92829bk2.apps.googleusercontent.com",
  GG_CLIENT_SECRET: "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",
  loginUrl: authApi + "/login-token",
  userListUrl: `${jwtApiUrl}/users`,
  sponsorListUrl: `${publicApiUrl}/sponsors`
};