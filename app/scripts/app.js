(function(document){
  'use strict';

  var app = document.querySelector('#app');

  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  window.addEventListener('WebComponentsReady', function() {
    console.log('WebComponentsReady');
  });
})(document);
