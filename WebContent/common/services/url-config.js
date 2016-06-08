(function () {
    'use strict'
    angular.module('app.webServiceApi', []).factory('webServiceApi', [webService]);

    function webService() {

        var getUrl = window.location;
        var path = '';
        var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + path;
        var services = {

        };
        return services;
    }
})();