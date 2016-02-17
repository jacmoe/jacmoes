(function($){
    $(document).ready(function() {

    $.cookiesDirective({
      backgroundOpacity: '95',
      position: 'bottom',
      explicitConsent: false,
      message: 'This website uses cookies for analytics. By visiting this site you accept the use of cookies.',
      privacyPolicyUri: 'cookies'
    });

    hljs.initHighlightingOnLoad();


  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });


  $(function () {
      $.scrollUp({
          scrollName: 'scrollUp', // Element ID
          scrollDistance: 140, // Distance from top/bottom before showing element (px)
          scrollFrom: 'top', // 'top' or 'bottom'
          scrollSpeed: 300, // Speed back to top (ms)
          easingType: 'linear', // Scroll to top easing (see http://easings.net/)
          animation: 'fade', // Fade, slide, none
          animationInSpeed: 200, // Animation in speed (ms)
          animationOutSpeed: 200, // Animation out speed (ms)
          scrollText: 'Scroll to top', // Text for element, can contain HTML
          scrollTitle: false, // Set a custom <a> title if required. Defaults to scrollText
          scrollImg: true, // Set true to use image
          activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
          zIndex: 2147483647 // Z-Index for the overlay
      });
  });

    });
})(jQuery);
