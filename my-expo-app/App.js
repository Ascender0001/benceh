import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "./constants/DesignSystem";

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const { state } = useAppContext();

  const getThemeColors = () => {
    return state.theme === "dark" ? COLORS.dark : COLORS.light;
  };

  const themeColors = getThemeColors();

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Home") {
        iconName = focused ? "compass" : "compass-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person-circle" : "person-circle-outline";
      } else if (route.name === "Settings") {
        iconName = focused ? "cog" : "cog-outline";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: COLORS.primary[500],
    tabBarInactiveTintColor: themeColors.text.secondary,
    tabBarStyle: {
      backgroundColor: themeColors.card,
      borderTopWidth: 0,
      height: 80,
      paddingBottom: SPACING.md,
      paddingTop: SPACING.sm,
      ...SHADOWS.lg,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "600",
      marginTop: SPACING.xs,
    },
    headerStyle: {
      backgroundColor: themeColors.background,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: "700",
      color: themeColors.text.primary,
    },
    headerTintColor: themeColors.text.primary,
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Explore" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
