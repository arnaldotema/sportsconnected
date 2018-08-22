/* eslint-env browser */
/**
 * JS CORE LIBRARY
 *
 * I. Interface with persistent/session storage (cookies)
 * II. Interface with JS object
 * III. Initialization
 * IV. Compatibility with old pop-up JS files
 *
 */
(function() {
    'use strict';

    /**
     * I. Interface with persistent/session storage (cookies)
     */
    var WisePopsStorage = {
        uid: '38814',
        siteHash: 'J7QojW5kF7',
        baseUrl: {
            app: '//app.wisepops.com',
            popup: '//popup.wisepops.com',
            tracking: '//tracking.wisepops.com'
        },
        gaTrackedEvents: '',
        cookieNamePersistent: 'wisepops',
        cookieNameSession: 'wisepops_session',
        cookieNameProperties: 'wisepops_props',
        cookieNameVisits: 'wisepops_visits',
        cookieNameNoShow: 'wisepops_noshow',
        arrivalOnPage: null,
        lastRequestInterval: null,

        /**
         * persistentData is a Javascript object retrieved from a cookie
         * It stores all data for each popins and global information.
         */
        persistentData: {
            cross_subdomain: true,
            last_req_date: null,
            popins: {},
            ucrn: null,
            uid: null,
            version: 3
        },

        /**
         * These are data with life time of browser session
         */
        sessionData: {
            arrivalOnSite: null,
            mtime: null,
            pageviews: 0,
            popins: {},
            src: null,
            utm: {}
        },

        /**
         * User defined custom properties
         */
        customProperties: {},

        /**
         * Array of dates of visits
         */
        visits: [],
        visitsMaxSize: 50,

        /**
         * Return a string matched by cookieName parameter
         * @param {string} cookieName
         * @return {string}
         */
        getCookie: function(cookieName) {
            var name = cookieName + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    c = c.substring(name.length, c.length);

                    if (c.charAt(0) === '{' || c.charAt(0) === '[') {
                        c = unescape(c);
                    } else {
                        c = decodeURIComponent(c);
                    }
                    return c;
                }
            }
            return null;
        },

        /**
         * Save data into a cookie
         * @param {string} cookieName
         * @param {String} value
         * @param {boolean|number} isSessionOnly - if integer, it will be the number of days before expiration
         * @param {boolean|string} skipPath - if string, will be set as cookie path
         */
        setCookie: function(cookieName, value, isSessionOnly, skipPath) {
            var expirationDate = 'expires=Mon, 18 Jan 2038 23:59:59 GMT;';

            if (isSessionOnly) {
                var d = new Date();
                if (typeof isSessionOnly === 'number') {
                    d.setTime(d.getTime() + (isSessionOnly * 24 * 60 * 60 * 1000));
                    expirationDate = 'expires=' + d.toUTCString();

                } else {
                    expirationDate = '';
                }
            }

            // Cross sub-domains
            var domain = '';
            var hostname = this.getHostname(true);
            if (this.getCrossSubDomain() && hostname.subDomainSkipped
                && (typeof isSessionOnly !== 'number' || isSessionOnly > -365)) {
                domain = 'domain=.' + hostname.hostname + '; ';
            }

            var path = 'path=/; ';
            if (skipPath) {
                if (typeof skipPath === 'string') {
                    path = 'path=' + skipPath + '; ';
                } else {
                    path = '';
                }
            }

            var cookieValue = cookieName + '=' + encodeURIComponent(value) + '; ' + path + domain + expirationDate;
            if (cookieValue.length > 4092) {
                var error = 'Cookie size is too big (' + cookieName + ')';
                WisePopsApi.log('error', error);
                throw error;
            }

            document.cookie = cookieValue;
        },

        /**
         * Return the hostname of the current page
         * @param {boolean} skipSubDomain
         * @param {string} hostname - for testing purpose
         */
        getHostname: function(skipSubDomain, hostname) {
            hostname = hostname || window.location.hostname;
            var subDomainSkipped = skipSubDomain;

            if (skipSubDomain) {
                // From MixPanel
                // This is making errors
                // So, to check if it works, we will try to set a cookie on this domain
                // If we cannot immediately read it back, the hostname is wrong
                var domain = hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z.]{2,6}$/i);
                if (domain && domain[0]) {
                    hostname = domain[0];
                } else {
                    subDomainSkipped = false;
                }
            }

            return {
                hostname: hostname,
                subDomainSkipped: subDomainSkipped
            };
        },

        /**
         * Retrieve GET parameter
         * @param {string} name
         * @param {string} query - for testing purpose
         * @returns {string}
         */
        getUrlParameter: function(name, query) {
            query = query || window.location.search.substr(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                pair[0] = decodeURIComponent(pair[0]);
                if (pair[0] === name && pair[1]) {
                    return decodeURIComponent(pair[1]);
                }
            }
            return null;
        },

        /**
         * Returns the count of page view from the stored data object.
         * @return {number}
         */
        getPageViewCount: function() {
            return this.sessionData.pageviews;
        },

        /**
         * Increment the pageview count in the sessionData object
         */
        incrementPageViewCount: function() {
            if (this.isReferrerExternal() && !WisePopsApi.pageviewCalled) {
                this.sessionData.pageviews = 1;
            } else {
                this.sessionData.pageviews++;
            }
            this._saveSession();
        },

        /**
         * Test if the visitor is just coming from an external website
         * @param {string} referrer - For testing purpose
         * @param {string} hostname - For testing purpose
         * @returns {boolean}
         */
        isReferrerExternal: function(referrer, hostname) {
            referrer = referrer || document.referrer;
            var external = (referrer === '');

            if (referrer !== '') {
                var currentHostname = this.getHostname(this.persistentData['cross_subdomain'], hostname).hostname;
                var parsedReferrer = document.createElement('a');
                parsedReferrer.href = referrer;
                external = (parsedReferrer.hostname.indexOf(currentHostname) === -1);
            }

            return external;
        },

        /**
         * Memorize the referrer during the browser session
         * @param {string} referrer - For testing purpose
         * @param {string} hostname - For testing purpose
         */
        setSource: function(referrer, hostname) {
            referrer = referrer || document.referrer;

            if (this.isReferrerExternal(referrer, hostname) && referrer) {
                this.sessionData.src = referrer;
                this._saveSession();
            }
        },

        /**
         * Return the initial referrer of the visit
         */
        getSource: function() {
            return this.sessionData.src;
        },

        /**
         * Memorize the UTM parameters during the browser session
         * Special params are not real utm parameters, but let us target traffic paid channels
         * @see src/traffic-channels/Paid.yml
         * @param {string} query - For testing purpose
         */
        setUtmParameters: function(query) {
            var parameters = ['source', 'medium', 'campaign', 'term', 'content', 'gclid'];
            var specials = ['gclid'];
            for (var i = 0; i < parameters.length; i++) {
                var paramName = parameters[i];
                if (specials.indexOf(paramName) === -1) {
                    paramName = 'utm_' + paramName;
                }
                var value = this.getUrlParameter(paramName, query);
                if (value) {
                    if (specials.indexOf(paramName) > -1) {
                        // No need to work with the real value
                        value = 'yes';
                    }
                    this.sessionData.utm[parameters[i]] = value;
                }
            }
        },

        /**
         * Return the UTM parameters
         * @returns {object}
         */
        getUtmParameters: function() {
            return this.sessionData.utm;
        },

        /**
         * Store the date of arrival on the website for this session
         */
        setArrivalOnPage: function() {
            var date = new Date(); // current date - for SPA using wisepops("pageview");

            if (!this.arrivalOnPage && WisePopsApi.object) {
                // Use the date when the tracking code has been executed
                date.setTime(WisePopsApi.object.l);
            }
            this.arrivalOnPage = date;
        },

        /**
         * Return the date when the visitor landed on the current page
         */
        getArrivalOnPage: function() {
            if (!this.arrivalOnPage) {
                this.setArrivalOnPage();
            }
            return this.arrivalOnPage;
        },

        /**
         * Store the date of arrival on the website for this session
         */
        setArrivalOnSite: function() {
            if (!this.sessionData.arrivalOnSite || this.isReferrerExternal()) {
                this.sessionData.arrivalOnSite = this.getArrivalOnPage().toJSON(); // Create a distinct object
            }
        },

        /**
         * Return the date when the visitor started browsing on the current website
         */
        getArrivalOnSite: function() {
            if (!this.sessionData.arrivalOnSite) {
                this.setArrivalOnSite();
            }
            if (typeof this.sessionData.arrivalOnSite !== 'object') {
                try {
                    this.sessionData.arrivalOnSite = new Date(this.sessionData.arrivalOnSite);
                } catch (exception) {
                    WisePopsApi.log('error', 'Invalid date format for arrival on site');
                }
            }
            return this.sessionData.arrivalOnSite;
        },

        /**
         * Memorize the current date as a visit
         */
        addVisit: function() {
            if (this.isReferrerExternal() || !this.visits.length) {
                if (this.visits.unshift(this.getArrivalOnPage().toJSON()) > this.visitsMaxSize) {
                    this.visits = this.visits.slice(0, this.visitsMaxSize);
                }
                this._saveVisits();
            }
        },

        /**
         * Return the dates of visits
         * @return {array}
         */
        getVisits: function() {
            return this.visits;
        },

        /**
         * Returns true if "Do not display again" link has been clicked
         * @return {boolean}
         **/
        getDoNotDisplay: function() {
            return (this.getCookie(this.cookieNameNoShow) == 1);
        },

        /**
         * Disable Wisepops for 30 days
         * @param {boolean} doNotDisplay
         */
        setDoNotDisplay: function(doNotDisplay) {
            if (typeof doNotDisplay === 'undefined') {
                doNotDisplay = true;
            }
            this.setCookie(this.cookieNameNoShow, 1, 30 * (doNotDisplay ? 1 : -1));
        },

        /**
         * Returns data contained in the storage object for a popin id
         * @param {string} popId
         * @return {object}
         **/
        getPopin: function(popId) {
            if (this.persistentData.popins[popId]) {
                return this.persistentData.popins[popId];
            }
        },

        /**
         * Returns an array of popin ids contained in the storage.
         * @return {string[]}
         **/
        getPopinIds: function() {
            return Object.keys(this.persistentData.popins);
        },

        /**
         * Returns an array of popin ids displayed during the session.
         * @return {object}
         **/
        getSessionPopins: function() {
            return this.sessionData.popins;
        },

        /**
         * Add a popin ID into the list of displayed popins during session,
         * with the number of page elapsed since display as value
         * @param {string} popId
         */
        addSessionPopinId: function(popId) {
            this.sessionData.popins[popId] = 0;
            this._saveSession();
        },

        /**
         * Increment the number of pages elapsed since display of popups in session
         */
        incrementSessionPagesElapsed: function() {
            for (var popId in this.sessionData.popins) {
                if (this.sessionData.popins.hasOwnProperty(popId)) {
                    this.sessionData.popins[popId]++;
                }
            }
            this._saveSession();
        },

        /**
         * Return the number of displays for a popin
         * @param {string} popId
         * @return {number}
         */
        getDisplayCount: function(popId) {
            if (this.getPopin(popId) && this.getPopin(popId).display_count) {
                return this.getPopin(popId).display_count;
            } else {
                return 0;
            }
        },

        /**
         * Returns the number of minutes elapsed from the last display of the popin
         * @param {string} popId
         * @return {number}
         **/
        getLastDisplayedInterval: function(popId) {
            if (this.getPopin(popId)) {
                var diff = Math.abs(new Date(this.getPopin(popId).display_date) - new Date());
                return Math.floor((diff / 1000) / 60);

            } else {
                return 0;
            }
        },

        /**
         * Indicates that a popin id has been displayed
         * @param {string} popId
         * @return {boolean}
         **/
        setDisplayed: function(popId) {
            var date = (new Date()).toJSON();

            if (this.getPopin(popId)) {
                this.getPopin(popId).display_count++;
                this.getPopin(popId).display_date = date;

            } else {
                this.persistentData.popins[popId] = {
                    display_count: 1,
                    display_date: date
                };
            }

            this._saveStored();
            this.addSessionPopinId(popId);
            return true;
        },

        /**
         * Verifies for a Popin id if it has already been converted
         * @return {boolean}
         **/
        isConverted: function(popId) {
            return (this.getPopin(popId) && this.getPopin(popId).converted);
        },

        /**
         * Indicates that a popin id just has a convertion action
         * Then we ask the object to save the modified object inside the cookie
         * to avoid data loss.
         * @param {string} popId
         * @return {boolean}
         **/
        setConverted: function(popId) {
            if (this.getPopin(popId)) {
                var date = new Date();
                this.getPopin(popId).converted = date.toJSON();
                this._saveStored();
                return true;

            } else {
                return false;
            }
        },

        /**
         * Return true if the has subscribed into the specified popup
         * @param popId
         */
        isSubscribed: function(popId) {
            return (this.getPopin(popId) && this.getPopin(popId).subscribed);
        },

        /**
         * Return true if the visitor has already subscribed to any popup
         * @return {boolean}
         */
        hasAnySubscription: function() {
            for (var popId in this.persistentData.popins) {
                if (this.persistentData.popins.hasOwnProperty(popId)) {
                    if (this.persistentData.popins[popId].subscribed) {
                        return true;
                    }
                }
            }
            return false;
        },

        /**
         * Memorize that the popup optin block has been filled up
         * @param {string} popId
         * @return {boolean}
         **/
        setSubscribed: function(popId) {
            if (this.getPopin(popId)) {
                var date = new Date();
                this.getPopin(popId).subscribed = date.toJSON();
                this._saveStored();
                return true;

            } else {
                return false;
            }
        },

        /**
         * Return the last displayed popin and the last converted popin
         * @return {object}
         */
        getLastDisplayedAndConvertedPopins: function() {
            var displayPopId = null;
            var displayDate = null;
            var convertPopId = null;
            var convertDate = null;
            var date = null;

            for (var popId in this.persistentData.popins) {
                if (this.persistentData.popins.hasOwnProperty(popId)) {
                    // Display
                    date = new Date(this.persistentData.popins[popId].display_date);
                    if (displayDate === null || date.getTime() > displayDate.getTime()) {
                        displayPopId = popId;
                        displayDate = date;
                    }

                    // Conversion
                    if (this.persistentData.popins[popId].converted) {
                        date = new Date(this.persistentData.popins[popId].converted);
                        if (convertDate === null || date.getTime() > convertDate.getTime()) {
                            convertPopId = popId;
                            convertDate = date;
                        }
                    }
                }
            }

            return {
                displayPopId: displayPopId,
                displayDate: displayDate,
                convertPopId: convertPopId,
                convertDate: convertDate
            };
        },

        /**
         * Returns the UCRN from the stored data object.
         * @return {number}
         **/
        getUcrn: function() {
            if (this.persistentData.ucrn) {
                return this.persistentData.ucrn;
            }
            return false;
        },

        /**
         * Generate a random ucrn between 0 and 99
         * @return {number}
         **/
        generateUcrn: function() {
            return this.persistentData.ucrn = Math.floor(Math.random() * 100);
        },

        /**
         * Return the custom properties object, or null if empty
         * return {object}
         */
        getCustomProperties: function() {
            for (var key in this.customProperties) {
                if (this.customProperties.hasOwnProperty(key)) {
                    return this.customProperties;
                }
            }
            return null;
        },

        /**
         * Add or override a set of custom properties
         * @param {object} properties
         * @param {boolean} reset
         */
        addCustomProperties: function(properties, reset) {
            if (reset) {
                this.customProperties = properties;
            } else {
                this.customProperties = this._mergeObjects(this.customProperties, properties);
            }
            this._saveCustomProperties();
        },

        /**
         * Drop a list of custom properties (typically when set to null)
         * @param {string[]} properties
         */
        dropCustomProperties: function(properties) {
            for (var i = 0; i < properties.length; i++) {
                if (this.customProperties.hasOwnProperty(properties[i])) {
                    delete this.customProperties[properties[i]];
                }
            }
            this._saveCustomProperties();
        },

        /**
         * Indicate if cookies are common to all sub-domains
         * @return {boolean}
         */
        getCrossSubDomain: function() {
            if (typeof this.persistentData.cross_subdomain !== 'undefined') {
                return this.persistentData.cross_subdomain;
            } else {
                return true;
            }
        },

        /**
         * Enable or disable the cross domain cookies feature
         * @param {boolean} crossSubDomain
         */
        setCrossSubDomain: function(crossSubDomain) {
            this.persistentData.cross_subdomain = crossSubDomain;
        },

        /**
         * Return true if we should track GA custom event
         * @param {string} event - Display | Click | Signup
         */
        isEventGATracked: function(event) {
            return !!event && event.length && this.gaTrackedEvents.indexOf(event) > -1;
        },

        /**
         * This method should be call before using any methods of this object.
         * It is used to retrieve the JSON string from the cookie,
         * parse it as a JSON Object and store it in persistentData
         */
        _init: function() {
            this._initStored();
            this._initSession();
            this._initCustomProperties();
            this._initVisits();
            this._migrateCookieFormat();
        },

        /**
         * Retrive data from the persistent cookie
         */
        _initStored: function() {
            var cookie = this.getCookie(this.cookieNamePersistent);

            if (cookie) {
                try {
                    cookie = JSON.parse(cookie);
                    if (cookie.uid && cookie.uid != this.uid) {
                        // Warn about possible conflict between UID in tracking code / cookie
                        WisePopsApi.log('error', 'Conflict between accounts: ' + cookie.uid + '/' + this.uid);
                        cookie.uid = this.uid;
                    }
                    if (!cookie.version) {
                        cookie.version = 0;
                    }

                    this.persistentData = this._mergeObjects(this.persistentData, cookie);

                } catch (exception) {
                    WisePopsApi.log('error', 'Cookie format corrupted');
                    cookie = null;
                }
            }

            if (!cookie) {
                this.persistentData.uid = this.uid;
                this.generateUcrn();
            }

            this._saveStored();

            // Check for cross sub-domain failure
            if (!this.getCookie(this.cookieNamePersistent) && this.getCrossSubDomain()) {
                this.setCrossSubDomain(false);
                this._initStored();
            }
        },

        /**
         * Retrive data from the session cookie
         */
        _initSession: function() {
            var cookie = this.getCookie(this.cookieNameSession);

            if (cookie) {
                try {
                    cookie = JSON.parse(cookie);
                    if (this._isSessionCookieRecent(cookie.mtime, Date.now())) {
                        this.sessionData = this._mergeObjects(this.sessionData, cookie);
                    }
                } catch (exception) {
                    cookie = null;
                }
            }

            this.setSource();
            this.setUtmParameters();
            this._saveSession();
        },

        /**
         * Check if the last modification time is less than 2 hours ago
         * Chrome and FF do not clear sessions if tabs are restored
         * So we need to use both session TTL and 2 hours TTL
         * @param {string} mtime
         * @param {int} now
         */
        _isSessionCookieRecent: function(mtime, now) {
            mtime = Date.parse(mtime);
            var diff = (mtime ? now - mtime : 0);
            return diff < 2 * 60 * 60 * 1000;
        },

        /**
         * Retrieve custom properties previously set up
         */
        _initCustomProperties: function() {
            var cookie = this.getCookie(this.cookieNameProperties);

            if (cookie) {
                try {
                    cookie = JSON.parse(cookie);
                    this.customProperties = this._mergeObjects(this.customProperties, cookie);
                } catch (exception) {
                    cookie = null;
                }
            }
        },

        _initVisits: function() {
            var cookie = this.getCookie(this.cookieNameVisits);

            if (cookie) {
                try {
                    cookie = JSON.parse(cookie);
                    this.visits = cookie;
                } catch (exception) {
                    cookie = null;
                }
            }
        },

        /**
         * Merge objects together, the properties of last object being kept if conflict
         * @param {object} obj1
         * @param {object} obj2
         * @return {object}
         */
        _mergeObjects: function(obj1, obj2) {
            for (var propName in obj2) {
                if (obj2.hasOwnProperty(propName)) {
                    obj1[propName] = obj2[propName];
                }
            }
            return obj1;
        },

        /**
         * Migrate old cookies formats
         */
        _migrateCookieFormat: function() {
            var hasChange = false;

            // The most important is the persistent cookie
            if (this.persistentData.req_count_session) {
                hasChange = true;
                this.sessionData.pageviews = this.persistentData.req_count_session + 1;
                delete this.persistentData.req_count;
                delete this.persistentData.req_count_session;
            }

            if (!this.persistentData.uid) {
                hasChange = true;
                this.persistentData.uid = this.uid;
            }

            if (typeof this.persistentData.cross_subdomain === 'undefined') {
                hasChange = true;
                this.persistentData['cross_subdomain'] = true;
            }

            if (this.visits.length === 0 && this.persistentData.last_req_date) {
                hasChange = true;
                this.visits.push(this.persistentData.last_req_date);
                delete this.persistentData.last_req_date;
            }

            // For migration to cross-subdomain cookies,
            // we need to explicitly delete subdomain specific cookies
            // Otherwise, 2 cookies with the same name can live together
            if (!this.persistentData.version || this.persistentData.version < 3) {
                hasChange = true;
                this.persistentData.version = 3;
                this.setCookie(this.cookieNamePersistent, '', -365);
                this.setCookie(this.cookieNameProperties, '', -365);

                // Issue with some cookies that have been stored with the path
                this.setCookie(this.cookieNamePersistent, '', -365, true);
                this.setCookie(this.cookieNameProperties, '', -365, true);
                this.setCookie(this.cookieNamePersistent, '', -365, window.location.pathname);
                this.setCookie(this.cookieNameProperties, '', -365, window.location.pathname);
            }

            // sessionData migration, can be removed once deployed
            if (this.sessionData.req_count) {
                hasChange = true;
                if (!this.sessionData.pageviews) {
                    this.sessionData.pageviews = this.sessionData.req_count + 1; // req_count was wrong
                }
                delete this.sessionData.req_count;
            }

            if (Array.isArray(this.sessionData.popins)) {
                hasChange = true;
                var popinsObject = {};
                for (var i = 0; i < this.sessionData.popins.length; i++) {
                    popinsObject[this.sessionData.popins[i]] = 1;
                }
                this.sessionData.popins = popinsObject;
            }

            if (hasChange) {
                this._saveStored();
                this._saveSession();
                this._saveCustomProperties();
                this._saveVisits();
            }
        },

        /**
         * Method used to save data inside the cookie
         * It should store the JSON Object to a JSON string
         */
        _save: function() {
            this._saveStored();
            this._saveSession();
        },

        /**
         * Save to cookie the persistent data
         * @param {boolean} hasBeenReduced
         */
        _saveStored: function(hasBeenReduced) {
            try {
                var jsonData = JSON.stringify(this.persistentData);
                this.setCookie(this.cookieNamePersistent, jsonData);

            } catch (exception) {
                if (!hasBeenReduced) {
                    // Cookie is too big, let's drop popins data
                    this.persistentData.popins = {};
                    this._saveStored(true);

                } else {
                    throw exception;
                }
            }
        },

        /**
         * Save to cookie the session data
         * @param {boolean} hasBeenReduced
         */
        _saveSession: function(hasBeenReduced) {
            try {
                this.sessionData.mtime = (new Date()).toJSON();
                var jsonData = JSON.stringify(this.sessionData);
                this.setCookie(this.cookieNameSession, jsonData, true);

            } catch (exception) {
                if (!hasBeenReduced) {
                    // Cookie is too big, let's drop popins data
                    this.sessionData.popins = [];
                    this._saveSession(true);

                } else {
                    throw exception;
                }
            }
        },

        /**
         * Save to cookie the custom properties
         */
        _saveCustomProperties: function() {
            var jsonData = JSON.stringify(this.customProperties);
            if (jsonData.length <= 2) {
                this.setCookie(this.cookieNameProperties, '', -10);
            } else {
                this.setCookie(this.cookieNameProperties, jsonData);
            }
        },

        /**
         * Save dates of visits
         */
        _saveVisits: function() {
            this.setCookie(this.cookieNameVisits, JSON.stringify(this.visits));
        }
    };



    /**
     * II. Interface with JS object
     */
    var WisePopsApi = {
        objectName: window['WisePopsObject'],
        object: null, // This is the wisepops() function declared in tracking code
        disabled: false,
        pageviewCalled: false,
        logger: [],
        loggerMaxSize: 1000,
        loggerLevels: ['none', 'error', 'warn', 'info', 'debug', 'trace'],
        loggerDisplayLevel: null,

        /**
         * Retrieve the wisepops object
         */
        _init: function() {
            if (!this.objectName) {
                this._initObject();
            }

            this.object = window[this.objectName];

            if (this.object._api) {
                // Loader already initialized
                this.object._api.log('warn', 'Loader already initialized, consider using wisepops("pageview") instead');
                this.object._api.pageviewAction();

            } else {
                // Attach this interface
                this.object._api = WisePopsApi;

                // Attach Storage
                this.object._storage = WisePopsStorage;

                // Detect iframe
                var insideIframe = false;
                try {
                    insideIframe = (window.self !== window.top);
                } catch (e) {
                    insideIframe = true;
                }

                if (navigator.cookieEnabled !== true) {
                    this.log('error', 'Cookies need to be enabled');
                    this.disabled = true;

                } else if (insideIframe) {
                    this.log('info', 'Disabled inside iframe');
                    this.disabled = true;

                } else if (WisePopsStorage.getDoNotDisplay()) {
                    this.log('info', 'Disabled for 30 days');
                    this.disabled = true;
                }

                // Attach Queue
                this._initQueue();

                // Display errors in console by default
                if (this.loggerDisplayLevel === null) {
                    this.logAction('error');
                }
            }
        },

        /**
         * On legacy tracking code, object is not created
         */
        _initObject: function() {
            // Avoid conflicts if "wisepops" name is already taken
            // and force clients to update their tracking code to use wisepops()
            var retry = 5;
            while ((!this.objectName || window[this.objectName]) && retry--) {
                this.objectName = 'wisepops' + Math.floor(Math.random() * 1000);
            }

            if (window[this.objectName]) {
                throw 'Wisepops - Could not initialize function because of name conflict';
            }

            var that = this;
            window['WisePopsObject'] = this.objectName;
            window[this.objectName] = function() {
                (window[that.objectName].q = window[that.objectName].q || []).push(arguments);
            };
            window[this.objectName].l = 1 * new Date();
        },

        /**
         * Listen when wisepops() is called, and unstack missed calls
         */
        _initQueue: function() {
            var that = this;
            this.object.q = this.object.q || [];

            // Queue push() listener
            var qOldPush = this.object.q.push;
            this.object.q.push = function(args) {
                if (that.object.q.length) {
                    // Queue has not been read yet
                    qOldPush.apply(that.object.q, arguments);
                } else {
                    that._dispatch(args);
                }
            };

            this._initLoaderCallback();

            // Read the queue
            for (var i = 0; i < this.object.q.length; i++) {
                this._dispatch(this.object.q[i]);
            }
            this.object.q.length = 0;

            // Trigger pageview by default
            if (!this.pageviewCalled) {
                this.pageviewAction();
            }
        },

        /**
         * On Shopify, our tracking code cannot create a queue.
         * The fallback is to assign a function to window['WisePopsLoaderCallback']
         */
        _initLoaderCallback: function() {
            var that = this;

            function executeLoaderCallback(callback) {
                if (typeof callback === 'function') {
                    try {
                        callback(that.object);
                    } catch (exception) {
                        that.log('error', 'LoaderCallback - ' + exception);
                    }
                }
            }

            executeLoaderCallback(window['WisePopsLoaderCallback']);
            Object.defineProperty(window, 'WisePopsLoaderCallback', {
                set: executeLoaderCallback
            });
        },

        /**
         * Dispatch calls to their respective method (with "Action" suffix)
         * @param {array} args
         */
        _dispatch: function(args) {
            this.log('debug', 'Dispatch', {
                functionName: args[0],
                properties: args[1],
                value: args[2]
            });

            var actionName = args[0] + 'Action';
            if (!args[0] || !this[actionName]) {
                this.log('error', 'Unkown method "' + args[0] + '"');
            } else {
                this[actionName](args[1], args[2]);
            }
        },

        /**
         * wisepops('pageview')
         * Trigger display scenario resolution for page landing
         */
        pageviewAction: function() {
            WisePopsStorage.setArrivalOnPage();

            if (!this.pageviewCalled) {
                WisePopsStorage.setArrivalOnSite();
                WisePopsStorage.addVisit();
            }

            if (!this.disabled) {
                WisePopsStorage.incrementPageViewCount();
                WisePopsStorage.incrementSessionPagesElapsed();
                this._myWisepop();
            }
            this.pageviewCalled = true;
        },

        /**
         * wisepops('event', 'myCustomEvent');
         * Fire a custom event
         * @param {string} eventName
         */
        eventAction: function(eventName) {
            if (!eventName || typeof eventName !== 'string') {
                this.log('error', 'Method "event" requires an event name as 2nd parameter');

            } else if (!this.disabled) {
                if (eventName.length > 50) {
                    this.log('warn', 'The event name cannot exceed 50 characters');
                    eventName = eventName.substr(0, 50);
                }
                this._myWisepop(eventName);
            }
        },

        /**
         * This will make the server call to find a matching display scenario
         * @param {string} event
         */
        _myWisepop: function(event) {
            var logMsg = 'Resolving display scenarios for ' + (event ? 'custom event "' + event + '"' : 'pageview');
            var customProperties = WisePopsStorage.getCustomProperties();
            this.log('info', logMsg, customProperties);

            var params = {
                pageviews: WisePopsStorage.getPageViewCount(),
                ref: document.referrer, // @TODO: remove once canary 1 is obsolete
                site: WisePopsStorage.siteHash,
                ucrn: WisePopsStorage.getUcrn(),
                uid: WisePopsStorage.uid,
                url: document.location,
                v: WisePopsStorage.getVisits().join(',')
            };

            if (WisePopsStorage.getSource()) {
                params.src = WisePopsStorage.getSource();
            }

            // Custom event
            if (event) {
                params.e = event;
            }

            // Displayed popins
            if (WisePopsStorage.getPopinIds()) {
                var popinIds = WisePopsStorage.getPopinIds();
                for (var i = 0; i < popinIds.length; i++) {
                    var popinId = popinIds[i];
                    params['d[' + popinId + ']'] = WisePopsStorage.getLastDisplayedInterval(popinId);
                    if (WisePopsStorage.isConverted(popinId)) {
                        params['c[' + popinId + ']'] = 1;
                    }
                    params['dc[' + popinId + ']'] = WisePopsStorage.getDisplayCount(popinId);
                }
            }

            // Displayed popins during session
            var sessionPopins = WisePopsStorage.getSessionPopins();
            for (var popId in sessionPopins) {
                if (sessionPopins.hasOwnProperty(popId)) {
                    params['ds[' + popId + ']'] = sessionPopins[popId];
                }
            }

            // Has already subscribed
            if (WisePopsStorage.hasAnySubscription()) {
                params.sub = 1;
            }

            // UTM parameters
            var utm = WisePopsStorage.getUtmParameters();
            for (var key1 in utm) {
                if (utm.hasOwnProperty(key1)) {
                    params['utm[' + encodeURIComponent(key1) + ']'] = utm[key1];
                }
            }

            // Custom properties
            if (customProperties) {
                for (var key2 in customProperties) {
                    if (customProperties.hasOwnProperty(key2)) {
                        params['p[' + encodeURIComponent(key2) + ']'] = customProperties[key2];
                    }
                }
            }

            this._myWisepopsCall(params);
        },

        /**
         * Choose the best feature to perform the request
         * @param {object} params
         */
        _myWisepopsCall: function(params) {
            var that = this;
            var url = WisePopsStorage.baseUrl.popup + '/my-wisepop';
            var paramString = '';

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    paramString += key + '=' + encodeURIComponent(params[key]) + '&';
                }
            }
            if (paramString.length) {
                paramString = paramString.slice(0, -1);
            }


            var xhr = null; // Fallback: Inject <script> tag - no POST

            if (window.XMLHttpRequest) {
                // XHR CORS Draft
                xhr = new window.XMLHttpRequest();
                if (!('withCredentials' in xhr)) {
                    xhr = null;
                } else {
                    xhr.withCredentials = true;
                }
            }

            if (!xhr && window.XDomainRequest) {
                // IE 8 - 10
                xhr = new window.XDomainRequest();
                this.log('info', 'Using XDomainRequest instead of XMLHttpRequest CORS');
            }


            if (xhr) {
                xhr.onload = function() {
                    var response = JSON.parse(this.responseText);

                    if (response.status === 'ok') {
                        var popupIds = [];
                        var maxVersion = null;

                        for (var i = 0; i < response.popups.length; i++) {
                            popupIds.push(response.popups[i].id);
                            if (!maxVersion || maxVersion < response.popups[i].v) {
                                maxVersion = response.popups[i].v;
                            }
                        }

                        if (popupIds.length) {
                            var s = document.createElement('script');
                            s.type = 'text/javascript';
                            s.async = true;
                            s.src = WisePopsStorage.baseUrl.app + '/shared/wisepops/' + response.hashPath + '/'
                                + popupIds.join('-') + '.js?v=' + maxVersion;
                            var s2 = document.getElementsByTagName('script')[0];
                            s2.parentNode.insertBefore(s, s2);

                        } else {
                            that.log('info', 'No matching scenario');
                        }
                    } else {
                        that.log('error', response.message || 'An internal error occurred');
                    }
                };

                // Just for log filtering purpose
                url += '?uid=' + params['uid'];

                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.send(paramString);

            } else {
                // The main issue is that the URL may be too big (> 2000 chars)
                this.log('warn', 'Cannot use XMLHttpRequest CORS');
                url += '?' + paramString;
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = url;
                var s2 = document.getElementsByTagName('script')[0];
                s2.parentNode.insertBefore(s, s2);
            }
        },

        /**
         * wisepops('properties', {prop1: 42, prop2: 'text'}, true);
         * Store user defined custom properties used during scenario resolution
         */
        propertiesAction: function(properties, reset) {
            if (!properties || !(properties instanceof Object)) {
                this.log('error', 'Method "properties" requires an object as 2nd parameter');

            } else {
                var verifiedProperties = {};
                var droppedProperties = [];
                var allowedTypes = ['string', 'number']; // Date is also allowed

                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        if (properties[key] === null || properties[key] === undefined) {
                            droppedProperties.push(key);
                        } else if (allowedTypes.indexOf(typeof properties[key]) === -1 && !(properties[key] instanceof Date)) {
                            this.log('error', 'Property "' + key + '" cannot an instance of "' + typeof properties[key] + '"');

                        } else if (key.length > 50 || properties[key].toString().length > 255) {
                            this.log('error', 'Property "' + key + '" is too long');

                        } else {
                            if (properties[key] instanceof Date) {
                                verifiedProperties[key] = properties[key].toJSON();
                            } else {
                                verifiedProperties[key] = properties[key];
                            }
                        }
                    }
                }

                if (!reset && droppedProperties.length) {
                    WisePopsStorage.dropCustomProperties(droppedProperties);
                }

                WisePopsStorage.addCustomProperties(verifiedProperties, reset);
            }
        },

        /**
         * wisepops('goal', 'purchasedItem', 15.99)
         */
        goalAction: function(goalName, revenue) {
            if (goalName && typeof goalName !== 'string') {
                this.log('error', 'Method "goal" accepts a goal name as optional 2nd parameter');
                goalName = null;

            } else if (goalName && goalName.length > 50) {
                this.log('warn', 'The goal name cannot exceed 50 characters');
                goalName = goalName.substr(0, 50);
            }

            if (revenue && typeof revenue !== 'number') {
                this.log('error', 'Method "goal" accepts a revenue amount as optional 3rd parameter');
                revenue = null;
            }

            if (revenue && revenue > 1000000) {
                this.log('warn', 'The revenue cannot exceed 1,000,000');
                revenue = 1000000;
            }

            var logMsg = 'Tracking goal';
            if (goalName) {
                logMsg += ' named "' + goalName + '"';
            }
            if (revenue) {
                logMsg += ' with revenue "' + revenue + '"';
            }
            this.log('info', logMsg);

            var lastPopins = WisePopsStorage.getLastDisplayedAndConvertedPopins();
            if (lastPopins.displayPopId || lastPopins.convertPopId) {
                var params = {
                    e: 'g'
                };
                if (goalName) {
                    params.n = goalName;
                }
                if (revenue) {
                    params.r = revenue;
                }
                if (lastPopins.displayPopId) {
                    params.pd = lastPopins.displayPopId;
                    params.dd = lastPopins.displayDate.toJSON();
                }
                if (lastPopins.convertPopId) {
                    params.pc = lastPopins.convertPopId;
                    params.dc = lastPopins.convertDate.toJSON();
                }
                this._trackCall(params);
            }
        },

        /**
         * Track and store display for a popup
         * @param {string} popId
         * @param {string} popLabel
         * @param {function} callback
         */
        trackDisplay: function(popId, popLabel, callback) {
            WisePopsStorage.setDisplayed(popId);
            this._trackGA('Display', popLabel);
            this._trackCall({
                e: 'd',
                p: popId
            }, callback);
        },

        /**
         * Track and store conversion for a popup
         * @param {string} popId
         * @param {string} popLabel
         * @param {function} callback
         */
        trackClick: function(popId, popLabel, callback) {
            if (WisePopsStorage.setConverted(popId)) {
                this._trackGA('Click', popLabel);
                this._trackCall({
                    e: 'c',
                    p: popId
                }, callback);
            }
        },

        /**
         * Track and store collection of email for a popup
         * @param {string} popId
         * @param {string} popLabel
         * @param {string} email
         * @param {object[]} additionalFields - [{name:_, value:_, tag:_}]
         * @param {function} callback
         */
        trackSignup: function(popId, popLabel, email, additionalFields, callback) {
            if (WisePopsStorage.setConverted(popId) && WisePopsStorage.setSubscribed(popId)) {
                this._trackGA('Signup', popLabel);

                var params = {
                    e: 'c',
                    p: popId,
                    d: email
                };

                for (var i = 0; i < additionalFields.length; i++) {
                    additionalFields[i].name = '' + additionalFields[i].name;
                    additionalFields[i].value = '' + additionalFields[i].value;
                    additionalFields[i].tag = '' + additionalFields[i].tag;

                    params['add-data[' + i + '][name]'] = additionalFields[i].name;
                    params['add-data[' + i + '][value]'] = additionalFields[i].value;

                    if (additionalFields[i].tag == '') {
                        // If tag is not set, compute it from additional field name
                        params['add-data[' + i + '][tag]'] = additionalFields[i].name.replace(/\s+/, '_').toLowerCase();
                    } else {
                        params['add-data[' + i + '][tag]'] = additionalFields[i].tag;
                    }
                }

                this._trackCall(params, callback);
            }
        },

        /**
         * Track an event
         * @param {object} params
         * @param {function} callback
         */
        _trackCall: function(params, callback) {
            callback = callback || function() {};

            var url = WisePopsStorage.baseUrl.tracking + '/_.gif?';
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    url += key + '=' + encodeURIComponent(params[key]) + '&';
                }
            }
            url = url.slice(0, -1);

            if (navigator.sendBeacon && navigator.sendBeacon(url)) {
                // Experimental - request will succeed asynchronously even if page changes
                callback();

            } else {
                var tag = document.createElement('img');
                tag.onload = callback;
                tag.src = url + '&un=' + Math.floor(Math.random() * 1000); // Prevent cache if same event is fired twice
                tag.style.display = 'none';
                document.body.appendChild(tag);
            }
        },

        _trackGA: function(event, popLabel) {
            if (WisePopsStorage.isEventGATracked(event)) {
                var ga = window[window.GoogleAnalyticsObject || 'ga'];

                if (typeof ga === 'function' && typeof ga.getAll === 'function') {
                    ga(function() {
                        ga.getAll().forEach(function(tracker) {
                            ga(tracker.get('name') + '.' + 'send', 'event', 'WisePops', event, popLabel, {
                                nonInteraction: true
                            });
                        });
                    });
                } else if (window._gaq && typeof window._gaq.push === 'function') {
                    window._gaq.push(['_trackEvent', 'WisePops', event, popLabel, undefined, true]);
                }
            }
        },

        /**
         * wisepops('log')
         * Display log into the browser console
         * @param {string} level
         */
        logAction: function(level) {
            if (!level || this.loggerLevels.indexOf(level) === -1) {
                level = 'info';
            }
            this.loggerDisplayLevel = this.loggerLevels.indexOf(level);

            for (var i = 0; i < this.logger.length; i++) {
                this._displayLogLine(this.logger[i]);
            }
        },

        /**
         * Log a message, and display it in console if it reaches the current log level
         * @param {string} level - error, warn, info, debug or trace
         * @param {string} message
         * @param {object} properties
         */
        log: function(level, message, properties) {
            if (this.loggerLevels.indexOf(level) === -1) {
                level = 'info';
            }
            var line = {
                level: this.loggerLevels.indexOf(level),
                msg: message,
                prop: properties
            };

            if (this.logger.length < this.loggerMaxSize) {
                this.logger.push(line);
            }
            this._displayLogLine(line);
        },

        /**
         * Display a log line into the browser console
         * @param {object} line
         */
        _displayLogLine: function(line) {
            if (this.loggerDisplayLevel !== null) {
                // eslint-disable-next-line no-console
                if (line.level <= this.loggerDisplayLevel && console[this.loggerLevels[line.level]]) {
                    var logLine = 'WisePops - ' + line.msg;

                    if (line.prop) {
                        logLine = {
                            message: logLine,
                            properties: line.prop
                        };
                    }
                    // eslint-disable-next-line no-console
                    console[this.loggerLevels[line.level]](logLine);
                }
            }
        }
    };



    /**
     * III. Initialization
     */
    WisePopsStorage._init();
    WisePopsApi._init();

})();



/**
 * IV. Compatibility with old pop-ups JS files
 */

/* eslint-disable no-unused-vars */
var wiseStorage = {
    isConverted: function(popId) {
        return this._getObj()._storage.isConverted(popId);
    },
    setConverted: function(popId) {
        return this._getObj()._storage.setConverted(popId);
    },
    setDisplayed: function(popId) {
        return this._getObj()._storage.setDisplayed(popId);
    },
    _getObj: function() {
        return window[window['WisePopsObject']];
    }
};

function WisepopsAddToCookiePage() {
    // That was used to store displayed pop-ups in session
    // WisePopsStorage.setDisplayed now handles it
}
/* eslint-enable no-unused-vars */
