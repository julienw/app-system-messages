/* globals Utils */
(function() {
  'use strict';

  var messageElement = document.querySelector('.displayed-message');
  var body = Utils.params(window.location.hash).body;
  messageElement.textContent = 'The message id is ' + body;
  messageElement.hidden = false;
})();
