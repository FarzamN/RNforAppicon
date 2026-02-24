import { useTheme } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

const ValidationText = ({ isError, message }) => {
  const paperTheme = useTheme();
  return (
    isError && (
      <Text style={[styles.error, { color: paperTheme.colors.error }]}>
        {message}
      </Text>
    )
  );
};

export default ValidationText;

const styles = StyleSheet.create({
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});
