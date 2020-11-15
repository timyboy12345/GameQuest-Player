// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  API_URL: "http://127.0.0.1:8000/api",
  PUBNUB_PUBLISH_KEY: "pub-c-f56a54c0-0015-4cf2-be10-b2a9c9ba4e09",
  PUBNUB_SUBSCRIBE_KEY: "sub-c-f55b2e96-a80b-11e9-9950-eaa8f74ddcbd",
  BARDS_MIN_PLAYER_COUNT: 1
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
