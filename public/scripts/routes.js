/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            // .state('dashboards', {
            //     url: '/dashboards',
            //     templateUrl: 'views/dashboards.html',
            //     controller: 'DashboardsCtrl'
            // })
            .state('solar', {
                url: '/solar',
                templateUrl: 'views/solar.html',
                controller: 'SolarCtrl'
            })
            .state('wind', {
                url: '/wind',
                templateUrl: 'views/wind.html',
                controller: 'WindCtrl'
            })
            // .state('predictions', {
            //     url: '/predictions',
            //     templateUrl: 'views/predictions.html',
            //     controller: 'PredictionsCtrl'
            // })
            .state('pi', {
                url: '/pi',
                templateUrl: 'views/pi.html',
                controller: 'PiCtrl'
            });



        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/solar');
            $state.go('solar');
        });

    }]);
});
