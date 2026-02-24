import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";
import { store, persistor } from "./src/store/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import useThemeMode from "./src/hooks/useTheme.js";
import OfflineBanner from "./src/components/OfflineBanner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lucide from "lucide-react-native";
import { useSelector } from "react-redux";
import AuthNavigator from "./src/navigation/AuthNavigator.jsx";
import MainNavigator from "./src/navigation/MainNavigator";

function ThemedApp() {
  const { theme } = useThemeMode();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <Lucide {...props} />,
      }}
    >
      <OfflineBanner />
      <NavigationContainer>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemedApp />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
