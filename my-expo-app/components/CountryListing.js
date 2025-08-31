import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppContext } from "../contexts/AppContext";

const CountryListing = ({ country }) => {
  const { state } = useAppContext();

  return (
    <View
      style={[
        styles.container,
        state.theme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text
        style={[
          styles.name,
          state.theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        {country.name} {country.emoji}
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        Capital: {country.capital} • Currency: {country.currency_name} (
        {country.currency_symbol})
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        Region: {country.region} • Subregion: {country.subregion}
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        Phone Code: +{country.phone_code} • TLD: {country.tld}
      </Text>
      <View style={styles.featuresContainer}>
        <Text
          style={[
            styles.features,
            state.theme === "dark"
              ? styles.darkFeaturesText
              : styles.lightFeaturesText,
          ]}
        >
          ISO2: {country.iso2} • ISO3: {country.iso3} • Numeric:{" "}
          {country.numeric_code}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginVertical: 12,
    marginHorizontal: 0,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  lightContainer: {
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    backgroundColor: "#2a2a2a",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  lightText: {
    color: "#1a1a1a",
  },
  darkText: {
    color: "#ffffff",
  },
  details: {
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 20,
  },
  lightSecondaryText: {
    color: "#666666",
  },
  darkSecondaryText: {
    color: "#cccccc",
  },
  featuresContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1.5,
    borderTopColor: "rgba(0,0,0,0.15)",
  },
  features: {
    fontSize: 14,
    lineHeight: 18,
  },
  lightFeaturesText: {
    color: "#888888",
  },
  darkFeaturesText: {
    color: "#aaaaaa",
  },
});

export default CountryListing;
