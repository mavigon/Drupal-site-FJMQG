//import libraries
var $ = require('jquery');
var slick = require('slick-carousel');
var jcf = require('jcf');
var msDropdown = require('./jquery.dd');


;(function($) {
  //toogle class function
  function toggleClassByClick (changeClass, className) {
    changeClass.toggleClass(className)
  };

  $(document).ready(function() {
    
    //mobile navigation events
    var burger= $('#burger'),
        header   = $('#header');

    burger.click(function() {
      toggleClassByClick(header, 'mobile-menu-toggled');
    })

    //dropdown country-list
    $("#countries").msDropdown();

  });
})($);