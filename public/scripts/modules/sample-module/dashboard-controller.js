define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardsCtrl', ['$scope', '$log', '$http', 'PredixAssetService', 'PredixViewService', function($scope, $log, $http, PredixAssetService, PredixViewService) {
        $scope.tsData = null;
        $http({
            method: 'GET',
            url: '../sample-data/core-vibe-rear-cruise.json'//change this url to new json file location
        }).
        success(function(data, status, headers, config) {
            $scope.tsData = data;
        }).error(function(data, status, headers, config) {});

    $scope.functionCall = function(){
        console.log('function called');
        var val = $scope.value;
        if(val !== null && val !== 0 && val !== ''){
        var object= null;
        var object = angular.copy($scope.tsData);
        for(var i=0;i<object.length;i++){
        object[i][1] = object[i][1]*val;
    }
    $scope.tsData = object;
        }
    }

    $scope.functionName = function(){
        $scope.tsData = null;
         $http({
        method: 'GET',
        url: '../sample-data/core-vibe-rear-cruise.json' // change this url to new json file location
    }).
    success(function(data, status, headers, config) {
                console.log('success called');
               $scope.tsData = data;
               $scope.functionCall()
    }).error(function(data, status, headers, config) {});

    }

	$http({
		method : 'GET',
		url : 'http://hello-python-analyze.run.aws-usw02-pr.ice.predix.io/'
	 	}).
        success(function(data, status, headers, config) {
            $scope.greeting = data;
            console.log(data);
        });

        $scope.myData = [[1397102460000, 0.99], [1397139660000, 0.92], [1397177400000, 0.97], [1397228040000, 1.12], [1397248260000, 1.09], [1397291280000, 1], [1397318100000, 0.99], [1397342100000, 0.75], [1397390820000, 1.11], [1397408100000, 1.03], [1397458800000, 0.84], [1397522940000, 0.99], [1397542800000, 0.96], [1397640960000, 0.88], [1397663100000, 0.79], [1397700000000, 0.85], [1397753040000, 1.03], [1397772540000, 0.93], [1397794860000, 0.88], [1397813580000, 0.88], [1397890680000, 0.91]];
        $scope.myData2 = [[1397102460000, 3], [1397139660000, 3], [1397177400000, 3], [1397228040000, 3], [1397248260000, 3], [1397291280000, 3], [1397318100000, 3], [1397342100000, 3], [1397390820000, 3], [1397408100000, 3], [1397458800000, 3], [1397522940000, 3], [1397542800000, 3], [1397640960000, 3], [1397663100000, 3], [1397700000000, 3], [1397753040000, 3], [1397772540000, 3], [1397794860000, 3], [1397813580000, 3], [1397890680000, 3]];
        /*PredixAssetService.getAssetsByParentId('root').then(function (initialContext) {

            //pre-select the 1st asset
            initialContext.data[0].selectedAsset = true;
            $scope.initialContexts = initialContext;
            $scope.initialContextName = initialContext.data[0].name;

            //load view selector
            $scope.openContext($scope.initialContexts.data[0]);
        }, function (message) {
            $log.error(message);
        });

        $scope.decks = [];
        $scope.selectedDeckUrl = null;

        // callback for when the Open button is clicked
        $scope.openContext = function (contextDetails) {

            // need to clean up the context details so it doesn't have the infinite parent/children cycle,
            // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
            var newContext = angular.copy(contextDetails);
            newContext.children = [];
            newContext.parent = [];

            // url end point can change from context to context
            // so the same card can display different data from different contexts

            var url = {
                'parent': {
                    'datagrid-data': '/sample-data/datagrid-data.json'
                },
                'child': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                },
                'child2': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise0.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                },
                'child3': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise1.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                }
            };

            newContext.urls = url[newContext.id];

            $scope.context = newContext;

            //Tag string can be classification from contextDetails
            PredixViewService.getDecksByTags(newContext.classification) // gets all decks for this context
                .then(function (decks) {
                    $scope.decks = [];

                    if (decks && decks.length > 0) {
                        decks.forEach(function (deck) {
                            $scope.decks.push({name: deck.title, id: deck.id});
                        });
                    }
                });
        };

        $scope.viewServiceBaseUrl = PredixViewService.baseUrl;

        $scope.getChildren = function (parent, options) {
            return PredixAssetService.getAssetsByParentId(parent.id, options);
        };

        $scope.handlers = {
            itemOpenHandler: $scope.openContext,
            getChildren: $scope.getChildren
            // (optional) click handler: itemClickHandler: $scope.clickHandler
        };*/
    }]);
});
