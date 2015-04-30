'use strict';

(function() {
  var hashNode = document.querySelector('.hash');
  function onHashChange() {
    hashNode.textContent = location.hash;
  }

  function init() {
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
  }

  init();
})()
