import React, { useState, useMemo } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Text, Button, useTheme, Searchbar } from "react-native-paper";
import { useInfiniteQuery } from "@tanstack/react-query";
import UserCard from "../../components/Cards/UserCard";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";
import { Plus, Search, X } from "lucide-react-native";
import { fetchUsersApi } from "../../services/user.api";
import { UserLayout } from "../../components";
import { AnimatedFAB } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const paperTheme = useTheme();
  const [isExtended, setIsExtended] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsersApi,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 2 ? allPages.length + 1 : undefined;
    },
  });

  const users = data?.pages.flat() ?? [];

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase().trim();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.username && user.username.toLowerCase().includes(query)),
    );
  }, [users, searchQuery]);

  const resultsCount = useMemo(() => filteredUsers.length, [filteredUsers]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Handle scroll to control FAB extension
  const handleScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    // Check if we're at the top
    if (currentScrollPosition <= 0) {
      setIsExtended(true);
    } else {
      setIsExtended(false);
    }
  };

  if (isLoading && users.length === 0) {
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

  if (isError) {
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
          {error?.message}
        </Text>
        <Button
          textColor={paperTheme.colors.onPrimary}
          mode="contained"
          onPress={refetch}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <UserLayout>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search users by name or email..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          icon={() => <Search size={20} color={paperTheme.colors.primary} />}
          style={styles.searchBar}
          inputStyle={{ color: paperTheme.colors.onSurface }}
          iconColor={paperTheme.colors.primary}
          placeholderTextColor={paperTheme.colors.onSurfaceDisabled}
          clearIcon={() =>
            searchQuery && <X size={20} color={paperTheme.colors.primary} />
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
        renderItem={({ item, index }) => (
          <UserCard
            user={item}
            index={index}
            onPress={() => navigation.navigate("Profile", { user: item })}
          />
        )}
        refreshControl={
          <RefreshControl
            tintColor={paperTheme.colors.primary}
            colors={[paperTheme.colors.primary]}
            progressBackgroundColor={paperTheme.colors.surface}
            refreshing={isFetching}
            onRefresh={refetch}
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
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <SkeletonCard />
          ) : (
            <View style={{ height: 60 }} />
          )
        }
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <AnimatedFAB
        icon={() => <Plus size={24} color={paperTheme.colors.onPrimary} />}
        label="Add User"
        extended={isExtended}
        onPress={() => navigation.navigate("Create User")}
        visible={true}
        animateFrom="right"
        iconMode="dynamic"
        style={[
          styles.fabStyle,
          {
            backgroundColor: paperTheme.colors.primary,
          },
        ]}
        color={paperTheme.colors.onPrimary}
        theme={paperTheme}
      />
    </UserLayout>
  );
}

const styles = StyleSheet.create({
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
  fabStyle: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
