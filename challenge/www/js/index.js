var appState = {
	takingPcture : true,
	imageSrc : ""
};
var mp3s = [ "hihihi", "meow", "uuuuu" ];
var onShake = function() {
	var size = mp3s.length;
	var idx = Math.floor((Math.random() * 10) % size)
	var id = mp3s[idx];
	playAudio(id);
};

var appStorageKey = "mykey1";


var app = {

	initialize : function() {
		this.bindEvents();
	},
	bindEvents : function() {
		document.addEventListener("deviceready", this.onDeviceReady, false);
		document.addEventListener("pause", this.onPause, false);
		document.addEventListener("resume", this.onResume, false);
        document.addEventListener("backbutton", this.onPause, false);
	},
	onPause : function() {
		shake.stopWatch();
	},
	onResume : function() {
		shake.startWatch(onShake, 40 /* , onError */);
	},
	onDeviceReady : function() {
		
		window.addEventListener("orientationchange", function() {
			if (window.orientation === 0) {
				document.getElementById("mooo-button").innerHTML = "mooo";
			} else {
				document.getElementById("mooo-button").innerHTML = "mbeee";
			}
		});
		shake.startWatch(onShake, 40 /* , onError */);
		document.getElementById("mooo-button").addEventListener("click",
				function() {
					playAudioByOrientation();
				});

	}
}

function playAudio(id) {
	var url = "file:///android_asset/www/media/" + id + ".mp3";

	var my_media = new Media(url,
	// success callback
	function() {
	},
	// error callback
	function(err) {
		console.error("playAudio():Audio Error: " + JSON.stringify(err));
	});

	// Play audio
	my_media.play();
}

function playAudioByOrientation() {
	var id;
	if (window.orientation === 0) {
		id = "moo";
	} else {
		id = "bee";
	}
	playAudio(id);
}

app.initialize();