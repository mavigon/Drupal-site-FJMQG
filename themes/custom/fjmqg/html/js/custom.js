//import libraries
var $ = require('jquery');
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

  });
})($);