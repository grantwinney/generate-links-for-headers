// https://developer.chrome.com/apps/notifications
// https://developer.chrome.com/apps/app_codelab_alarms
chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'icons/links-for-headers-128.png',
    title: 'Don\'t forget!',
    message: 'You have 5 things to do. Wake up, dude!'
 }, function(notificationId) {});