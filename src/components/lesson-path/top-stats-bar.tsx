import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const STATS = [
  { icon: '🔥', value: '12', color: '#FF9600' },
  { icon: '💎', value: '540', color: '#1CB0F6' },
  { icon: '❤️', value: '5', color: '#FF4B4B' },
];

export function TopStatsBar() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.backgroundElement,
          paddingTop: insets.top + Spacing.two,
        },
      ]}>
      <View style={styles.inner}>
        {STATS.map((stat) => (
          <View key={stat.icon} style={styles.pill}>
            <Text style={styles.icon}>{stat.icon}</Text>
            <Text style={[styles.value, { color: stat.color }]}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  icon: {
    fontSize: 18,
  },
  value: {
    fontSize: 15,
    fontWeight: '800',
  },
});
