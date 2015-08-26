
(function(exports) {
  'use strict';
  var rparams = /([^?=&]+)(?:=([^&]*))?/g;

  var Utils = {
    params: function(input) {
      var parsed = {};
      input.replace(rparams, function($0, $1, $2) {
        if ($2 === 'true') {
          $2 = true;
        } else if ($2 === 'false') {
          $2 = false;
        }
        parsed[$1] = $2;
      });
      return parsed;
    }
  };

  exports.Utils = Utils;

}(this));
