//import libraries
// var jQuery = require('jquery');
// var slick = require('slick-carousel');
// var jcf = require('jcf');
// var msDropdown = require('./jquery.dd');
// var multicheckbox = require('./multicheckbox');


;(function($) {
  $(document).ready(function() {

    //fix ios touch events
    (function(l){var i,s={touchend:function(){}};for(i in s)l.addEventListener(i,s)})(document);
    
    //mobile navigation events
    var burger  = $('#burger'),
        menu  = $('.main-header-nav'),
        header = $('#main-header'),
        toggleAside = $('.aside-list-links__toogle'),
        aside = $('.list-links');
    burger.click(function() {
      menu.toggle('slide');
      header.toggleClass('mobile-menu-toggled');
    });
    
    toggleAside.click(function() {
      aside.toggleClass('show');
    });

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

    //change height contact-info block
    
    var contactInfo = $('.contact-info');
    var headerHeight = $('.main-header').height();
    var footerHeight = $('.main-footer').height();
    var screenHeight = $(document).height();
    // 8 it's border height in header (4px) and footer (4px)
    var heightBlock = screenHeight - headerHeight - footerHeight - 8;

    function changeHeight(height) {
      contactInfo.css('height', height + 'px');
    }

    if($(window).width() >= 750) {
      changeHeight(heightBlock);
    }

    $(window).resize(function () {
      if($(window).width() >= 750) {
        screenHeight = $(document).height();
        headerHeight = $('.main-header').height();
        footerHeight = $('.main-footer').height();
        heightBlock = screenHeight - headerHeight - footerHeight - 8;
        changeHeight(heightBlock);
      } else {
        contactInfo.css('height', 'auto');
      }
    });

    //google map
    var map;
    function initMap() {
         console.log(jQuery('#map').length);
      if(typeof jQuery('#map').length !== 'undefined'
        &&  typeof google !== 'undefined'){
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.527664, lng: -0.690127},
          zoom: 8
        });
        
        var marker = new google.maps.Marker({
          position: {lat: 39.527664, lng: -0.690127},
          map: map,
          title: ''
        });
      }
      
    }

    initMap();

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