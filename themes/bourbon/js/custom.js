$(document).ready(function() {
    $.cookiesDirective({
      backgroundOpacity: '85',
      backgroundColor: '#262626',
      linkColor: '#FFF',
      buttonClass: 'button small',
      position: 'bottom',
      explicitConsent: false,
      message: 'This website uses cookies for analytics and commenting. By visiting this site you accept the use of cookies.',
      privacyPolicyUri: '/cookies'
    });
});