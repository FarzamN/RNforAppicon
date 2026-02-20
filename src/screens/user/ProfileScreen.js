import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Avatar, Button, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { Heart, HeartOff } from "lucide-react-native";

export default function ProfileScreen({ route }) {
  const { user } = route.params;
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(user.id);
  const paperTheme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: paperTheme.colors.background },
      ]}
    >
      <Avatar.Image
        size={100}
        source={{ uri: `https://i.pravatar.cc/150?u=${user.email}` }}
        style={styles.avatar}
      />

      <Text
        variant="headlineMedium"
        style={[styles.name, { color: paperTheme.colors.onBackground }]}
      >
        {user.name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={{ color: paperTheme.colors.onSurfaceVariant }}>
          {user.email}
        </Text>
        <Text style={{ color: paperTheme.colors.onSurfaceVariant }}>
          {user.phone}
        </Text>
        <Text style={{ color: paperTheme.colors.onSurfaceVariant }}>
          {user.website}
        </Text>
      </View>

      <View
        style={[styles.section, { borderTopColor: paperTheme.colors.outline }]}
      >
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { color: paperTheme.colors.primary }]}
        >
          Company
        </Text>
        <Text style={{ color: paperTheme.colors.onSurface }}>
          {user.company?.name}
        </Text>
        <Text style={{ color: paperTheme.colors.onSurfaceVariant }}>
          {user.company?.catchPhrase}
        </Text>
      </View>

      <View
        style={[styles.section, { borderTopColor: paperTheme.colors.outline }]}
      >
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { color: paperTheme.colors.primary }]}
        >
          Address
        </Text>
        <Text style={{ color: paperTheme.colors.onSurface }}>
          {user.address?.street}, {user.address?.city}
        </Text>
        <Text style={{ color: paperTheme.colors.onSurfaceVariant }}>
          {user.address?.zipcode}
        </Text>
      </View>

      <Button
        mode={isFavorite ? "contained" : "outlined"}
        onPress={() => dispatch(toggleFavorite(user.id))}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={[
          styles.buttonLabel,
          { color: isFavorite ? "white" : paperTheme.colors.primary },
        ]}
        icon={() =>
          isFavorite ? (
            <HeartOff size={20} color="white" />
          ) : (
            <Heart size={20} color={paperTheme.colors.primary} />
          )
        }
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    flexGrow: 1,
  },
  avatar: {
    marginTop: 20,
    marginBottom: 10,
  },
  name: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  infoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  section: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 15,
    borderTopWidth: 1,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "600",
  },
  button: {
    marginTop: 30,
    width: "100%",
    borderRadius: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  themeIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    opacity: 0.7,
  },
});
