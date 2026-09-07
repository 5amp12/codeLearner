import { Pressable, StyleSheet, Text, View } from 'react-native';

import { UNIT_COLORS } from '@/constants/lesson-path';
import { Spacing } from '@/constants/theme';

type UnitBannerProps = {
  unitLabel: string;
  title: string;
  colorIndex: number;
};

export function UnitBanner({ unitLabel, title, colorIndex }: UnitBannerProps) {
  const colors = UNIT_COLORS[colorIndex % UNIT_COLORS.length];

  return (
    <View style={[styles.banner, { backgroundColor: colors.base }]}>
      <View style={styles.textBlock}>
        <Text style={styles.unitLabel}>{unitLabel}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable style={({ pressed }) => [styles.guidebookButton, pressed && styles.pressed]}>
        <Text style={styles.guidebookIcon}>📖</Text>
        <Text style={styles.guidebookText}>Guidebook</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.four,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.four,
  },
  textBlock: {
    gap: Spacing.half,
  },
  unitLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  guidebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  guidebookIcon: {
    fontSize: 16,
  },
  guidebookText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  pressed: {
    opacity: 0.7,
  },
});
