import { View, StyleSheet, FlatList } from "react-native";
import { List, useTheme, Divider, Button } from "react-native-paper";
import { Moon, Sun, Monitor } from "lucide-react-native";
import useThemeMode from "../../hooks/useTheme";
import { setTheme } from "../../store/slices/settingsSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { themePreference } = useThemeMode();
  const paperTheme = useTheme();

  const handleLogout = () => {
    dispatch(logout());
  };
  const themeOptions = [
    {
      id: "light",
      title: "Light Theme",
      icon: Sun,
      preference: "light",
      onPress: () => {
        if (themePreference !== "light") {
          dispatch(setTheme("light"));
        }
      },
    },
    {
      id: "dark",
      title: "Dark Theme",
      icon: Moon,
      preference: "dark",
      onPress: () => {
        if (themePreference !== "dark") {
          dispatch(setTheme("dark"));
        }
      },
    },
    {
      id: "system",
      title: "System Default",
      icon: Monitor,
      preference: "system",
      onPress: () => {
        if (themePreference !== "system") {
          dispatch(setTheme("system"));
        }
      },
    },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: paperTheme.colors.background },
      ]}
    >
      <FlatList
        data={themeOptions}
        renderItem={({ item }) => {
          const IconComponent = item.icon;
          const isSelected = themePreference === item.preference;

          return (
            <View>
              <List.Item
                title={item.title}
                titleStyle={
                  isSelected ? { color: paperTheme.colors.primary } : {}
                }
                left={(props) => (
                  <View {...props} style={[props.style, styles.iconContainer]}>
                    <IconComponent
                      size={24}
                      color={isSelected ? paperTheme.colors.primary : "#888"}
                    />
                  </View>
                )}
                onPress={item.onPress}
                style={[
                  styles.listItem,
                  isSelected && {
                    backgroundColor: paperTheme.colors.primary + "10",
                  }, // 10% opacity
                ]}
              />
              {item.id !== "system" && <Divider />}
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <List.Section>
            <List.Subheader style={{ color: paperTheme.colors.primary }}>
              Appearance
            </List.Subheader>
          </List.Section>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Button
        style={styles.logoutButton}
        mode="contained"
        onPress={handleLogout}
        textColor={paperTheme.colors.onPrimary}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  listItem: {
    paddingVertical: 12,
  },
  logoutButton: {
    margin: 16,
    marginBottom: 32,
  },
});
