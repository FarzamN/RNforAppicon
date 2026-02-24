import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { ValidationText } from "../../components";

const FormTextInput = ({
  field,
  label,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
}) => {
  const paperTheme = useTheme();

  return (
    <View style={{ marginBottom: 12 }}>
      <TextInput
        label={label}
        mode="flat"
        style={styles.input}
        value={field.state.value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onChangeText={field.handleChange}
        secureTextEntry={secureTextEntry}
        textColor={paperTheme.colors.onSurface}
        outlineColor={paperTheme.colors.outline}
        activeOutlineColor={paperTheme.colors.primary}
        theme={{ colors: { primary: paperTheme.colors.primary } }}
      />
      <ValidationText
        message={field.state.meta.errors.join(", ")}
        isError={!field.state.meta.isValid}
      />
    </View>
  );
};
export default FormTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
  },
});
