import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppContext } from "../contexts/AppContext";

const CountryCard = ({ country }) => {
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
        {country.name}
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        {country.iso2} • {country.iso3} • {country.numeric_code}
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        Capital: {country.capital || "N/A"}
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        Region: {country.region} • {country.subregion}
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        Currency: {country.currency} ({country.currency_symbol})
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        Phone: +{country.phone_code}
      </Text>
      <Text
        style={[
          styles.details,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        TLD: {country.tld}
      </Text>
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
});

export default CountryCard;
