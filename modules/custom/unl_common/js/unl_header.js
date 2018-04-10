/**
 * @file
 * Contains js for the accordion example.
 */

(function ($, Drupal) {

    Drupal.behaviors.unlCountryList = {
        attach: function (context, settings) {
            $('#countries', context).on('change', function() {
              var data_href = $(this).find(":selected").attr('data-href');
              var new_url = data_href.replace('\/en',  '/' + $(this).find(":selected").attr('data-lang'));
              new_url = new_url.replace('\/es',  '/' + $(this).find(":selected").attr('data-lang'));
              window.location.replace(new_url);
            });
        }
    };

})(jQuery, Drupal);
