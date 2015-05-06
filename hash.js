'use strict';

(function() {
  var hashNode = document.querySelector('.hash');
  function onHashChange() {
    console.log(`onHashChange: new hash is ${location.hash}`);
    hashNode.textContent += `Hash is: ${location.hash}\n`;
  }

  function init() {
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
  }

  init();
})();
