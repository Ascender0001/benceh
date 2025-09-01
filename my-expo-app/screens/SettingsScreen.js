import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { useAppContext } from "../contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../constants/DesignSystem";

export default function SettingsScreen({ navigation }) {
  const { state, actions } = useAppContext();

  const getThemeColors = () => {
    return state.theme === "dark" ? COLORS.dark : COLORS.light;
  };

  const themeColors = getThemeColors();

  const settingsSections = [
    {
      title: "Appearance",
      icon: "color-palette",
      settings: [
        {
          label: "Dark Mode",
          type: "switch",
          value: state.theme === "dark",
          onValueChange: actions.toggleTheme,
          icon: "moon",
        },
        {
          label: "Font Size",
          type: "option",
          value: "Medium",
          options: ["Small", "Medium", "Large"],
          icon: "text",
        },
      ],
    },
    {
      title: "Notifications",
      icon: "notifications",
      settings: [
        {
          label: "Email Notifications",
          type: "switch",
          value: true,
          onValueChange: () => console.log("Email notifications toggled"),
          icon: "mail",
        },
        {
          label: "Push Notifications",
          type: "switch",
          value: false,
          onValueChange: () => console.log("Push notifications toggled"),
          icon: "phone-portrait",
        },
        {
          label: "New Listing Alerts",
          type: "switch",
          value: true,
          onValueChange: () => console.log("New listing alerts toggled"),
          icon: "alert",
        },
      ],
    },
    {
      title: "Search Preferences",
      icon: "search",
      settings: [
        {
          label: "Default Sort By",
          type: "option",
          value: "Price: Low to High",
          options: [
            "Price: Low to High",
            "Price: High to Low",
            "Newest First",
            "Area",
          ],
          icon: "swap-vertical",
        },
        {
          label: "Save Search History",
          type: "switch",
          value: true,
          onValueChange: () => console.log("Search history toggled"),
          icon: "time",
        },
      ],
    },
    {
      title: "Data & Storage",
      icon: "save",
      settings: [
        {
          label: "Clear Cache",
          type: "action",
          onPress: () => console.log("Cache cleared"),
          icon: "trash",
        },
        {
          label: "Reset Preferences",
          type: "action",
          onPress: () => console.log("Preferences reset"),
          icon: "refresh",
        },
      ],
    },
    {
      title: "About",
      icon: "information-circle",
      settings: [
        {
          label: "App Version",
          type: "info",
          value: "1.2.0",
          icon: "logo-apple-appstore",
        },
        {
          label: "Privacy Policy",
          type: "action",
          onPress: () => console.log("Privacy policy opened"),
          icon: "shield-checkmark",
        },
        {
          label: "Terms of Service",
          type: "action",
          onPress: () => console.log("Terms opened"),
          icon: "document-text",
        },
        {
          label: "Contact Support",
          type: "action",
          onPress: () => console.log("Support contacted"),
          icon: "chatbubble-ellipses",
        },
      ],
    },
  ];

  const renderSetting = (setting, index) => {
    switch (setting.type) {
      case "switch":
        return (
          <View
            key={index}
            style={[
              styles.settingRow,
              { borderBottomColor: themeColors.border },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name={setting.icon}
                size={20}
                color={themeColors.text.secondary}
                style={styles.settingIcon}
              />
              <Text
                style={[
                  styles.settingLabel,
                  { color: themeColors.text.primary },
                ]}
              >
                {setting.label}
              </Text>
            </View>
            <Switch
              value={setting.value}
              onValueChange={setting.onValueChange}
              trackColor={{
                false: themeColors.border,
                true: COLORS.primary[500],
              }}
              thumbColor={
                setting.value ? "#ffffff" : themeColors.text.secondary
              }
            />
          </View>
        );
      case "option":
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.settingRow,
              { borderBottomColor: themeColors.border },
            ]}
            onPress={() => console.log("Option selected")}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name={setting.icon}
                size={20}
                color={themeColors.text.secondary}
                style={styles.settingIcon}
              />
              <Text
                style={[
                  styles.settingLabel,
                  { color: themeColors.text.primary },
                ]}
              >
                {setting.label}
              </Text>
            </View>
            <View style={styles.optionRight}>
              <Text
                style={[
                  styles.optionValue,
                  { color: themeColors.text.secondary },
                ]}
              >
                {setting.value}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={themeColors.text.tertiary}
              />
            </View>
          </TouchableOpacity>
        );
      case "action":
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.settingRow,
              { borderBottomColor: themeColors.border },
            ]}
            onPress={setting.onPress}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name={setting.icon}
                size={20}
                color={themeColors.text.secondary}
                style={styles.settingIcon}
              />
              <Text
                style={[
                  styles.settingLabel,
                  { color: themeColors.text.primary },
                ]}
              >
                {setting.label}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={themeColors.text.tertiary}
            />
          </TouchableOpacity>
        );
      case "info":
        return (
          <View
            key={index}
            style={[
              styles.settingRow,
              { borderBottomColor: themeColors.border },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name={setting.icon}
                size={20}
                color={themeColors.text.secondary}
                style={styles.settingIcon}
              />
              <Text
                style={[
                  styles.settingLabel,
                  { color: themeColors.text.primary },
                ]}
              >
                {setting.label}
              </Text>
            </View>
            <Text
              style={[styles.infoValue, { color: themeColors.text.secondary }]}
            >
              {setting.value}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView
      style={[
        styles.scrollContainer,
        { backgroundColor: themeColors.background },
      ]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: themeColors.text.primary }]}>
        Settings
      </Text>

      {settingsSections.map((section, sectionIndex) => (
        <View
          key={sectionIndex}
          style={[styles.sectionCard, { backgroundColor: themeColors.card }]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons
              name={section.icon}
              size={20}
              color={COLORS.primary[500]}
            />
            <Text
              style={[styles.sectionTitle, { color: themeColors.text.primary }]}
            >
              {section.title}
            </Text>
          </View>
          <View style={styles.sectionContent}>
            {section.settings.map((setting, index) =>
              renderSetting(setting, index)
            )}
          </View>
        </View>
      ))}

      <Text style={[styles.footerText, { color: themeColors.text.tertiary }]}>
        © 2024 Countries List App. All rights reserved.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  sectionCard: {
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontWeight: "600",
  },
  sectionContent: {
    padding: SPACING.sm,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: SPACING.md,
  },
  settingIcon: {
    width: 24,
    textAlign: "center",
  },
  settingLabel: {
    ...TYPOGRAPHY.body2,
    flex: 1,
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  optionValue: {
    ...TYPOGRAPHY.caption,
    opacity: 0.8,
  },
  infoValue: {
    ...TYPOGRAPHY.caption,
    opacity: 0.8,
  },
  footerText: {
    ...TYPOGRAPHY.caption,
    textAlign: "center",
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
    opacity: 0.7,
  },
});
