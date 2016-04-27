/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'jquery',
    'angular',
    'main',
    'routes',
    'interceptors',
    'px-datasource',
    'ng-bind-polymer'
], function ($, angular) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'app.routes',
        'app.interceptors',
        'sample.module',
        'predix.datasource',
        'px.ngBindPolymer'
    ]);


    predixApp.factory('restfulFactory', function () {
        var factory = {};
        // factory.routes =
        //     uiRest: $rootScope('http://hello-python-ryan.run.aws-usw02-pr.ice.predix.io/hello', {}) };
        console.log('hello from factory');
        return factory;
    });

    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    predixApp.controller('MainCtrl', ['$scope', '$rootScope', 'restfulFactory', function ($scope, $rootScope, restfulFactory) {

        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Predix Seed',
            session: {},
            tabs: [
                {icon: 'fa-tachometer', state: 'dashboards', label: 'EcoDashboard'},
                {state: 'custom1', label: 'Custom tab1'},
                {state: 'wind', label: 'Wind'},
                {state: 'solar', label: 'Solar'}
            ]
        };

        // $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        //     if (angular.isObject(error) && angular.isString(error.code)) {
        //         switch (error.code) {
        //             case 'UNAUTHORIZED':
        //                 //redirect
        //                 predixUserService.login(toState);
        //                 break;
        //             default:
        //                 //go to other error state
        //         }
        //     }
        //     else {
        //         // unexpected error
        //     }
        // });
    }]);


    predixApp.controller('SolarCtrl', ['$scope', '$rootScope', 'restfulFactory', function ($scope, $rootScope, restfulFactory) {
        $scope.helloSolar = 'hello solar';
        console.log($scope.factoryData);
    }]);

    predixApp.controller('WindCtrl', ['$scope', '$rootScope', 'restfulFactory', function ($scope, $rootScope, restfulFactory) {
        $scope.helloWind = 'hello wind';
    }]);

    predixApp.controller('Custom1Ctrl', ['$scope', '$rootScope', 'restfulFactory', function ($scope, $rootScope, restfulFactory) {
        $scope.dataTableData = [
            {
                "index": 0,
                "name": "Liz Grimes",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/enda/73.jpg",
                "date": "Sun Aug 14 1994 03:27:03 GMT-0700 (PDT)"
            },
            {
                "index": 1,
                "name": "Frazier Lara",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/guillogo/73.jpg",
                "date": "Tue May 24 1988 14:10:20 GMT-0700 (PDT)"
            }
        ];
    }]);



    // christophFactory();
    //
    // function christophFactory() {
    //     // $scope.helloFactory = "hello factory from Christoph";
    //
    //     console.log("before ajax");
    //     $.ajax({
    //         method: 'GET',
    //         url: 'http://hello-python-ryan.run.aws-usw02-pr.ice.predix.io/hello',
    //         success: function(data) {
    //             console.log(data);
    //         }
    //     });
    //     console.log("after ajax");
    // };


    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});
