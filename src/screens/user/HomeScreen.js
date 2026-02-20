import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Text, Button, useTheme, Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/slices/usersSlice";
import UserCard from "../../components/Cards/UserCard";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";
import { Search, X } from "lucide-react-native";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);
  const paperTheme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(list);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = list.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          (user.username && user.username.toLowerCase().includes(query)),
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, list]);

  const resultsCount = useMemo(() => filteredUsers.length, [filteredUsers]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const onRefresh = () => {
    dispatch(fetchUsers());
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  if (loading && list.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: paperTheme.colors.background,
          },
        ]}
      >
        <View style={styles.skeletonContainer}>
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.center,
          styles.container,
          {
            backgroundColor: paperTheme.colors.background,
          },
        ]}
      >
        <Text style={{ color: paperTheme.colors.error, marginBottom: 16 }}>
          {error}
        </Text>
        <Button
          textColor={paperTheme.colors.onPrimary}
          mode="contained"
          onPress={() => dispatch(fetchUsers())}
        >
          Retry
        </Button>
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
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search users by name or email..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          icon={() => <Search size={20} color={paperTheme.colors.primary} />}
          style={[styles.searchBar, {}]}
          inputStyle={{ color: paperTheme.colors.onSurface }}
          iconColor={paperTheme.colors.primary}
          placeholderTextColor={paperTheme.colors.onSurfaceDisabled}
          clearIcon={() =>
            searchQuery ? (
              <X size={20} color={paperTheme.colors.primary} />
            ) : null
          }
          onClearIconPress={clearSearch}
          traileringIcon={searchQuery ? "close" : undefined}
          showDivider={false}
        />

        {searchQuery !== "" && (
          <Text
            style={[
              styles.resultsText,
              { color: paperTheme.colors.onSurfaceVariant },
            ]}
          >
            Found {resultsCount} {resultsCount === 1 ? "user" : "users"}
          </Text>
        )}
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => navigation.navigate("Profile", { user: item })}
          />
        )}
        refreshControl={
          <RefreshControl
            tintColor={paperTheme.colors.primary}
            colors={[paperTheme.colors.primary]}
            progressBackgroundColor={paperTheme.colors.surface}
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          searchQuery !== "" ? (
            <View style={styles.emptyContainer}>
              <Search size={48} color={paperTheme.colors.onSurfaceDisabled} />
              <Text
                style={[
                  styles.emptyText,
                  { color: paperTheme.colors.onSurface },
                ]}
              >
                No users found for "{searchQuery}"
              </Text>
              <Button
                mode="text"
                onPress={clearSearch}
                textColor={paperTheme.colors.primary}
              >
                Clear search
              </Button>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    borderRadius: 12,
    elevation: 2,
  },
  resultsText: {
    marginTop: 8,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  skeletonContainer: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    textAlign: "center",
  },
});
