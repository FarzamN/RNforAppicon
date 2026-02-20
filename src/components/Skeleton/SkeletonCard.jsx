import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function SkeletonCard() {
  const { dark: isDark, colors } = useTheme();

  const skeletonColors = {
    card: isDark ? "#1E1E1E" : "#F0F0F0",
    element: isDark ? "#2C2C2C" : "#DDDDDD",
    line: isDark ? "#3A3A3A" : "#E5E5E5",
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: skeletonColors.card,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View
        style={[styles.avatar, { backgroundColor: skeletonColors.element }]}
      />
      <View style={styles.textBlock}>
        <View style={[styles.line, { backgroundColor: skeletonColors.line }]} />
        <View
          style={[
            styles.line,
            {
              width: "60%",
              backgroundColor: skeletonColors.line,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textBlock: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },
  line: {
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
});
