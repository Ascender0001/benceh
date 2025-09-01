import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { useAppContext } from "../contexts/AppContext";
import CountryListing from "../components/CountryListing";
import EmptyState from "../components/EmptyState";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATIONS,
} from "../constants/DesignSystem";

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
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const loadCountries = () => {
      try {
        const response = require("../assets/data.json");
        setCountries(response);
        setFilteredCountries(response);
        Animated.timing(animation, {
          toValue: 1,
          duration: ANIMATIONS.timing.standard,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.spring(animation, {
      toValue: showFilters ? 0 : 1,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const getThemeColors = () => {
    return state.theme === "dark" ? COLORS.dark : COLORS.light;
  };

  const themeColors = getThemeColors();

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: themeColors.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
          <Text
            style={[styles.loadingText, { color: themeColors.text.primary }]}
          >
            Loading countries...
          </Text>
        </View>
      </View>
    );
  }

  const filterHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text.primary }]}>
            Explore Countries
          </Text>
          <Text
            style={[styles.subtitle, { color: themeColors.text.secondary }]}
          >
            Discover {countries.length} countries worldwide
          </Text>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: themeColors.input.background },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={themeColors.text.tertiary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: themeColors.input.text }]}
            placeholder="Search countries..."
            placeholderTextColor={themeColors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Toggle Button */}
        <TouchableOpacity
          style={[
            styles.filterToggleButton,
            { backgroundColor: COLORS.primary[500] },
          ]}
          onPress={toggleFilters}
        >
          <Ionicons
            name={showFilters ? "filter" : "filter-outline"}
            size={16}
            color="#ffffff"
          />
          <Text style={styles.filterToggleText}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Text>
        </TouchableOpacity>

        {/* Filters Section */}
        <Animated.View
          style={[
            styles.filtersContainer,
            {
              height: filterHeight,
              opacity: animation,
              backgroundColor: themeColors.surface,
            },
          ]}
        >
          <TextInput
            style={[
              styles.filterInput,
              {
                backgroundColor: themeColors.input.background,
                color: themeColors.input.text,
                borderColor: themeColors.input.border,
              },
            ]}
            placeholder="Filter by region (e.g., Asia, Europe)"
            placeholderTextColor={themeColors.text.tertiary}
            value={filters.region}
            onChangeText={(text) => setFilters({ ...filters, region: text })}
          />
        </Animated.View>

        {/* Results Count */}
        <Text
          style={[styles.resultsCount, { color: themeColors.text.secondary }]}
        >
          {filteredCountries.length} of {countries.length} countries found
        </Text>

        {/* Countries List or Empty State */}
        {filteredCountries.length === 0 ? (
          <EmptyState
            title="No countries found"
            message="Try adjusting your search or filters to find more results."
            icon="search-outline"
          />
        ) : (
          <FlatList
            data={filteredCountries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CountryListing country={item} />}
            contentContainerStyle={styles.listContent}
            style={styles.list}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.md,
  },
  loadingText: {
    ...TYPOGRAPHY.body1,
  },
  header: {
    padding: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h1,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body2,
    opacity: 0.8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.body2,
    padding: 0,
  },
  filterToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    alignSelf: "flex-start",
  },
  filterToggleText: {
    ...TYPOGRAPHY.button,
    color: "#ffffff",
  },
  filtersContainer: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.sm,
    overflow: "hidden",
  },
  filterInput: {
    ...TYPOGRAPHY.body2,
    height: 44,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  resultsCount: {
    ...TYPOGRAPHY.caption,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    textAlign: "center",
    opacity: 0.7,
  },
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  list: {
    flex: 1,
  },
});
