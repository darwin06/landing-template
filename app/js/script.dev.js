(function(){
	document.addEventListener("DOMContentLoaded", function(){
		//Shorthand to get elements
		var $ = function ( selector ) { return document.querySelector( selector ) };
		var year = new Date();
		
		$('#year').innerHTML = year.getFullYear();
	});

	$(document).on("scroll", onScroll);
	
	// S M O O T H  S C R O L L
	// ===================================================
	$('a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	            menu = target;
	        $target = $(target);
	        $('html, body').stop().animate({
	            'scrollTop': $target.offset().top+2
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	
	// S L I C K  S L I D E R
	// ===================================================
	$('#slickSlider').slick({
		adaptiveHeight: true,
	  dots: false,
	  draggable: false,
	  infinite: true,
	  vertical: false,
	  arrows: false,
	  speed: 1500,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 2500,
	  pauseOnHover: false,
	  responsive: [
	     {
	       breakpoint: 768,
	       settings: {
	         vertical: false,
	         draggable: true,
	       }
	     }
	     // You can unslick at a given breakpoint now by adding:
	     // settings: "unslick"
	     // instead of a settings object
	   ]
	});

	// Lazy load images https://varvy.com/pagespeed/defer-images.html
	function init() {
	var imgDefer = document.getElementsByTagName('img');
	for (var i=0; i<imgDefer.length; i++) {
		if(imgDefer[i].getAttribute('data-src')) {
			imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
			}
		}
	}
	window.onload = init;

})();

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('nav a[href^="#"]').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('nav ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
