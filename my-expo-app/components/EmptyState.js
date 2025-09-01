import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../contexts/AppContext";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../constants/DesignSystem";

const EmptyState = ({ title, message, icon = "search-outline" }) => {
  const { state } = useAppContext();

  const getThemeColors = () => {
    return state.theme === "dark" ? COLORS.dark : COLORS.light;
  };

  const themeColors = getThemeColors();

  return (
    <View style={styles.container}>
      <View
        style={[styles.iconContainer, { backgroundColor: themeColors.surface }]}
      >
        <Ionicons name={icon} size={48} color={themeColors.text.secondary} />
      </View>
      <Text style={[styles.title, { color: themeColors.text.primary }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: themeColors.text.secondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xxl,
    minHeight: 300,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  title: {
    ...TYPOGRAPHY.h3,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  message: {
    ...TYPOGRAPHY.body2,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 24,
  },
});

export default EmptyState;
