//import libraries
var jQuery = require('jquery');
var slick = require('slick-carousel');
var jcf = require('jcf');
var msDropdown = require('./jquery.dd');
var multicheckbox = require('./multicheckbox');


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

    //hover-effect
    // var mouse = {
    //     X:  0,
    //     Y:  0,
    //     CX: 0,
    //     CY: 0
    //   },
    //   block = {
    //     X:  mouse.X,
    //     Y:  mouse.Y,
    //     CX: mouse.CX,
    //     CY: mouse.CY
    //   };

    // $('.view-elem').on('mousemove', function(e) {
    //   mouse.X   = (e.pageX - $(this).offset().left) - $(this).width() / 2;
    //   mouse.Y   = (e.pageY - $(this).offset().top) - $(this).height() / 2;

    //   block.CY += (mouse.Y - block.CY) / 42;
    //   block.CX += (mouse.X - block.CX) / 42;
  
    //   $('.view-elem .circleLight').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)');
  
    //   $('.view-elem').css({
    //     transform : 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'
    //   });
    // });

    // $('.view-elem').on('mouseleave', function(e){
    //   mouse.X = mouse.CX;
    //   mouse.Y = mouse.CY;
    // });

    // setInterval(function() {
    // }, 20);

    //select into checkbox
    $('select').multicheckbox({
      label_wrap: '',
      scroll_wrapper_enabled: true,
      
    });

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