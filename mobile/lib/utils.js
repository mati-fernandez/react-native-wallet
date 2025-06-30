// lib/utils.js
import { Alert, Platform } from 'react-native';

export function formatDate(dateString) {
  // format date nicely
  // example: from this 👉 2025-05-20 to this 👉 May 20, 2025
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function universalAlert(title, description, buttons) {
  if (Platform.OS === 'web') {
    const method = buttons?.at(-1)?.onPress;
    const confirmed = method ? confirm(description) : alert(description);
    if (confirmed) method();
  } else {
    Alert.alert(title, description, buttons ?? undefined);
  }
}
