

	var app= angular.module('musicApp', ['ngSanitize']).config(function($sceProvider){
		$sceProvider.enabled(false);
	});

	app.controller('appController', ['$scope', '$http', function($scope, $http){
		var url= "http://api.soundcloud.com/tracks.json";
		config = {
			params: {
				client_id: '89032ef3d6322c2f5fc4b3a169ca515d',
				callback:'JSON_CALLBACK'
			}
		}

		$scope.getSong = function(){
			$scope.results = "";
			$scope.loading = true;
			config.params.q = $scope.song || "Trey Songz";
			$http.jsonp(url, config).success(function(tracks){
				$scope.loading = false;
				$scope.results= tracks;
			})
		}
		$scope.playState = false;

		$scope.getSong();

		$scope.artworkImage = function(img){

			if(img == null){
				return "img/default.jpg";
			}
			else {
				return img;
			}

		}

		$scope.playSong = function(stream){
			$scope.playState = true;
			$scope.audioLink = stream;
			console.log($scope.audioLink);
			return false;
		}

		$scope.canPlay = function(i){
			if(i === undefined){
				return false
			} 
			else {
				return true;
			}
		}

		$scope.downloadable = function(j){
			if(j === null){
				return false
			} 
			else {
				return true;
			}
		}

		$scope.tab = 1;

		$scope.selectTab =function(setTab) {
			$scope.tab = setTab;
		};
		$scope.isSelected = function(){
			return $scope.tab;
		};


	}]);

