/**
 * @file
 * Contains js for the accordion example.
 */

(function ($, Drupal) {

    Drupal.behaviors.unlCommon = {
        attach: function (context, settings) {
            //select into checkbox
            $('#views-exposed-form-cats-for-adoption-page-1 select', context).multicheckbox({
              label_wrap: '',
              scroll_wrapper_enabled: true
            });

            // filter tabs
            var tabs = $('#views-exposed-form-cats-for-adoption-page-1 .form-item', context),
                viewFilters = $('.view-filters', context),
                titleFilters = $('#filter', context);

                tabs.each(function() {
                  var tab = $(this);
                  var tab_is_active = false;
                  var select = tab.find('select option');
                  select.each(function() {
                      if($(this).is(':selected')){
                        tab_is_active = true;
                        $("input[value=\"" + $(this).val() + "\"]").parent().addClass('multicheckbox-on');
                      }
                      else {
                        $("input[value=\"" + $(this).val() + "\"]").parent().removeClass('multicheckbox-on');
                      }
                  });

                  $(this).click(function() {
                    $(this).toggleClass('is-active');
                  });
                  if (tab_is_active) {
                    $(this).removeClass('is-active').addClass('is-active');
                  }
                });


                titleFilters.click(function() {
                  viewFilters.slideToggle('fast');
                  $(this).toggleClass('is-active');
                });
                
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

                $('.view-elem', context).each(function() {
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
                    });
                  });
                });
                
        }
    };

})(jQuery, Drupal);
