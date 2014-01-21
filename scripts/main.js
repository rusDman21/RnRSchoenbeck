// ~~~~~~~~~~SMOOTH SCROLLING~~~~~~~~~~
(function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to animate the scroll
		var smoothScroll = function (anchor, duration, easing) {

			// Calculate how far and how fast to scroll
			var startLocation = window.pageYOffset;
			var endLocation = anchor.offsetTop;
			var distance = endLocation - startLocation;
			var increments = distance / (duration / 16);
			var timeLapsed = 0;
			var percentage, position, stopAnimation;

			// Functions to control easing
			var easingPattern = function (type, time) {
				if ( type == 'linear' ) return time; // no easing, no acceleration
				if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
			};

			// Scroll the page by an increment, and check if it's time to stop
			var animateScroll = function () {
				timeLapsed += 16;
				percentage = ( timeLapsed / duration );
				percentage = ( percentage > 1 ) ? 1 : percentage;
				position = startLocation + ( distance * easingPattern(easing, percentage) );
				window.scrollTo(0, position);
				stopAnimation();
			};

			// Stop the animation
			if ( increments >= 0 ) { // If scrolling down
				// Stop animation when you reach the anchor OR the bottom of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
						clearInterval(runAnimation);
					}
				};
			} else { // If scrolling up
				// Stop animation when you reach the anchor OR the top of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( travelled <= (endLocation || 0) ) {
						clearInterval(runAnimation);
					}
				};
			}

			// Loop the animation function
			var runAnimation = setInterval(animateScroll, 16);

		};

		// For each smooth scroll link
		var scrollToggle = document.querySelectorAll('.scroll');

		[].forEach.call(scrollToggle, function (toggle) {
			// When the smooth scroll link is clicked
			toggle.addEventListener('click', function(e) {
				// Prevent the default link behavior
				e.preventDefault();
				// Get anchor link and calculate distance from the top
				var dataID = toggle.getAttribute('href');
				var dataTarget = document.querySelector(dataID);
				var dataSpeed = toggle.getAttribute('data-speed');
				var dataEasing = toggle.getAttribute('data-easing');
				// If the anchor exists
				if (dataTarget) {
					// Scroll to the anchor
					smoothScroll(dataTarget, dataSpeed || 500, dataEasing || 'easeInOutCubic');
				}
			}, false);
		});

	}
})();
// Forked from Smooth Scroll 2.7 (http://cferdinandi.github.io/smooth-scroll/)


(function($){

  var line_height = 24;

  var line_height_offset = (line_height - 1) + 'px';
  line_height = line_height + 'px';

  var jQueryGridContainerCss = {
    backgroundImage: 'linear-gradient(transparent ' + line_height_offset + ', rgba(255, 0, 0, .6) ' + line_height_offset + ', rgba(255, 0, 0, .6) ' + line_height + ')',
    backgroundSize: line_height + ' ' + line_height
  };

  $(function(){
    $('.jquery-grid-container').css(jQueryGridContainerCss);
    var $jQueryGrid = $('.jquery-grid');
    $(document).on('keydown', function(event) {
      if (event.which === 27) {
        event.preventDefault();
        $jQueryGrid.toggle();
      }
    });
  });
}).call(this, jQuery);
// Forked from Shay Howe https://github.com/shayhowe/jquery-grid-overlay
