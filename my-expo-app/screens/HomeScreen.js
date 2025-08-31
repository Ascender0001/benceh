import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useAppContext } from "../contexts/AppContext";
import CountryListing from "../components/CountryListing";

export default function HomeScreen({ navigation }) {
  const { state, actions } = useAppContext();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    region: "",
  });

  useEffect(() => {
    const loadCountries = () => {
      try {
        const response = require("../assets/data.json");
        setCountries(response);
        setFilteredCountries(response);
      } catch (error) {
        console.error("Error loading countries data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (countries.length === 0) return;

    let filtered = countries.filter((country) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const featuresString =
          `${country.name} ${country.capital} ${country.region} ${country.subregion} ${country.currency_name} ${country.currency} ${country.phone_code} ${country.tld}`.toLowerCase();

        if (!featuresString.includes(query)) {
          return false;
        }
      }

      // Region filter
      if (filters.region && country.region !== filters.region) {
        return false;
      }

      return true;
    });

    setFilteredCountries(filtered);
  }, [searchQuery, filters, countries]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          state.theme === "dark" ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        <Text
          style={[
            styles.title,
            state.theme === "dark" ? styles.darkText : styles.lightText,
          ]}
        >
          Loading countries...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        state.theme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text
        style={[
          styles.title,
          state.theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        Countries Browser
      </Text>

      {/* Search Bar */}
      <TextInput
        style={[
          styles.searchInput,
          state.theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Search by name, capital, region, currency..."
        placeholderTextColor={state.theme === "dark" ? "#bdc3c7" : "#7f8c8d"}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Toggle Button */}
      <TouchableOpacity
        style={styles.filterToggleButton}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Text style={styles.filterToggleText}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Text>
      </TouchableOpacity>

      {/* Filters Section - Conditionally Rendered */}
      {showFilters && (
        <View style={styles.filtersMenu}>
          <View style={styles.filtersContainer}>
            <TextInput
              style={[
                styles.filterInput,
                state.theme === "dark" ? styles.darkInput : styles.lightInput,
              ]}
              placeholder="Region (e.g., Asia, Europe)"
              placeholderTextColor={
                state.theme === "dark" ? "#bdc3c7" : "#7f8c8d"
              }
              value={filters.region}
              onChangeText={(text) => setFilters({ ...filters, region: text })}
            />
          </View>
        </View>
      )}

      <Text
        style={[
          styles.resultsCount,
          state.theme === "dark"
            ? styles.darkSecondaryText
            : styles.lightSecondaryText,
        ]}
      >
        Showing {filteredCountries.length} of {countries.length} countries
      </Text>

      <FlatList
        data={filteredCountries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CountryListing country={item} />}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  list: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  lightText: {
    color: "#000000",
  },
  darkText: {
    color: "#ffffff",
  },
  lightSecondaryText: {
    color: "#7f8c8d",
  },
  darkSecondaryText: {
    color: "#bdc3c7",
  },
  counter: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  navButton: {
    backgroundColor: "#5856D6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: 200,
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  themeButton: {
    backgroundColor: "#34C759",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  themeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchInput: {
    height: 55,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "500",
  },
  lightInput: {
    backgroundColor: "#f8f9fa",
    borderColor: "#e9ecef",
    color: "#212529",
  },
  darkInput: {
    backgroundColor: "#2d2d2d",
    borderColor: "#495057",
    color: "#f8f9fa",
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  filterInput: {
    height: 45,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    minWidth: 120,
    fontSize: 14,
    fontWeight: "500",
  },
  furnishingFilter: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginRight: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: "#e9ecef",
  },
  activeFilterButton: {
    backgroundColor: "#0d6efd",
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#495057",
  },
  resultsCount: {
    fontSize: 14,
    marginBottom: 15,
    fontStyle: "italic",
    opacity: 0.8,
  },
  filterToggleButton: {
    backgroundColor: "#0d6efd",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  filterToggleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  filtersMenu: {
    marginBottom: 20,
  },
});
