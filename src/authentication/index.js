import AuthenticationContext from 'adal-angular/lib/adal.js'
import endpoint from "../endpoint";

const config = {
  tenant: '85c997b9-f494-46b3-a11d-772983cf6f11',
  clientId: '01ca4bf3-d4ee-48f6-8842-d700af0746a1',
  redirectUri: window.location.origin + '/',
  postLogoutRedirectUri: window.location.origin + '/',
  cacheLocation: 'localStorage'
};

export default {
  authenticationContext: null,
  userProfilePromise: null,
  /**
   * @return {Promise}
   */
  initialize() {
    this.authenticationContext = new AuthenticationContext(config);

    return new Promise((resolve, reject) => {
      if (this.authenticationContext.isCallback(window.location.hash) || window !== window.parent) {
        // redirect to the location specified in the url params.
        this.authenticationContext.handleWindowCallback();
      } else {
        var user = this.authenticationContext.getCachedUser();
        if (user && window.parent === window && !window.opener) {
          // great, we have a user.
        } else {
          // no user, kick off the sign in flow.
          this.signIn();
        }
        resolve();
      }
    });
  },
  /**
   * @return {Promise.<String>} A promise that resolves to an ADAL token for resource access
   */
  acquireToken() {
    return new Promise((resolve, reject) => {
      this.authenticationContext.acquireToken('<azure active directory resource id>', (error, token) => {
        if (error || !token) {
          return reject(error);
        } else {
          return resolve(token);
        }
      });
    });
  },
  /**
   * Issue an interactive authentication request for the current user and the api resource.
   */
  acquireTokenRedirect() {
    this.authenticationContext.acquireTokenRedirect('<azure active directory resource id>');
  },
  /**
   * @return {Boolean} Indicates if there is a valid, non-expired access token present in localStorage.
   */
  isAuthenticated() {
    // getCachedToken will only return a valid, non-expired token.
    if (this.authenticationContext.getCachedToken(config.clientId)) { return true; }
    return false;
  },
  /**
   * @return {Promise.<Object>} An ADAL user profile object.
   */
  getUserProfile() {
    if (!this.userProfilePromise) {
      this.userProfilePromise = this.initialize().then(() => {
        return this.authenticationContext.getCachedUser().profile;
      });
    }
    return this.userProfilePromise;
  },
  getPhoto() {
    return new Promise((resolve, reject) => {
      this.authenticationContext.acquireToken('https://graph.microsoft.com', function (error, token) {
        if (error || !token) {
          return reject(error);
        } else {
          return resolve(token);
        }
      });
    });
  },
  signIn() {
    this.authenticationContext.login();
  },
  signOut() {
    this.authenticationContext.logOut();
  }
}
