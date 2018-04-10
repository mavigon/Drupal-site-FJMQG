/**
 * @file
 * Contains js for the accordion example.
 */

(function ($) {

    Drupal.behaviors.unlCountryList = {
        attach: function (context, settings) {
            $('#countries', context).on('change', function() {
              var data_href = $(this).find(":selected").attr('data-href');
              var new_url = data_href.replace('\/en',  '/' + $(this).find(":selected").attr('data-lang'));
              window.location.replace(new_url);
            });
        }
    };

})(jQuery);
