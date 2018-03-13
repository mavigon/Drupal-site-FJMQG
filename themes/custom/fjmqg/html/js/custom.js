//import libraries
var jQuery = require('jquery');
var slick = require('slick-carousel');
var jcf = require('jcf');
var msDropdown = require('./jquery.dd');


;(function($) {
  //toogle class function
  function toggleClassByClick (blockToggleClass, className) {
    blockToggleClass.toggleClass(className)
  };

  $(document).ready(function() {

    //fix ios touch events
    (function(l){var i,s={touchend:function(){}};for(i in s)l.addEventListener(i,s)})(document);
    
    //mobile navigation events
    var burger  = $('#burger'),
        header  = $('#main-header');

    burger.click(function() {
      toggleClassByClick(header, 'mobile-menu-toggled');
    })

    //dropdown country-list
    $('#countries').msDropdown();

    //foto-slider
    $('.foto-list').slick({
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: 'cubic-bezier(1,0,0,1)'
    });

    //add header padding-top in case opened drupal-menu (admin mode)

    if($('#toolbar-administration').length) {
      header.css('padding-top', '80px');
    }

  });
})(jQuery);

var _loading_spinner = setInterval(function() {
  if(document.readyState == 'complete') {
    var $page_loading = document.getElementById('page_loading'),
        $body = document.body || document.getElementsByTagName('body')[0],
        speed = 300,
        delay = 300;

    if((typeof $page_loading != 'undefined') && ($page_loading != null)) {
      setTimeout(function() {
        var transition = 'opacity ' + speed.toString() + 'ms ease';

        ['-webkit-transition','-moz-transition','transition'].forEach(function(prefix) {
          $page_loading.style[prefix] = transition;
        });
        $page_loading.style['opacity'] = '0';
        $page_loading.style['filter']  = 'alpha(opacity=0)';
        setTimeout(function(){
          $page_loading.parentNode.removeChild($page_loading);
        }, speed + 10);
      }, delay);
    }
    clearInterval(_loading_spinner);
  }
}, 10);