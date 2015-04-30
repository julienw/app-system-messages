'use strict';

(function(exports) {
  var messageNode = document.querySelector('.received-message');
  var messageTextNode = document.querySelector('.message-text');
  var notificationNode = document.querySelector('.received-notification');
  var notificationTextNode = document.querySelector('.notification-text');

  function init() {
    if (!window.navigator.mozSetMessageHandler) {
      return;
    }

    window.navigator.mozSetMessageHandler('sms-received', onSmsReceived);
    window.navigator.mozSetMessageHandler('notification', onNotification);
  }

  function onSmsReceived(message) {
    messageTextNode.textContent = message.body;
    messageNode.hidden = false;
    sendNotification(message);
  }

  function sendNotification(message) {
    new Notification("Received message", { body: message.body });
  }

  function onNotification(notification) {
    if (!notification.clicked && document.hidden) {
      window.close();
      return;
    }

    notificationTextNode.textContent = notification.body;
    notificationNode.hidden = false;

    ensureIsDisplayed();
  }

  function ensureIsDisplayed() {
    if (document.hidden) {
      navigator.mozApps.getSelf().then(app => app.launch());
    }
  }

  init();
})(window);
