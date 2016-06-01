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
                //{icon: 'fa-tachometer', state: 'dashboards', label: 'EcoDashboard'},
                {state: 'solar', label: 'Solar'},
                {state: 'wind', label: 'Wind'},
                // {state: 'predictions', label: 'Predictions by day'},
                {state: 'pi', label: 'Raw pi data'},
		{state: 'aboutus', label: 'About Us'}
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


    predixApp.controller('SolarCtrl', ['$scope', '$http', '$rootScope', 'restfulFactory', function ($scope, $http, $rootScope, restfulFactory) {

        $scope.solarConsumptionWithoutDemandCost = null;
        $scope.solarConsumptionWithDemandCost = null;
        $scope.solarWithoutEnergyGeneration = null;
        $scope.solarEnergyGeneration = null;
        $scope.solarConsumptionMinusGeneration = null;
        // $scope.solarWithEnergyGeneration = null;
        $scope.solar = null;
        $scope.costWithDemand = null;
        $scope.costWithoutDemand = null;
        $scope.solarLux = null;
        $scope.temperature = null;
        $scope.humidity = null;
        $scope.windSpeed = null;

        $http({
            method: 'GET',
            url: 'https://hello-python-analyze.run.aws-usw02-pr.ice.predix.io/tsFromExcel'
        }).
        success(function(data, status, headers, config) {
            console.log('end point reached');

            console.log(typeof(data));

            data = eval(data);

            $scope.timestamp = data[0][0][0];


            $scope.etConsumption = data[0].reverse();
            $scope.costWithDemand = data[1].reverse();
            $scope.costWithoutDemand = data[2].reverse();
            //$scope.solarConsumptionWithDemandCost =
            $scope.solarCalcResult1 = $scope.solarEnergyGeneration;

        }).error(function(data, status, headers, config) {});



        $scope.solarGenerated = null;
        $http({
            method: 'GET',
            url: 'https://hello-python-analyze.run.aws-usw02-pr.ice.predix.io/tsFromDat'
        }).
        success(function(data, status, headers, config) {

            data = eval(data);
            $scope.solarGenerated = data[1];
            console.log(data[1]);

            console.log(solarGenerated);
        }).error(function(data, status, headers, config) {});


        /*-------- Start Function for Consumption With demand -cost
        $http({
            method: 'GET',
            url: '../sample-data/core-vibe-rear-cruise.json' // change this url to new json file location
            //url: '../sample-data/MyETValue.json'
        }).
        success(function(data, status, headers, config) {

            $scope.solarConsuptionWithDemandCost = data;
        }).error(function(data, status, headers, config) {});
-----*/
        /*----------  End function -----------*/



        $scope.functionSolarWithInputChange1 = function(val, data){

            //$scope.functionName()

            //console.log('function called');

            if(val !== null && val !== 0 && val !== ''){


                var object= null;
                var object = angular.copy(data);
                for(var i=0;i<object.length;i++){
                    object[i][1] = object[i][1]*val;

                }

                return object;


            }
        }



        $scope.functionSolarWithInputChange2 = function(){

            //$scope.functionName()

            //console.log('function called');
            var val = $scope.value;

            if(val !== null && val !== 0 && val !== ''){
                var object= null;
                var object = angular.copy($scope.solarWithoutEnergyGeneration);
                for(var i=0;i<object.length;i++){
                    object[i][1] = object[i][1]*val;

                }

                $scope.solarWithoutEnergyGeneration= object;


            }
        }


    }]);


    predixApp.controller('WindCtrl', ['$scope', '$http', '$rootScope', 'restfulFactory', function ($scope, $http, $rootScope, restfulFactory) {

        $scope.solarConsumptionWithoutDemandCost = null;
        $scope.solarConsumptionWithDemandCost = null;
        $scope.solarWithoutEnergyGeneration = null;
        $scope.solarEnergyGeneration = null;
        $scope.solarConsumptionMinusGeneration = null;
        // $scope.solarWithEnergyGeneration = null;
        $scope.solar = null;
        $scope.costWithDemand = null;
        $scope.costWithoutDemand = null;
        $scope.solarLux = null;
        $scope.temperature = null;
        $scope.humidity = null;
        $scope.windPower = null;

        $http({
            method: 'GET',
            url: 'https://hello-python-analyze.run.aws-usw02-pr.ice.predix.io/tsFromExcel'
        }).
        success(function(data, status, headers, config) {
            console.log('end point reached');

            console.log(typeof(data));

            data = eval(data);

            $scope.timestamp = data[0][0][0];


            $scope.etConsumption = data[0].reverse();
            $scope.solarConsumptionWithoutDemandCost = data[0];
            $scope.costWithDemand = data[1].reverse();
            $scope.costWithoutDemand = data[2].reverse();
            $scope.solarEnergyGeneration = data[3].reverse();
            $scope.solarLux = data[4].reverse();
            $scope.temperature = data[5].reverse();
            $scope.pressure = data[6].reverse();
            $scope.humidity = data[7].reverse();
            $scope.windPower = data[8].reverse();
            $scope.solarWithoutEnergyGeneration = data[0];
            //$scope.solarConsumptionWithDemandCost =

            $scope.windCalcResult = $scope.windPower;
        }).error(function(data, status, headers, config) {});
        /*---- Edited by Vrushank -----*/



         $scope.functionWindWithInputChange1 = function(){
             //console.log('function called');
             var val = $scope.value;

             if(val !== null && val !== 0 && val !== ''){
                 var object= null;
                 var object = angular.copy($scope.windPower);
                 for(var i=0;i<object.length;i++){
                     object[i][1] = object[i][1]*val;

                 }
                 $scope.windCalcResult = object;
             }
         }


    }]);


    predixApp.controller('PiCtrl', ['$scope', '$rootScope', '$http', 'restfulFactory',
                                        function ($scope, $rootScope, $http, restfulFactory) {
        $scope.tsData = null;
        $http({
            method: 'GET',
            url: '../sample-data/tsFromDat.json'//change this url to new json file location
        }).
        success(function(data, status, headers, config) {
            $scope.tsData = data[0];
            console.log(data);
        }).error(function(data, status, headers, config) {});

    }]);

    predixApp.controller('PredictionsCtrl', ['$scope', '$rootScope', 'restfulFactory', function ($scope, $rootScope, restfulFactory) {
        $scope.displayMonthYear = 'January';
        $scope.firstRangeDate = '1';
        $scope.secondeRangeDate = '2';
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
