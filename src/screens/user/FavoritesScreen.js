import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Text, useTheme } from "react-native-paper";
import { Heart } from "lucide-react-native";
import UserCard from "../../components/Cards/UserCard";

export default function FavoritesScreen({ navigation }) {
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const users = useSelector((state) => state.users.list);
  const paperTheme = useTheme();

  const favorites = users.filter((user) => favoriteIds.includes(user.id));

  if (favorites.length === 0) {
    return (
      <View
        style={[
          styles.emptyContainer,
          { backgroundColor: paperTheme.colors.background },
        ]}
      >
        <Heart
          size={60}
          color={paperTheme.colors.primary}
          fill={paperTheme.colors.primary + "20"}
        />
        <Text
          variant="headlineSmall"
          style={[styles.emptyTitle, { color: paperTheme.colors.onBackground }]}
        >
          No Favorites Yet
        </Text>
        <Text
          variant="bodyMedium"
          style={[
            styles.emptyMessage,
            { color: paperTheme.colors.onSurfaceVariant },
          ]}
        >
          ❤️ Tap the heart icon on user profiles to add them to your favorites
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: paperTheme.colors.background },
      ]}
    >
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => navigation.navigate("Profile", { user: item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              variant="titleMedium"
              style={[styles.headerText, { color: paperTheme.colors.primary }]}
            >
              {favorites.length}{" "}
              {favorites.length === 1 ? "Favorite" : "Favorites"}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)", // Will be overridden by theme
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  emptyMessage: {
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});
