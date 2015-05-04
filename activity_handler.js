'use strict';

(function(exports) {
  var messageNode = document.querySelector('.received-message');
  var messageTextNode = document.querySelector('.message-text');
  var notificationNode = document.querySelector('.received-notification');
  var notificationTextNode = document.querySelector('.notification-text');

  function log(str) {
    console.log(window.location.pathname, ':', str);
  }

  function init() {
    if (!window.navigator.mozSetMessageHandler) {
      return;
    }

    window.navigator.mozSetMessageHandler('sms-received', onSmsReceived);
    window.navigator.mozSetMessageHandler('notification', onNotification);
  }

  function onSmsReceived(message) {
    log('onSmsReceived()');
    messageTextNode.textContent = message.body;
    messageNode.hidden = false;
    sendNotification(message);
  }

  function sendNotification(message) {
    log('sendNotification()');
    var notification = new Notification(
      'Received message', { body: message.body }
    );
    notification.onclick = () => onNotification(
      { clicked: true, body: message.body }
    );
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
