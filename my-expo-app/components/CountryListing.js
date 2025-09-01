import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAppContext } from "../contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../constants/DesignSystem";

const CountryListing = ({ country }) => {
  const { state } = useAppContext();

  const getThemeColors = () => {
    return state.theme === "dark" ? COLORS.dark : COLORS.light;
  };

  const themeColors = getThemeColors();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
        },
      ]}
      activeOpacity={0.7}
    >
      {/* Header with Flag and Name */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[styles.name, { color: themeColors.text.primary }]}>
            {country.name}
          </Text>
          <Text style={[styles.code, { color: themeColors.text.secondary }]}>
            {country.iso2} • {country.iso3}
          </Text>
        </View>
      </View>

      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        {/* Capital */}
        <View style={styles.detailItem}>
          <Ionicons
            name="business"
            size={14}
            color={themeColors.text.secondary}
          />
          <Text
            style={[styles.detailText, { color: themeColors.text.secondary }]}
          >
            {country.capital || "N/A"}
          </Text>
        </View>

        {/* Region */}
        <View style={styles.detailItem}>
          <Ionicons name="globe" size={14} color={themeColors.text.secondary} />
          <Text
            style={[styles.detailText, { color: themeColors.text.secondary }]}
          >
            {country.region}
          </Text>
        </View>

        {/* Currency */}
        <View style={styles.detailItem}>
          <Ionicons name="cash" size={14} color={themeColors.text.secondary} />
          <Text
            style={[styles.detailText, { color: themeColors.text.secondary }]}
          >
            {country.currency} ({country.currency_symbol})
          </Text>
        </View>

        {/* Phone Code */}
        <View style={styles.detailItem}>
          <Ionicons name="call" size={14} color={themeColors.text.secondary} />
          <Text
            style={[styles.detailText, { color: themeColors.text.secondary }]}
          >
            +{country.phone_code}
          </Text>
        </View>
      </View>

      {/* Additional Info */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoRow}>
          <Text
            style={[styles.infoLabel, { color: themeColors.text.tertiary }]}
          >
            Subregion:
          </Text>
          <Text
            style={[styles.infoValue, { color: themeColors.text.secondary }]}
          >
            {country.subregion}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            style={[styles.infoLabel, { color: themeColors.text.tertiary }]}
          >
            TLD:
          </Text>
          <Text
            style={[styles.infoValue, { color: themeColors.text.secondary }]}
          >
            {country.tld}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            style={[styles.infoLabel, { color: themeColors.text.tertiary }]}
          >
            Numeric:
          </Text>
          <Text
            style={[styles.infoValue, { color: themeColors.text.secondary }]}
          >
            {country.numeric_code}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    ...SHADOWS.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  flag: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.xs,
  },
  code: {
    ...TYPOGRAPHY.caption,
    fontWeight: "500",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    flexBasis: "45%",
  },
  detailText: {
    ...TYPOGRAPHY.caption,
    flex: 1,
  },
  additionalInfo: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: SPACING.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  infoLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: "500",
  },
  infoValue: {
    ...TYPOGRAPHY.caption,
  },
});

export default CountryListing;
