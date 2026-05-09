import type { PrayerTimes, Amel } from '../types';
import { t2m } from './prayerTimesService';
import { getSmartSuggestion } from './suggestionService';
import i18n from '../i18n';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function schedulePrayerNotifications(pt: PrayerTimes) {
  await cancelAllNotifications();

  const prayers = [
    { name: 'İmsak (Sabah) Vakti', time: pt.Fajr,    key: 'sabah_sonrasi' },
    { name: 'Öğle Vakti',          time: pt.Dhuhr,   key: 'ogle' },
    { name: 'İkindi Vakti',         time: pt.Asr,     key: 'ikindi' },
    { name: 'Akşam Vakti',          time: pt.Maghrib, key: 'aksam' },
    { name: 'Yatsı Vakti',          time: pt.Isha,    key: 'yatsi' },
  ];

  for (const p of prayers) {
    const [hour, minute] = p.time.split(':').map(Number);
    const trigger = new Date();
    trigger.setHours(hour, minute, 0, 0);
    if (trigger <= new Date()) {
      trigger.setDate(trigger.getDate() + 1);
    }

    const suggestion = getSmartSuggestion(p.key);
    const body = suggestion 
      ? i18n.t('notifications.prayer_with_suggestion', { 
          prayer: p.name, 
          amel: suggestion.t 
        })
      : i18n.t('notifications.prayer_alert', { 
          prayer: p.name 
        });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🕌 ${p.name}`,
        body: body,
        sound: true,
        data: suggestion ? { amelId: suggestion.id } : {},
      },
      trigger: {
        date: trigger,
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
    });
  }
}
