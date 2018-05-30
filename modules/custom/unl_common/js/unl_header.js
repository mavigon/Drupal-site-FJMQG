/**
 * @file
 * Contains js for the accordion example.
 */

(function ($, Drupal) {

    Drupal.behaviors.unlCountryList = {
        attach: function (context, settings) {
            $('#countries', context).on('change', function() {
              var data_href = $(this).find(":selected").attr('data-href');
              var temp_array = data_href.split("/");
              temp_array[3] = $(this).find(":selected").attr('data-lang');
              var new_url = temp_array.join("/");
              window.location.replace(new_url);
            });
        }
    };

})(jQuery, Drupal);
