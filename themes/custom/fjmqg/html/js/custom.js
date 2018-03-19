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
        menu  = $('.main-header-nav'),
        header = $('#main-header');

    burger.click(function() {
      menu.toggle("slide");
      header.toggleClass('mobile-menu-toggled');
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

    // hover-effect
    var mouse = {
        X:  0,
        Y:  0,
        CX: 0,
        CY: 0
      },
      block = {
        X:  mouse.X,
        Y:  mouse.Y,
        CX: mouse.CX,
        CY: mouse.CY
      };
    
    $('.view-elem').each(function() {
      $(this).on('mousemove', function(e) {
        mouse.X   = (e.pageX - $(this).offset().left) - $(this).width() / 2;
        mouse.Y   = (e.pageY - $(this).offset().top) - $(this).height() / 2;

        block.CY += (mouse.Y - block.CY) / 12;
        block.CX += (mouse.X - block.CX) / 12;

        $(this).css({
          transform : 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'
        });

        $(this).on('mouseleave', function(){
          $(this).removeAttr('style');
        })
      });
    })

    //select into checkbox
    $('select').multicheckbox({
      label_wrap: '',
      scroll_wrapper_enabled: true,
    });

    // filter tabs
    var tabs = $('.form-item'),
        viewFilters = $('.view-filters'),
        titleFilters = $('#filter');


    tabs.each(function() {
      $(this).click(function() {
        $(this).toggleClass('is-active');
      })
    })

    titleFilters.click(function() {
      viewFilters.slideToggle("fast");
      $(this).toggleClass('is-active');
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