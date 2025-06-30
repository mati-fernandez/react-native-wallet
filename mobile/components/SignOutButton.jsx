import { useClerk } from '@clerk/clerk-expo';
import { TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { universalAlert } from '../lib/utils';

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() =>
        universalAlert('Logout', 'Are you sure you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', style: 'destructive', onPress: signOut },
        ])
      }
    >
      <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
    </TouchableOpacity>
  );
};
