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
		
		/*------ Start ---------*/
		/*---- Edited by vrushank - Made function for graph change on text value change -----*/
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
 
 /*------ End ---------*/
 
 /* ----  Start --------*/
 /*----- Edited by Vrushank - For rest api from another server ------*/
	$http({
		method : 'GET',
		url : 'http://hello-python-analyze.run.aws-usw02-pr.ice.predix.io/'
	 	}).
        success(function(data, status, headers, config) {
            $scope.greeting = data;
            console.log(data);
        });
		
		/*---- End -------*/

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
