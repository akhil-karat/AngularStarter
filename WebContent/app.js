(function () {
    'use strict';
    /**version:1.0.0**/
    angular.module('app', ['ui.router', 'ui.bootstrap', 'app.components', 'app.controller',
	                     'app.filters', 'app.services', 'app.constant', 'app.webServiceApi']).config(config);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(routeConfig.defaultPath);
        angular.forEach(routeConfig.routes, function (route) {
            $stateProvider.state(route.state, {
                url: route.url,
                templateUrl: route.templateUrl,
                controller: route.controller,
                controllerAs: route.controllerAs,
                restricted: route.restricted,
                params: route.params,
                adGroup: route.adGroup
            });
        });
    }

    angular.module('skp').run([function () {
        $rootScope.$on('$stateChangeStart', function (event, next) {

        });
	}]);

})();