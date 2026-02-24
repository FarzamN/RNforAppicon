import {
  View,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "@tanstack/react-form";
import React, { useRef, useState } from "react";
import { loginApi } from "../../services/auth.api";
import { useMutation } from "@tanstack/react-query";
import { Circle, CheckCircle } from "lucide-react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { loginSuccess } from "../../store/slices/authSlice";
import { FormTextInput, ValidationText } from "../../components";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const paperTheme = useTheme();

  const {
    mutate: loginUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
    },
    onError: () => {
      shakeError();
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      loginUser(value);
    },
  });

  const [remember, setRemember] = useState(true);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[
        styles.container,
        { backgroundColor: paperTheme.colors.background },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: paperTheme.colors.surface,
            shadowColor: paperTheme.colors.shadow,
          },
        ]}
      >
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: paperTheme.colors.primary }]}
        >
          Welcome Back
        </Text>

        <Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Email is required";
              const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
              return emailRegex.test(value) ? null : "Email is not valid";
            },
          }}
        >
          {(field) => (
            <FormTextInput
              field={field}
              label="Email"
              keyboardType="email-address"
            />
          )}
        </Field>

        <Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Password is required";
              return value.length >= 8
                ? null
                : "Password must be at least 8 characters";
            },
          }}
        >
          {(field) => (
            <FormTextInput field={field} label="Password" secureTextEntry />
          )}
        </Field>

        <ValidationText message={error?.message} isError={isError} />

        {/* {isError && (
          <Animated.Text
            style={[
              styles.error,
              {
                color: paperTheme.colors.error,
                transform: [{ translateX: shakeAnim }],
              },
            ]}
          >
            {error.message}
          </Animated.Text>
        )} */}
        <TouchableOpacity
          onPress={() => setRemember(!remember)}
          style={styles.rememberRow}
        >
          {remember ? (
            <CheckCircle size={20} color={paperTheme.colors.primary} />
          ) : (
            <Circle size={20} color={paperTheme.colors.onSurfaceDisabled} />
          )}
          <Text
            style={[
              styles.rememberText,
              { color: paperTheme.colors.onSurface },
            ]}
          >
            Remember me
          </Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          loading={isPending}
          disabled={isPending}
          style={styles.button}
          onPress={() => handleSubmit()}
          buttonColor={paperTheme.colors.primary}
          textColor={paperTheme.colors.onPrimary}
        >
          Login
        </Button>

        <View style={styles.footer}>
          <Text style={{ color: paperTheme.colors.onSurfaceVariant }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity>
            <Text
              style={{ color: paperTheme.colors.primary, fontWeight: "bold" }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "bold",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 4,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
