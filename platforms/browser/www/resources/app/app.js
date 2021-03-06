window.COM_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
window.COM_TIMEFORMAT2 = 'YYYY-MM-DDTHH:mm:ss';
window.COM_TIMEFORMAT3 = 'DD/MM/YYYY HH:mm:ss';
window.COM_TIMEFORMAT4 = 'YYYY-MM-DD';

const API_DOMIAN1 = "https://api.m2mglobaltech.com/";

const API_DOMAIN4 = "https://maps.google.com/";
const API_DOMIAN7 = "https://nominatim.sinopacific.com.ua/";
const API_DOMIAN8 = "https://nominatim.openstreetmap.org/";

/*const API_DOMIAN1 = "https://api.m2mglobaltech.com/QuikTrak/V1/";
const API_DOMIAN2 = "https://api.m2mglobaltech.com/Quikloc8/V1/";
const API_DOMIAN3 = "https://api.m2mglobaltech.com/QuikProtect/V1/Client/";

const API_DOMIAN5 = "https://ss.sinopacific.com.ua/";
const API_DOMIAN6 = "https://nomad.sinopacific.com.ua/";
const API_DOMIAN7 = "https://nominatim.sinopacific.com.ua/";
const API_DOMIAN8 = "https://nominatim.openstreetmap.org/";
const API_DOMIAN9 = "https://upload.quiktrak.co/";*/

const API_URL = {};
//API_URL.LOGIN = API_DOMIAN1 + 'QuikProtect/V1/Client/Auth';
//API_URL.LOGOUT = API_DOMIAN1 + 'QuikProtect/V1/Client/Logoff';
//API_URL.EDIT_ACCOUNT = API_DOMIAN1 + 'QuikProtect/V1/Client/AccountEdit';
API_URL.LOGIN = API_DOMIAN1 + 'QuikTrak/V1/User/Auth';
API_URL.LOGOUT = API_DOMIAN1 + 'QuikTrak/V1/User/Logoff2';
API_URL.EDIT_ACCOUNT = API_DOMIAN1 + 'QuikTrak/V1/User/Edit';
API_URL.NEW_PASSWORD = API_DOMIAN1 + 'QuikTrak/V1/User/Password';

API_URL.VERIFY_DEVICE = API_DOMIAN1 + 'Common/V1/Activation/Verify';
API_URL.UPLOAD_LINK = API_DOMIAN1 + 'QuikTrak/V1/Device/UploadGPS2';

API_URL.SHARE_POSITION = API_DOMAIN4 + 'maps';

//API_URL.URL_GET_LOGIN = API_DOMIAN1 + "User/Auth?username={0}&password={1}&appKey={2}&mobileToken={3}&deviceToken={4}&deviceType={5}";
//API_URL.URL_GET_LOGOUT = API_DOMIAN1 + "User/Logoff2?mobileToken={0}&deviceToken={1}";
//API_URL.URL_EDIT_ACCOUNT = API_DOMIAN1 + "AccountEdit?MajorToken={0}&MinorToken={1}&firstName={2}&surName={3}&mobile={4}&email={5}&address0={6}&address1={7}&address2={8}&address3={9}&address4={10}";
//API_URL.URL_NEW_PASSWORD = API_DOMIAN3 + "User/Password?MinorToken={0}&oldpwd={1}&newpwd={2}";

Framework7.request.setup({
    timeout: 40*1000
});

const LoginEvents = new Framework7.Events();

let bgGeo;
// Dom7
let $$ = Dom7;

// Theme
let theme = 'md';
if (Framework7.device.ios) {
    theme = 'ios';
}

let htmlTemplate = $$('script#loginScreenTemplate').html();
let compiledTemplate = Template7.compile(htmlTemplate);
$$('#app').append(compiledTemplate());

// Init App
let app = new Framework7({
    id: 'com.sinopacific.phonetrack',
    root: '#app',
    name: 'PhoneTrack',
    theme: theme,
    view: {
        stackPages: true,
    },
    input: {
        scrollIntoViewOnFocus: true,
        scrollIntoViewCentered: true,
    },
    notification:{
        //title: self.name,
        icon: '<img src="resources/images/favicon.png" class="icon-notification" alt="" />',
        closeTimeout: 3000,
    },
    data: function () {
        return {
            logoDialog: 'resources/images/logo.png',
        };
    },
    on: {
        routerAjaxStart: function () {
            this.progressbar.show('gray');
        },
        routerAjaxComplete: function () {
            this.progressbar.hide();
        },
        init: function () {
            let self = this;

                if(window.hasOwnProperty("cordova")){
                    window.permissions = cordova.plugins.permissions;

                    //fix app images and text size
                    if (window.MobileAccessibility) {
                        window.MobileAccessibility.usePreferredTextZoom(false);
                    }
                    if (StatusBar) {
                        StatusBar.styleDefault();
                    }

                    self.methods.handleAndroidBackButton();
                    self.methods.handleKeyboard();


                    self.methods.setGeolocationPlugin();
                    //self.methods.checkTelephonyPermissions();

                    //checkTelephonyPermissions();
                }



            if(localStorage.ACCOUNT && localStorage.PASSWORD) {
                self.methods.login();
            }
            else {
                self.methods.logout();
            }
        }
    },
    methods: {
        capitalize: function(s) {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        isJsonString: function(str){
            try{let ret=JSON.parse(str);}catch(e){return false;}return ret;
        },
        findObjectByKey: function(array, key, value) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        isObjEmpty: function(obj) {
            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            // If it isn't an object at this point
            // it is empty, but it can't be anything *but* empty
            // Is it empty?  Depends on your application.
            if (typeof obj !== "object") return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (let key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        },
        hideKeyboard: function() {
            document.activeElement.blur();
            $$("input").blur();
        },
        guid: function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
        getPlusInfo: function () {
            let uid = this.methods.guid();
            if (window.device) {
                if (!localStorage.PUSH_MOBILE_TOKEN) {
                    localStorage.PUSH_MOBILE_TOKEN = uid;
                }
                localStorage.PUSH_APP_KEY = BuildInfo.packageName;
                localStorage.PUSH_APPID_ID = BuildInfo.packageName;
                localStorage.DEVICE_TYPE = device.platform;
            } else {
                if (!localStorage.PUSH_MOBILE_TOKEN)
                    localStorage.PUSH_MOBILE_TOKEN = uid;
                if (!localStorage.PUSH_APP_KEY)
                    localStorage.PUSH_APP_KEY = uid;
                if (!localStorage.PUSH_DEVICE_TOKEN)
                    localStorage.PUSH_DEVICE_TOKEN = uid;
                //localStorage.PUSH_DEVICE_TOKEN = "75ba1639-92ae-0c4c-d423-4fad1e48a49d"
                localStorage.PUSH_APPID_ID = 'android.app.quiktrak.eu.phonetrack';
                localStorage.DEVICE_TYPE = "android.app.quiktrak.eu.phonetrack";
            }
        },
        clearUserInfo: function(){
            let self = this;

            let deviceToken = localStorage.PUSH_DEVICE_TOKEN;
            let mobileToken = localStorage.PUSH_MOBILE_TOKEN;
            //let notifications = self.methods.getFromStorage('notifications');
            //let mapSettings = self.methods.getFromStorage('mapSettings');
            let trackingConfig = self.methods.getFromStorage('trackingConfig');
            let panicConfig = self.methods.getFromStorage('panicConfig');
            let emList = self.methods.getFromStorage('emergencyList');

            localStorage.clear();

            //self.methods.unregisterPush();
            /*if (notifications) {
                localStorage.setItem("COM.QUIKTRAK.NEW.NOTIFICATIONS", JSON.stringify(notifications));
            }*/
            /*if (mapSettings) {
                self.methods.setInStorage({ name: 'mapSettings', data: mapSettings });
            }*/
            if (deviceToken) {
                localStorage.PUSH_DEVICE_TOKEN = deviceToken;
            }
            if (mobileToken) {
                localStorage.PUSH_MOBILE_TOKEN = mobileToken;
            }


            if (!self.methods.isObjEmpty(trackingConfig)){
                self.methods.setInStorage({name:'trackingConfig', data:trackingConfig});
            }
            if (!self.methods.isObjEmpty(panicConfig)){
                self.methods.setInStorage({name:'panicConfig', data:panicConfig});
            }
            if (!self.methods.isObjEmpty(emList)){
                self.methods.setInStorage({name:'emergencyList', data:emList});
            }


            let data = {
                MinorToken: self.data.MinorToken,
                deviceToken: deviceToken,
                mobileToken: mobileToken,
            };
            self.request.promise.get(API_URL.LOGOUT, data, 'json')
                .then(function (result) {
                    //console.log(result);
                });
            self.utils.nextTick(()=>{
                LoginEvents.emit('signedOut');
                mainView.router.back('/',{force: true});
            }, 1000);
        },
        logout: function(){
            let self = this;
            if (localStorage.ACCOUNT) {
                $$("input[name='username']").val(localStorage.ACCOUNT);
            }

            self.methods.clearUserInfo();

            self.loginScreen.open('.login-screen');
        },
        login: function(){
            let self = this;
            self.methods.getPlusInfo();

            let account = $$("input[name='username']");
            let password = $$("input[name='password']");

            let data = {
                //account: account.val() ? account.val() : localStorage.ACCOUNT,
                username: account.val() ? account.val() : localStorage.ACCOUNT,
                password: password.val() ? password.val() : localStorage.PASSWORD,
                appKey: localStorage.PUSH_APP_KEY ? localStorage.PUSH_APP_KEY : '',
                mobileToken: localStorage.PUSH_MOBILE_TOKEN ? localStorage.PUSH_MOBILE_TOKEN : '',
                deviceToken: localStorage.PUSH_DEVICE_TOKEN ? localStorage.PUSH_DEVICE_TOKEN : '',
                deviceType: localStorage.DEVICE_TYPE ? localStorage.DEVICE_TYPE : '',
            };

            self.dialog.progress();
            self.request.promise.get(API_URL.LOGIN, data, 'json')
                .then(function (result) {
                    console.log(result.data);
                    if(result.data && result.data.MajorCode === '000') {
                        if(account.val()) {
                            localStorage.ACCOUNT = account.val().trim().toLowerCase();
                            localStorage.PASSWORD = password.val();
                        }
                        password.val(null);
                        self.methods.setInStorage({
                            name: 'userInfo',
                            data:  result.data.Data.User
                        });
                        self.data.MinorToken = result.data.Data.MinorToken;
                        self.data.MajorToken = result.data.Data.MajorToken;

                        LoginEvents.emit('signedIn', result.data.Data.User);

                        self.utils.nextFrame(()=>{
                            self.loginScreen.close();
                            self.dialog.close();
                        });

                    }else {
                        self.utils.nextFrame(()=>{
                            self.dialog.close();
                            self.dialog.alert(LANGUAGE.PROMPT_MSG013);
                            self.loginScreen.open('.login-screen');
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    self.dialog.close();
                    self.loginScreen.open('.login-screen');
                    if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }
                    window.loginDone = 1;
                });
        },
        getFromStorage: function(name){
            let ret = [];
            let str = '';
            if (name) {
                switch (name){
                    case 'userInfo':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.USERINFO");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'trackingConfig':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.TRACKERCONFIG");
                        if(str) {
                            ret = JSON.parse(str);
                        }else {
                            ret = {};
                        }
                        break;

                    case 'panicConfig':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.PANICCONFIG");
                        if(str) {
                            ret = JSON.parse(str);
                        }else {
                            ret = {};
                        }
                        break;

                    case 'emergencyList':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.EMERGENCYLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    default:
                        self.dialog.alert('There is no item saved with such name - '+name);
                }
            }else{
                self.dialog.alert('Wrong query parameters!');
                console.log(name);
            }
            return ret;
        },
        setInStorage: function(params){
            let self = this;
            if (typeof(params) == 'object' && params.name && params.data) {
                switch (params.name){
                    case 'userInfo':
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.USERINFO", JSON.stringify(params.data));
                        break;

                    case 'trackingConfig':
                        if (!this.methods.isObjEmpty(params.data)){
                            let savedConfig = this.methods.getFromStorage('trackingConfig');
                            const keys = Object.keys(params.data);
                            for (const key of keys) {
                                savedConfig[key] = params.data[key];
                            }
                            localStorage.setItem("COM.QUIKTRAK.PHONETRACK.TRACKERCONFIG", JSON.stringify(savedConfig));
                        }
                        break;

                    case 'panicConfig':
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.PANICCONFIG", JSON.stringify(params.data));
                        break;

                    case 'emergencyList':
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.EMERGENCYLIST", JSON.stringify(params.data));
                        break;

                    default:
                        self.dialog.alert('There is no function associated with this name - '+params.name);
                }
            }else{
                self.dialog.alert('Wrong query parameters!');
                console.log(params);
            }
        },
        customNotification: function(params){
            let self = this;
            self.notification.create({


                //icon: '<img src="'+self.data.AppDetails.favicon+'" class="icon-notification" alt="" />',
                title: self.name,
                //titleRightText: 'now',
                subtitle: params.title ? params.title : '',
                text: params.text ? params.text : '',
                closeTimeout: params.hold ? params.hold : 3000,
                closeOnClick: true,
                //closeButton: true,
                on: {
                    close: function (notification) {
                        notification.$el.remove();
                    }
                },

            }).open();
        },
        customDialog: function(params){
            let self = this;
            let modalTex = '';
            if (params.title) {
                modalTex += '<div class="custom-modal-title text-color-red">'+ params.title +'</div>';
            }
            if (params.text) {
                modalTex += '<div class="custom-modal-text">'+ params.text +'</div>';
            }
            self.dialog.create({
                title: '<div class="custom-modal-logo-wrapper"><img class="custom-modal-logo" src="'+ self.data.logoDialog +'" alt=""/></div>',
                text: modalTex,
                buttons: [
                    {
                        text: LANGUAGE.COM_MSG017,
                    },
                ]
            }).open();
        },

        clickOnPanicButton: function () {
            let self = this;

            self.panel.close();

            let panicConfig = self.methods.getFromStorage('panicConfig');
            let emergencyList = self.methods.getFromStorage('emergencyList');
            if ( self.methods.isObjEmpty(panicConfig) ){
                self.dialog.confirm(LANGUAGE.PROMPT_MSG022, LANGUAGE.PANIC_BUTTON_MSG00, function () {
                    mainView.router.navigate('/timing-settings/');
                });
                return;
            }
            if(!panicConfig.State){
                self.dialog.confirm(LANGUAGE.PROMPT_MSG026, LANGUAGE.PANIC_BUTTON_MSG00, function () {
                    mainView.router.navigate('/timing-settings/');
                });
                return;
            }

            self.progressbar.show('red');
            if(!self.methods.isObjEmpty(panicConfig.SMSTo)){
                bgGeo.getCurrentPosition({
                    timeout: 30,          // 30 second timeout to fetch location
                    persist: true,        // Defaults to state.enabled
                    maximumAge: 5000,     // Accept the last-known-location if not older than 5000 ms.
                    desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
                    samples: 3,           // How many location samples to attempt.
                }, function(location){
                    //alert(JSON.stringify(location));
                    self.progressbar.hide();
                    if(self.methods.isObjEmpty(location)){
                        self.methods.customDialog({text:LANGUAGE.TRACKING_PLUGIN_MSG05});
                        if(!self.methods.isObjEmpty(panicConfig.CallTo)){
                            self.methods.callToPhone(emergencyList.find( ({ Id }) => Id === panicConfig.CallTo.toString() ).Phone);
                        }
                        return;
                    }
                    let pBattery = parseInt(location.battery.level * 100) + '%';
                    let pSpeed = '0m/s';
                    if (location.coords.speed > 0){
                        pSpeed = parseFloat(location.coords.speed).toFixed(2) + 'm/s';
                    }
                    let pHeading = Helper.Methods.getDirectionCardinal(location.coords.heading);


                    let message = `${ LANGUAGE.PROMPT_MSG015 } https://www.google.com/maps?q=${ location.coords.latitude },${ location.coords.longitude }. ${ LANGUAGE.PROMPT_MSG016 } ${ pBattery }, ${ LANGUAGE.PROMPT_MSG017 } ${ pSpeed }, ${ LANGUAGE.PROMPT_MSG018 } ${ pHeading }`;
                    let numbers = [];
                    for (let i = 0; i < panicConfig.SMSTo.length; i++) {
                        numbers.push( emergencyList.find( ({ Id }) => Id === panicConfig.SMSTo[i] ).Phone );
                    }

                    SMSHelper.checkSMSPermission({
                        number: numbers,
                        message: message,
                        callback: !self.methods.isObjEmpty(panicConfig.CallTo) ? function () {
                            self.methods.callToPhone(emergencyList.find( ({ Id }) => Id === panicConfig.CallTo.toString() ).Phone);
                        } : false
                    });

                },function(errorCode){
                    self.progressbar.hide();
                    let errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG04;
                    switch (errorCode) {
                        case 0:
                            errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG00;
                            break;
                        case 1:
                            errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG01;
                            break;
                        case 2:
                            errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG02;
                            break;
                        case 408:
                            errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG03;
                            break;
                    }
                    self.methods.customDialog({text:errorMsg});

                    if(!self.methods.isObjEmpty(panicConfig.CallTo)){
                        self.methods.callToPhone(emergencyList.find( ({ Id }) => Id === panicConfig.CallTo.toString() ).Phone);
                    }
                });

            }else if(!self.methods.isObjEmpty(panicConfig.CallTo)){
                self.progressbar.hide();
                self.methods.customNotification({text: LANGUAGE.PROMPT_MSG028});
                self.methods.callToPhone(emergencyList.find( ({ Id }) => Id === panicConfig.CallTo.toString() ).Phone);
            }
        },
        callToPhone: function(phone){
            window.open('tel:'+phone, '_blank');
        },

        setGeolocationPlugin: function(){
            if(!window.BackgroundGeolocation){
                return;
            }

            bgGeo = window.BackgroundGeolocation;
            let self = this;

            let savedConfig = self.methods.getFromStorage('trackingConfig'); //trackerGetSavedConfig();
            let config = {
                //reset: true,
                reset: false,
                foregroundService: true,
                notification: {
                    priority: bgGeo.NOTIFICATION_PRIORITY_MAX
                },
                debug: false,
                logLevel: bgGeo.LOG_LEVEL_VERBOSE, //bgGeo.LOG_LEVEL_ERROR,
                desiredAccuracy: bgGeo.DESIRED_ACCURACY_HIGH,
                //distanceFilter: 10,
                allowIdenticalLocations: true,
                distanceFilter: 0,
                //locationUpdateInterval: localStorage.tracker_interval ? localStorage.tracker_interval : 60 * 1000,
                //url: 'https://sinopacificukraine.com/test/phonetrack/locations.php',
                url: API_URL.UPLOAD_LINK,
                maxDaysToPersist: 3,
                autoSync: true,
                //autoSyncThreshold: 2,
                batchSync: true,
                maxBatchSize: 50,
                stopOnTerminate: false,
                startOnBoot: true,
                speedJumpFilter: 200,
                //forceReloadOnSchedule: true,
                forceReloadOnBoot: true,
                scheduleUseAlarmManager: true,
            };

            if  (savedConfig.IMEI){
                config.params = {
                    IMEI: savedConfig.IMEI
                }
            }
            if  (savedConfig.Interval){
                config.locationUpdateInterval = savedConfig.Interval;
            }
            if  (savedConfig.Schedule && savedConfig.Schedule.length){
                config.schedule = savedConfig.Schedule;
            }
            console.log(bgGeo)
            // 2. Execute #ready method:
            bgGeo.ready(config, function(state) {    // <-- Current state provided to #configure callback
                //alert(JSON.stringify(savedConfig));
                if (savedConfig.ScheduleState && savedConfig.ScheduleState === true){
                    bgGeo.requestPermission().then((status) => {
                        bgGeo.startSchedule();
                    }).catch((status) => {
                        self.$app.methods.customDialog({text: LANGUAGE.TRACKING_PLUGIN_MSG06});
                        self.$app.methods.setInStorage({name:'trackingConfig', data: {ScheduleState: false}});
                    });
                }else{
                    bgGeo.stopSchedule(function() {
                        bgGeo.stop();
                    });
                }
            });
        },
        checkTelephonyPermissions: function(){

        },
        /*
          This method prevents back button tap to exit from app on android.
          In case there is an opened modal it will close that modal instead.
          In case there is a current view with navigation history, it will go back instead.
          */
        handleAndroidBackButton: function () {
            let f7 = this;
            const $ = f7.$;
            if (f7.device.electron) return;

            document.addEventListener('backbutton', function (e) {
                if ($('.actions-modal.modal-in').length) {
                    f7.actions.close('.actions-modal.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.dialog.modal-in').length) {
                    f7.dialog.close('.dialog.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.sheet-modal.modal-in').length) {
                    f7.sheet.close('.sheet-modal.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.popover.modal-in').length) {
                    f7.popover.close('.popover.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.popup.modal-in').length) {
                    if ($('.popup.modal-in>.view').length) {
                        const currentView = f7.views.get('.popup.modal-in>.view');
                        if (currentView && currentView.router && currentView.router.history.length > 1) {
                            currentView.router.back();
                            e.preventDefault();
                            return false;
                        }
                    }
                    f7.popup.close('.popup.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.login-screen.modal-in').length) {
                    f7.loginScreen.close('.login-screen.modal-in');
                    e.preventDefault();
                    return false;
                }

                if($('.searchbar-enabled').length){
                    f7.searchbar.disable();
                    e.preventDefault();
                    return false;
                }

                const currentView = f7.views.current;
                if (currentView && currentView.router && currentView.router.history.length > 1) {
                    currentView.router.back();
                    e.preventDefault();
                    return false;
                }

                if ($('.panel.panel-in').length) {
                    f7.panel.close('.panel.panel-in');
                    e.preventDefault();
                    return false;
                }

                if (currentView && currentView.router && currentView.router.url === '/') {
                    f7.dialog.confirm(LANGUAGE.PROMPT_MSG044, function() {
                        if(navigator){
                            navigator.app.exitApp();
                        }
                    });
                    e.preventDefault();
                    return false;
                }
            }, false);
        },
        /*
        This method does the following:
          - provides cross-platform view "shrinking" on keyboard open/close
          - hides keyboard accessory bar for all inputs except where it required
        */
        handleKeyboard: function () {
            let f7 = this;
            if (!window.Keyboard || !window.Keyboard.shrinkView || f7.device.electron) return;
            let $ = f7.$;
            window.Keyboard.shrinkView(false);
            window.Keyboard.disableScrollingInShrinkView(true);
            window.Keyboard.hideFormAccessoryBar(true);
            window.addEventListener('keyboardWillShow', () => {
                f7.input.scrollIntoView(document.activeElement, 0, true, true);
            });
            window.addEventListener('keyboardDidShow', () => {
                f7.input.scrollIntoView(document.activeElement, 0, true, true);
            });
            window.addEventListener('keyboardDidHide', () => {
                if (document.activeElement && $(document.activeElement).parents('.messagebar').length) {
                    return;
                }
                window.Keyboard.hideFormAccessoryBar(false);
            });
            window.addEventListener('keyboardHeightWillChange', (event) => {
                let keyboardHeight = event.keyboardHeight;
                if (keyboardHeight > 0) {
                    // Keyboard is going to be opened
                    document.body.style.height = `calc(100% - ${keyboardHeight}px)`;
                    $('html').addClass('device-with-keyboard');
                } else {
                    // Keyboard is going to be closed
                    document.body.style.height = '';
                    $('html').removeClass('device-with-keyboard');
                }

            });
            $(document).on('touchstart', 'input, textarea, select', function (e) {
                let nodeName = e.target.nodeName.toLowerCase();
                let type = e.target.type;
                let showForTypes = ['datetime-local', 'time', 'date', 'datetime'];
                if (nodeName === 'select' || showForTypes.indexOf(type) >= 0) {
                    window.Keyboard.hideFormAccessoryBar(false);
                } else {
                    window.Keyboard.hideFormAccessoryBar(true);
                }
            }, true);
        },

    },
    routes: routes,
    popup: {
        closeOnEscape: true,
    },
    sheet: {
        closeOnEscape: true,
    },
    popover: {
        closeOnEscape: true,
    },
    actions: {
        closeOnEscape: true,
    }
});


let mainView = app.views.create('.view-main', {
    //url: app.view.pushStateRoot ? app.view.pushStateRoot : '/',
    url: '/',
    name: 'view-main'
});

$$('body').on('submit', '[name="login-form"]', function (e) {
    e.preventDefault();
    //preLogin();
    app.methods.hideKeyboard();
    app.methods.login(this);
    return false;
});

$$('body').on('click', '.password-toggle', function(){
    let password = $$(this).siblings("input");
    if(password.prop("type") == "text"){
        password.prop("type", "password");
    }else{
        password.prop("type", "text");
    }
    $$(this).toggleClass('text-color-gray');
});

$$('body').on('click', '.panicButton', function(){
    app.methods.clickOnPanicButton();
});