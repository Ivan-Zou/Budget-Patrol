export function showNotification(message, cause) {
    var notificationId = 'my_notification';
    var options = {
      type: 'basic',
      iconUrl: 'images/logo.png',
      title: cause,
      message: message,
      priority: 0
    };
  
    chrome.notifications.create(notificationId, options, function(notificationId) {
      console.log('Notification created:', notificationId);
      setTimeout(function() {
        chrome.notifications.clear(notificationId, function(wasCleared) {
          console.log('Notification cleared:', notificationId);
        });
      }, 3000);
    });
  }
  