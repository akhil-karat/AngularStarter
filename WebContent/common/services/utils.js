(function () {
        'use strict'
        angular.module('app.utils').factory('UTILS', [utilService]);

        function utilService() {

            var utils = {
                send: send
            }

            return utils;

            // Added timeout msg for custom reporting
            function send(url, method, data, successCallBack, failureCallBack, isLocal, timeOutMsg) {
                if (!isLocal) {
                    isLocal = false
                }
                if (this.loadFromLocal || isLocal) {
                    var url = this.getFolderPath(data, url);
                    method = 'GET';
                }

                var sessionToken = SESSION.storage.sessiontoken;
                var userId = SESSION.storage.skpuser;
                var config = {
                    'method': method,
                    'url': url,
                    'data': data,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'userId': userId,
                        'token': sessionToken
                    }
                };
                $http(config).success(function (response, status) {

                    successCallBack(response);
                }).error(function (response, status) {

                    failureCallBack(response);
                });
            }

        })();