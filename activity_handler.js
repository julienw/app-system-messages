'use strict';

(function(exports) {
  var messageNode = document.querySelector('.received-message');
  var messageTextNode = document.querySelector('.message-text');
  var notificationNode = document.querySelector('.received-notification');
  var notificationTextNode = document.querySelector('.notification-text');
  var reactsTo = document.querySelector('meta[name="reacts-to"]').content;

  var handlers = {
    'sms-received': onSmsReceived,
    'notification': onNotification
  };

  function log(str) {
    console.log(window.location.pathname, ':', str);
  }

  function init() {
    if (!window.navigator.mozSetMessageHandler) {
      return;
    }

    if (reactsTo in handlers) {
      window.navigator.mozSetMessageHandler(reactsTo, handlers[reactsTo]);
    }
  }

  function onSmsReceived(message) {
    log('onSmsReceived()');
    messageTextNode.textContent = message.body;
    messageNode.hidden = false;
    sendNotification(message);
  }

  function isInIframe() {
    return window.parent !== window;
  }

  function sendNotification(message) {
    log('sendNotification()');
    var notification = new Notification(
      'Received message', { body: message.body }
    );

    if (isInIframe()) {
      notification.onclick = () => onNotification(
        { clicked: true, body: message.body }
      );
    } else {
      notification.onshow = () => window.close();
    }
  }

  function onNotification(notification) {
    log('onNotification()');
    if (!notification.clicked) {
      return;
    }

    log('onNotification(clicked)');

    Notification.get().then(
      notifications => notifications.forEach(
        notification => notification.close()
      )
    );

    notificationTextNode.textContent = notification.body;
    notificationNode.hidden = false;

    ensureIsDisplayed();
  }

  function ensureIsDisplayed() {
    log('ensureIsDisplayed()');
    if (document.hidden) {
      navigator.mozApps.getSelf().then(app => app.launch());
    }
  }

  init();
})(window);
