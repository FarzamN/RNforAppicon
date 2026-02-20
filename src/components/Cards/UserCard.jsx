import React from "react";
import { StyleSheet, Linking } from "react-native";
import { Text, Avatar, Card } from "react-native-paper";

const UserCard = React.memo(({ user, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title
        title={user.name}
        subtitle={user.company?.name}
        titleStyle={styles.name}
        left={() => (
          <Avatar.Image
            size={48}
            source={{ uri: `https://i.pravatar.cc/150?u=${user.email}` }}
          />
        )}
      />
      <Card.Content>
        <Text onPress={() => Linking.openURL(`mailto:${user.email}`)}>
          {user.email}
        </Text>
        <Text>{user.address?.city}</Text>
      </Card.Content>
    </Card>
  );
});

export default UserCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 6,
  },
  name: {
    fontWeight: "bold",
  },
});
