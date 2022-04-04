// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseApiUrl = "http://127.0.0.1:8000/api";
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
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
