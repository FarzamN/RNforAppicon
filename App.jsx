import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";
import { store, persistor } from "./src/store/index.js";
import AppNavigator from "./src/navigation/AppNavigator.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import useThemeMode from "./src/hooks/useTheme.js";
import OfflineBanner from "./src/components/OfflineBanner";

function ThemedApp() {
  const { theme } = useThemeMode();

  return (
    <PaperProvider theme={theme}>
      <OfflineBanner />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemedApp />
      </PersistGate>
    </Provider>
  );
}
