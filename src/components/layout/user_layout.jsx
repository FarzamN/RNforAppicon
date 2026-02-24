import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const UserLayout = ({ children, horizontal }) => {
  const paperTheme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: paperTheme.colors.background,
          padding: horizontal ? 16 : 0,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default UserLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
