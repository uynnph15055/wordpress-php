// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseApiUrl = "http://svpoly.xyz/api";
const authApi = `${baseApiUrl}/auth`;
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
