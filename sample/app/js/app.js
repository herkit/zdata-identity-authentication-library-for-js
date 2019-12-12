(function () {

    window.config = {
        instance: 'https://id-dev.zdata.no/',
        clientId: 'zidaltest',
        postLogoutRedirectUri: window.location.origin,
        cacheLocation: 'localStorage',
        popUp: true,
        scope: 'openid profile'
    };
    var authContext = new AuthenticationContext(config);

    var $signInButton = document.getElementById("loginButton");
    var $signOutButton = document.getElementById("logoutButton");
    var $errorMessage = document.getElementById("errorMessage");
    var $userDisplay = document.getElementById("userDisplay");

    this.updateLoginInfo = function() {
        console.log("updateLoginInfo");
        var user = authContext.getCachedUser();
        if (user) {
            $userDisplay.innerHTML = user.userName;
            $userDisplay.style.display = '';
            $signInButton.style.display = 'none';
            $signOutButton.style.display = '';
        } else {
            $userDisplay.innerHTML = "";
            $userDisplay.style.display = 'none';
            $signInButton.style.display = '';;
            $signOutButton.style.display = 'none';;
        }
    }();

    var self = this;

    authContext.callback = (p1, p2, p3) => {
        console.log("Callback triggered", p1, p2, p3);
        var user = authContext.getCachedUser();
        if (user) {
            $userDisplay.innerHTML = user.userName;
            $userDisplay.style.display = '';
            $signInButton.style.display = 'none';
            $signOutButton.style.display = '';
        } else {
            $userDisplay.innerHTML = "";
            $userDisplay.style.display = 'none';
            $signInButton.style.display = '';;
            $signOutButton.style.display = 'none';;
        }
    }

    var isCallback = authContext.isCallback(window.location.hash);
    authContext.handleWindowCallback();
    $errorMessage.innerHTML = authContext.getLoginError();

    if (isCallback && !authContext.getLoginError()) {
        window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
        self.updateLoginInfo();
    }

    $signInButton.onclick = () => {
        authContext.login();
    }
    $signOutButton.onclick = () => {
        authContext.logOut();
    }
}());