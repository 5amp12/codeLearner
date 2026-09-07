import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LessonNode } from '@/components/lesson-path/lesson-node';
import { TopStatsBar } from '@/components/lesson-path/top-stats-bar';
import { UnitBanner } from '@/components/lesson-path/unit-banner';
import { ThemedView } from '@/components/themed-view';
import { PATH_UNITS } from '@/constants/lesson-path';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.screen}>
      <TopStatsBar />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {PATH_UNITS.map((unit) => (
            <View key={unit.id} style={styles.unitBlock}>
              <UnitBanner unitLabel={unit.unitLabel} title={unit.title} colorIndex={unit.colorIndex} />

              <View style={styles.nodesColumn}>
                {unit.nodes.map((node, index) => (
                  <LessonNode
                    key={node.id}
                    node={node}
                    colorIndex={unit.colorIndex}
                    offsetIndex={index}
                    onPress={() => Alert.alert('Lesson tapped', `${node.kind} · ${node.status}`)}
                  />
                ))}
              </View>
            </View>
          ))}

          <View style={{ height: insets.bottom + BottomTabInset + Spacing.six }} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  unitBlock: {
    marginBottom: Spacing.three,
  },
  nodesColumn: {
    alignItems: 'center',
    paddingTop: Spacing.six,
    gap: Spacing.four,
  },
});
