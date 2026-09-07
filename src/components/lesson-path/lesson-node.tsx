import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {
  LOCKED_COLOR,
  UNIT_COLORS,
  ZIGZAG_STEPS,
  ZIGZAG_STEP_WIDTH,
  type LessonNodeData,
} from '@/constants/lesson-path';
import { Spacing } from '@/constants/theme';

const NODE_SIZE = 72;
const EDGE_DEPTH = 8;

const NODE_ICON: Record<LessonNodeData['kind'], string> = {
  lesson: '⭐',
  chest: '🎁',
  trophy: '🏆',
};

type LessonNodeProps = {
  node: LessonNodeData;
  colorIndex: number;
  offsetIndex: number;
  onPress?: () => void;
};

export function LessonNode({ node, colorIndex, offsetIndex, onPress }: LessonNodeProps) {
  const colors = node.status === 'locked' ? LOCKED_COLOR : UNIT_COLORS[colorIndex % UNIT_COLORS.length];
  const translateX = ZIGZAG_STEPS[offsetIndex % ZIGZAG_STEPS.length] * ZIGZAG_STEP_WIDTH;
  const isActive = node.status === 'active';

  const pressDepth = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      pulse.value = withRepeat(
        withSequence(withTiming(1.18, { duration: 700 }), withTiming(1, { duration: 700 })),
        -1,
        true
      );
    }
  }, [isActive, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pressDepth.value }],
  }));

  return (
    <View
      style={[
        styles.wrapper,
        isActive && styles.wrapperActive,
        { transform: [{ translateX }] },
      ]}>
      {isActive && (
        <View style={[styles.calloutContainer, styles.noPointerEvents]}>
          <View style={[styles.callout, { backgroundColor: colors.base }]}>
            <Text style={styles.calloutText}>START</Text>
          </View>
          <View style={[styles.calloutArrow, { borderTopColor: colors.base }]} />
        </View>
      )}

      {isActive && (
        <Animated.View
          style={[styles.pulseRing, styles.noPointerEvents, pulseStyle, { backgroundColor: colors.soft }]}
        />
      )}

      <View style={[styles.nodeBase, { backgroundColor: colors.edge }]}>
        <Animated.View style={pressStyle}>
          <Pressable
            onPressIn={() => {
              pressDepth.value = withTiming(EDGE_DEPTH, { duration: 80 });
            }}
            onPressOut={() => {
              pressDepth.value = withTiming(0, { duration: 80 });
            }}
            onPress={onPress}
            style={[styles.nodeTop, { backgroundColor: colors.base }]}>
            <Text style={styles.icon}>{node.status === 'locked' ? '🔒' : NODE_ICON[node.kind]}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noPointerEvents: {
    pointerEvents: 'none',
  },
  wrapper: {
    width: NODE_SIZE,
    height: NODE_SIZE + EDGE_DEPTH,
    alignItems: 'center',
  },
  wrapperActive: {
    marginTop: Spacing.five,
  },
  nodeBase: {
    width: NODE_SIZE,
    height: NODE_SIZE + EDGE_DEPTH,
    borderRadius: NODE_SIZE / 2,
    alignItems: 'center',
  },
  nodeTop: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
  },
  pulseRing: {
    position: 'absolute',
    top: -10,
    width: NODE_SIZE + 20,
    height: NODE_SIZE + 20,
    borderRadius: (NODE_SIZE + 20) / 2,
  },
  calloutContainer: {
    position: 'absolute',
    top: -46,
    alignItems: 'center',
    zIndex: 1,
  },
  callout: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.three,
  },
  calloutText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  calloutArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
