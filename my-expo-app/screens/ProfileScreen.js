import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
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
import Bence from "../assets/Bence.jpg";

export default function ProfileScreen({ navigation }) {
  const { state } = useAppContext();

  const getThemeColors = () => {
    return state.theme === "dark" ? COLORS.dark : COLORS.light;
  };

  const themeColors = getThemeColors();

  return (
    <ScrollView
      style={[
        styles.scrollContainer,
        { backgroundColor: themeColors.background },
      ]}
      contentContainerStyle={styles.container}
    >
      {/* Profile Header */}
      <View
        style={[styles.profileHeader, { backgroundColor: themeColors.surface }]}
      >
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: themeColors.surface },
          ]}
        >
          <Image source={Bence} style={styles.avatar} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.name, { color: themeColors.text.primary }]}>
            John Doe
          </Text>
          <Text style={[styles.title, { color: themeColors.text.secondary }]}>
            Senior Software Developer
          </Text>
        </View>
      </View>

      {/* Profile Sections */}
      <View style={styles.sectionsContainer}>
        {/* About Me Section */}
        <View
          style={[styles.sectionCard, { backgroundColor: themeColors.card }]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons
              name="information-circle"
              size={20}
              color={COLORS.primary[500]}
            />
            <Text
              style={[styles.sectionTitle, { color: themeColors.text.primary }]}
            >
              About Me
            </Text>
          </View>
          <Text
            style={[
              styles.sectionContent,
              { color: themeColors.text.secondary },
            ]}
          >
            Passionate software developer with 5+ years of experience in
            building scalable web and mobile applications. Specialized in React
            Native, JavaScript, and modern web technologies.
          </Text>
        </View>

        {/* Experience Section */}
        <View
          style={[styles.sectionCard, { backgroundColor: themeColors.card }]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="briefcase" size={20} color={COLORS.primary[500]} />
            <Text
              style={[styles.sectionTitle, { color: themeColors.text.primary }]}
            >
              Experience
            </Text>
          </View>
          <View style={styles.experienceItem}>
            <View style={styles.bulletPoint} />
            <Text
              style={[
                styles.experienceText,
                { color: themeColors.text.secondary },
              ]}
            >
              Senior Developer at TechCorp (2022-Present)
            </Text>
          </View>
          <View style={styles.experienceItem}>
            <View style={styles.bulletPoint} />
            <Text
              style={[
                styles.experienceText,
                { color: themeColors.text.secondary },
              ]}
            >
              Full Stack Developer at StartupXYZ (2020-2022)
            </Text>
          </View>
          <View style={styles.experienceItem}>
            <View style={styles.bulletPoint} />
            <Text
              style={[
                styles.experienceText,
                { color: themeColors.text.secondary },
              ]}
            >
              Junior Developer at WebSolutions (2019-2020)
            </Text>
          </View>
        </View>

        {/* Skills Section */}
        <View
          style={[styles.sectionCard, { backgroundColor: themeColors.card }]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash" size={20} color={COLORS.primary[500]} />
            <Text
              style={[styles.sectionTitle, { color: themeColors.text.primary }]}
            >
              Skills
            </Text>
          </View>
          <View style={styles.skillsContainer}>
            {[
              "React Native",
              "JavaScript",
              "TypeScript",
              "Node.js",
              "Python",
              "AWS",
              "Git",
              "CI/CD",
            ].map((skill, index) => (
              <View
                key={index}
                style={[
                  styles.skillPill,
                  { backgroundColor: themeColors.surface },
                ]}
              >
                <Text
                  style={[
                    styles.skillText,
                    { color: themeColors.text.secondary },
                  ]}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education Section */}
        <View
          style={[styles.sectionCard, { backgroundColor: themeColors.card }]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="school" size={20} color={COLORS.primary[500]} />
            <Text
              style={[styles.sectionTitle, { color: themeColors.text.primary }]}
            >
              Education
            </Text>
          </View>
          <Text
            style={[
              styles.sectionContent,
              { color: themeColors.text.secondary },
            ]}
          >
            Bachelor of Computer Science - University of Technology (2015-2019)
          </Text>
        </View>

        {/* Contact Section */}
        <View
          style={[styles.sectionCard, { backgroundColor: themeColors.card }]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="mail" size={20} color={COLORS.primary[500]} />
            <Text
              style={[styles.sectionTitle, { color: themeColors.text.primary }]}
            >
              Contact
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons
              name="mail-outline"
              size={16}
              color={themeColors.text.secondary}
            />
            <Text
              style={[
                styles.contactText,
                { color: themeColors.text.secondary },
              ]}
            >
              john.doe@example.com
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons
              name="call-outline"
              size={16}
              color={themeColors.text.secondary}
            />
            <Text
              style={[
                styles.contactText,
                { color: themeColors.text.secondary },
              ]}
            >
              +1 (555) 123-4567
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons
              name="logo-linkedin"
              size={16}
              color={themeColors.text.secondary}
            />
            <Text
              style={[
                styles.contactText,
                { color: themeColors.text.secondary },
              ]}
            >
              linkedin.com/in/johndoe
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: SPACING.lg,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xl,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.md,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
    ...SHADOWS.sm,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: BORDER_RADIUS.full,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.body2,
    opacity: 0.8,
  },
  sectionsContainer: {
    gap: SPACING.lg,
  },
  sectionCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontWeight: "600",
  },
  sectionContent: {
    ...TYPOGRAPHY.body2,
    lineHeight: 24,
  },
  experienceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary[500],
    marginTop: 8,
  },
  experienceText: {
    ...TYPOGRAPHY.body2,
    flex: 1,
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  skillPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    ...SHADOWS.xs,
  },
  skillText: {
    ...TYPOGRAPHY.caption,
    fontWeight: "500",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  contactText: {
    ...TYPOGRAPHY.body2,
  },
});
