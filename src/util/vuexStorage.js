import Cookie from "./cookies";
import * as shvl from "shvl";
const storeAsyncKey = "BiddingStoreAsync";
const vuexStorage = {
  storageKeys: [],
  sessionKeys: [],
  cookieKeys: [],
  store: null,
  init(storageKeys = [], sessionKeys = [], cookieKeys = []) {
    this.storageKeys = storageKeys;
    this.sessionKeys = sessionKeys;
    this.cookieKeys = cookieKeys;
    return store => {
      this.$store = store;
      if (this.storageKeys.length) {
        this.initStorage();
      }
      if (this.sessionKeys.length) {
        this.initSession();
      }
      if (this.cookieKeys.length) {
        this.initCookie();
      }
      store.subscribe((mutation, state) => {
        if (this.storageKeys.length) {
          this.storageAsync(state);
        }
        if (this.sessionKeys.length) {
          this.sessionAsync(state);
        }
        if (this.cookieKeys.length) {
          this.cookieAsync(state);
        }
      });
    };
  },
  initCookie() {
    let cookie = document.cookie;
    cookie = Cookie.parse(cookie);
    if (!cookie.storeAsyc) return false;
    const storage = JSON.parse(cookie.storeAsyc);
    const state = this.$store.state;
    this.cookieKeys.forEach(function(cookieKey) {
      const val = shvl.get(storage, cookieKey);
      shvl.set(state, cookieKey, val);
    });
    this.$store.replaceState(state);
  },
  cookieAsync(state) {
    if (!this.cookieKeys || this.cookieKeys.length === 0) return;
    const storeSave = {};
    this.cookieKeys.forEach(function(cookieKey) {
      const val = shvl.get(state, cookieKey);
      shvl.set(storeSave, cookieKey, val);
    });
    Cookie.set(storeAsyncKey, JSON.stringify(storeSave), Infinity, "/");
  },
  initStorage() {
    let localStorage = window.sessionStorage.getItem(storeAsyncKey);
    localStorage = JSON.parse(localStorage);
    if (!this.storageKeys.length || !localStorage) return false;
    const storage = this.$store.state;
    this.storageKeys.forEach(sessionKey => {
      const val = shvl.get(localStorage, sessionKey);
      shvl.set(storage, sessionKey, val);
    });
    this.$store.replaceState(storage);
  },
  initSession() {
    let localStorage = window.sessionStorage.getItem(storeAsyncKey);
    localStorage = JSON.parse(localStorage);
    if (!this.sessionKeys.length || !localStorage) return false;
    const storage = this.$store.state;
    this.sessionKeys.forEach(sessionKey => {
      const val = shvl.get(localStorage, sessionKey);
      shvl.set(storage, sessionKey, val);
    });
    this.$store.replaceState(storage);
  },
  storageAsync(state) {
    const storage = {};
    this.storageKeys.forEach(sessionKey => {
      const val = shvl.get(state, sessionKey);
      shvl.set(storage, sessionKey, val);
    });
    window.sessionStorage.setItem(storeAsyncKey, JSON.stringify(storage));
  },
  sessionAsync(state) {
    const storage = {};
    this.sessionKeys.forEach(sessionKey => {
      const val = shvl.get(state, sessionKey);
      shvl.set(storage, sessionKey, val);
    });
    window.sessionStorage.setItem(storeAsyncKey, JSON.stringify(storage));
  },
};
export default vuexStorage;
