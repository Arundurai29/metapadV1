import * as Notifications from 'expo-notifications';

// Function to request notification permissions
export async function requestNotificationPermissions() {
  const settings = await Notifications.getPermissionsAsync();
  let finalStatus = settings.status;

  // Only ask if permissions have not already been determined
  if (settings.status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return false;
  }

  return true;
}

// Function to schedule an hourly notification
export async function scheduleHourlyNotification() {
  // Cancel all existing notifications to avoid duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule the notification to trigger every hour
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Metapad Reminder",
      body: "Hey Brainy, we’ve got a new challenge for you!!",
      sound: true,
    },
    trigger: {
      seconds: 7200, // 3600 seconds = 1 hour
      repeats: true,
    },
  });
}

// Set the handler for incoming notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
