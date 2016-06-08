(function () {
    routeConfig = {
        "defaultPath": "/login",
        "routes": [
            {
                "state": "login",
                "url": '/login',
                "templateUrl": "modules/Login/login.html",
                "controller": "loginCtrl",
                "controllerAs": "vm",
                "restricted": false,
                "deps": {
                    "css": [

					        ],
                    "js": [

                            ]
                }
					},
            {
                "state": "home",
                "url": '/home',
                "templateUrl": "modules/Home/home.html",
                "controller": "homeController",
                "controllerAs": "vm",
                "restricted": true,
                "params": {},
                "deps": {
                    "css": [

					        ],
                    "js": [

                            ]
                }
					}
             ]
    }
})();