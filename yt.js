var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('video-placeholder', {
		width: 600,
		height: 400,
		videoId: 'ipPC8SF6LxY',
		// ipPC8SF6LxY
		// vrP-_T-h9YM
		playerVars: {
			color: 'white',
			//start: 
			//autoplay: '1'
			//playlist: 'taJ60kskkns,FG0fTKAqZ5g'
		},
		events: {
			onReady: initialize
		}
	});
}

function initialize(){
	// Update the controls on load
	addSpans();
	RandomizeWords();
}
function addSpans(){
	var ps = document.querySelectorAll('#closed-captions p');
	var i = 0;
	var regex = /\S+/g;
	while ( i < ps.length ) {
		var str = ps[i].innerText;
		var result = str.replace(regex, function(a) {
			return "<span>" + a + "</span>";
		});
		ps[i].innerHTML = result;
		ps[i].classList.add('p' + i);
		i++;		
	}
	updateTimerDisplay();
}

// gegeneerd met chatGPT, omdat ik niet hetzelfde 5 keer wou schrijven
function RandomizeWords() {
	const spans = document.querySelectorAll('.p18 span');
	spans.forEach(span => {
		const fontSize = Math.random() * 2 + 1;
		const left = Math.random() * 85 - 30;

		let top;
		if (left > -5 && left < 35) {
			top = (Math.random() < 0.5)
				? Math.random() * 8 + 5
				: -(Math.random() * 20 + 55);
		} else {
			top = Math.random() * 88 - 75;
		}

		const rotate = Math.random() * 30 - 15;
		const animationTime = Math.random() * (1.2 - 0.4) + 0.4;
		const animationDelay = Math.random() * 2;

		span.style.fontSize = `${fontSize}rem`;
		span.style.left = `${left}dvw`;
		span.style.top = `${top}dvh`;
		span.style.rotate = `${rotate}deg`;
		span.style.animationDuration = `${animationTime}s`;
		span.style.animationDelay = `${animationDelay}s`;
	});
}

function updateTimerDisplay(){
	var t = player.getCurrentTime();
	t = Math.floor10(t,-1);
	// for each paragraph we want to know:
	// (paragraph number, start time, end time, current time)

	//Officer K D 6 - 3 . 7. Let’s begin. Ready?
	var i = 0;
	while( i < captions.length) {
		pTimes(i,captions[i][0],captions[i][1],t);
		i++;
	}
	var i = 0;
	while( i < sounds.length) {
		sTimes(i,sounds[i],t);
		i++;
	}
// Change 136.1 to the length of your own video in seconds
	if ( t < 131) {
		setTimeout(() => {
			updateTimerDisplay();
		}, 100);
	}
	
}
function pTimes(num,startT,endT,curT) {
	var curP = document.querySelector('.p' + num);
	if(curT > endT && !curP.classList.contains('off')) {
		curP.classList.add('off');
		curP.classList.remove('on');
	}
	if(curT < endT && curP.classList.contains('off')) {
		curP.classList.remove('off');
	}
	if( curT > startT && curT < endT && !curP.classList.contains('on')) {
		curP.classList.add('on');
	}
	if( curT < startT && curP.classList.contains('on')) {
		curP.classList.remove('on');
	}
}

function sTimes(num,soundStarts,curT) {
	var soundClass = 'sound' + num;
	var b = document.querySelector('body');
	if( curT > soundStarts && !b.classList.contains(soundClass)) {
		b.classList.add(soundClass);
	}
	if( curT < soundStarts && b.classList.contains(soundClass)) {
		b.classList.remove(soundClass);
	}
}

(function() {
	/**
	 * Decimal adjustment of a number.
	 *
	 * @param {String}  type  The type of adjustment.
	 * @param {Number}  value The number.
	 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
	 * @returns {Number} The adjusted value.
	 */
	function decimalAdjust(type, value, exp) {
	// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}
	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}
})();

