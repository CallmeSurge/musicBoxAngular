
// building an app that helps the user to search for sonngs, based on the artist name or a particular song name both foreign and local.
// the app user should also have the options to listen to or download the result of their search.
// the app would also act as a playlist for the searchResult, whereby playing the searchResults one after the other.
// the API used for this project is a SoundCloud API.





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
			config.params.q = $scope.song || "Eminem";
			$http.jsonp(url, config).success(function(tracks){
				$scope.loading = false;
				console.log(tracks);
				$scope.results= tracks;
			})
		}

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
			$scope.audioLink = stream;
			console.log($scope.audioLink);
			$scope.play();
			return false;
		}
		// $scope.audioLink = "https"+':'+"//api.soundcloud.com/tracks/113799579/stream?client_id=89032ef3d6322c2f5fc4b3a169ca515d";
		$scope.tab = 1;

		$scope.selectTab =function(setTab) {
			$scope.tab = setTab;
		};
		$scope.isSelected = function(){
			return $scope.tab;
		};

		$scope.play = function(){ 
			$scope.audio.play();
		};


	}]);








// var musicApp = {
// 	base: "http://api.soundcloud.com/tracks.json",
// 	params: {client_id :'89032ef3d6322c2f5fc4b3a169ca515d'},
// 	musicResult:null,
// 	searchButton:null,
// 	searchField:null,
// 	top20:null,
// 	textField:null,
// 	list:[], //the empty array that stores our searchResult.
// 	currentSong:null,

// 	initialize: function(){
// 		musicApp
// 		musicApp.searchButton = $('#searchButton');
// 		musicApp.searchField = $('#searchField');
// 		musicApp.top20 = $('#top20');
// 		musicApp.searchResult = $("#searchResult");
// 		musicApp.textField = $('#textField');
// 		musicApp.initEvents();

// 	},
// 	configureAudioPlayer: function(){
// 		// configuring the HTML 5 audio player
// 		musicApp.audioPlayer = $("audio#player").get(0);
// 		// and option that allows the audio player to loop the song selected to play 
// 		//musicApp.audioPlayer.loop = true;
// 	},
	// initEvents:function() {
	// 	musicApp.searchButton.click(musicApp.validity);
	// 	musicApp.configureAudioPlayer();
	// 	musicApp.searchResult.on("click","a.songs",musicApp.playSong);
	
	// },
	// playSong:function(e){	
	// 	musicApp.currentSong = parseInt($(this).next().val());
	// 	var href= $(this).prop("href");
	// 	musicApp.audioPlayer.src = href;
	// 	musicApp.audioPlayer.play();
	// 	return false;
	// },

// 	playNext: function() {
// 		// playing the song next to the current song on the searchResult.
// 		var nextSong = musicApp.currentSong + 1;
// 		// console.log(musicApp.list);
// 		musicApp.audioPlayer.src = musicApp.list[nextSong];
//         musicApp.audioPlayer.play();
//         musicApp.currentSong = nextSong;
// 	},

// 	search:function(){
// 		// the get request for the search
// 		$.getJSON(musicApp.base, musicApp.params, function(tracks) {
// 			musicApp.loadsong(tracks);
// 		});
// 	},

// 	loadsong: function(response) {
// 		var post_div = "";	//clearing the searchResult in order to bring in another searchResults
// 		var listenMsg;	
// 		var download;
// 		musicApp.list = [];
// 		// the features that would come with the result of the searchResults
// 		$.each(response, function(index, result){

// 		// the image or album art
// 		var image = result.artwork_url;
		
// 			if (image == undefined){
// 				image = "img/default.jpg";
// 				}

// 		// the song name or name of the searchResult.
// 		var songName = result.permalink;
// 		var replace = songName.replace(/-/gi, " ");

// 		// validating the available links 
// 		     if (result.stream_url == undefined) {
// 				result.post_div = "";
// 			}

// 		// the link to the songs
// 		var listenToSong = result.stream_url + '?client_id=' + musicApp.params.client_id;
// 		listenMsg = "img/button.png";
// 		download = "img/down.png";
		
// 			post_div += '<div class="post">' +
// 								'<ul id="content">' +
// 									'<li><img id="songImg" src="' + image + '"/></li>' +
// 									'<br><li class="songName">' + replace +'</li>' + '<br>' +
// 									'<li><a class="songs" href= "'+ listenToSong +
// 									'"><img class="playIcon" src="' + listenMsg + '"/></a><input type="hidden" value=' + index + '></li>' +
// 									'<li><a class="songs" href= "'+ listenToSong +
// 									'"><img class="playIcon" src="' + download + '"/></a></li>' + 
// 								'</ul>' +
// 						'</div>';

// 		// pushing each searchResult into an array declared in line-14 which allows the playlist function
// 			musicApp.list.push(listenToSong);	
// 		});

// 		// validating the searchResult, so as to alert the user if their request was valid. 
// 		if((post_div == null) || (post_div == undefined) || (post_div == "")) {
// 			$('#textField').text('No Match Found')
// 		}

// 		// appending the results of the search
// 		musicApp.searchResult.html(post_div);

// 		//clearing the content of the searchField
// 		$("#searchField").val("");
// 	},

// 	validity: function(e){

// 		// validating the input of the user and preventing the browser default actions
// 		var myMusic = musicApp.searchField.val();
// 		musicApp.textField.text('');
// 		if(myMusic) {
// 			myMusic = myMusic.trim();
// 			if(myMusic.length>1) {
// 				// calling search funtion
// 				console.log(myMusic);
// 				musicApp.params.q = myMusic;
// 				musicApp.search();
// 				return;
// 			}
			
// 		}
// 		musicApp.textField.text('You made an invalid input');
// 		e.preventDefault();

// 	}
// }

// $(document).ready(musicApp.initialize);

// Port = {
//   initialize: function () {
//   Port.Animate();
//   },

//   Animate: function(){
//     $('a[href*=#]:not([href=#])').click(function() {
//         if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//           var target = $(this.hash);
//           target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//           if (target.length) {
//             $('html,body').animate({
//               scrollTop: target.offset().top
//             }, 1000);
//             return false;
//           }
//         }
//       });
//   }

  
// }

// $(document).ready(Port.initialize);



