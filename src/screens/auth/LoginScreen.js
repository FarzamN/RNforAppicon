import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { Circle, CheckCircle } from "lucide-react-native";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const { loading, error: authError } = useSelector((state) => state.auth);
  const paperTheme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

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

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      shakeError();
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email address");
      shakeError();
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      shakeError();
      return;
    }

    dispatch(login({ email, password }));
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

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          theme={{ colors: { primary: paperTheme.colors.primary } }}
          textColor={paperTheme.colors.onSurface}
          outlineColor={paperTheme.colors.outline}
          activeOutlineColor={paperTheme.colors.primary}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: paperTheme.colors.primary } }}
          textColor={paperTheme.colors.onSurface}
          outlineColor={paperTheme.colors.outline}
          activeOutlineColor={paperTheme.colors.primary}
        />

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

        {error ? (
          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            <Text style={[styles.error, { color: paperTheme.colors.error }]}>
              {error}
            </Text>
          </Animated.View>
        ) : null}

        {authError ? (
          <Text style={[styles.error, { color: paperTheme.colors.error }]}>
            {authError}
          </Text>
        ) : null}

        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={handleLogin}
          style={styles.button}
          buttonColor={paperTheme.colors.primary}
          textColor={paperTheme.colors.onPrimary}
        >
          Login
        </Button>

        {/* Optional: Sign up link */}
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
  input: {
    marginBottom: 16,
    backgroundColor: "transparent",
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
  error: {
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
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
