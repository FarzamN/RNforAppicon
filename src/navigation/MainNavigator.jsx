import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/user/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../screens/user/FavoritesScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import { House, Heart, Settings } from "lucide-react-native";
import SettingScreen from "../screens/user/SettingScreen";
import { useTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_SCREENS = [
  {
    name: "HomeTab",
    component: HomeStack,
    title: "Home",
    icon: House,
  },
  {
    name: "FavoritesTab",
    component: FavoritesStack,
    title: "Favorites",
    icon: Heart,
  },
  {
    name: "SettingTab",
    component: SettingStack,
    title: "Setting",
    icon: Settings,
  },
];

const STACK_SCREENS = {
  Home: [
    { name: "Home", component: HomeScreen },
    { name: "Profile", component: ProfileScreen },
  ],
  Favorites: [
    { name: "Favorites", component: FavoritesScreen },
    { name: "Profile", component: ProfileScreen },
  ],
  Setting: [{ name: "Setting", component: SettingScreen }],
};

function ThemedStack({ screens, initialRouteName }) {
  const paperTheme = useTheme();

  const screenOptions = {
    headerStyle: {
      backgroundColor: paperTheme.colors.onSecondary,
    },
    headerTintColor: paperTheme.colors.onPrimaryContainer,
    headerTitleStyle: {
      color: paperTheme.colors.onPrimaryContainer,
      fontWeight: "600",
    },
    headerShadowVisible: false,
  };

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}
    >
      {screens.map(({ name, component, options = {} }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
}

function HomeStack() {
  return <ThemedStack screens={STACK_SCREENS.Home} initialRouteName="Home" />;
}

function FavoritesStack() {
  return (
    <ThemedStack
      screens={STACK_SCREENS.Favorites}
      initialRouteName="Favorites"
    />
  );
}

function SettingStack() {
  return (
    <ThemedStack screens={STACK_SCREENS.Setting} initialRouteName="Setting" />
  );
}

export default function MainTabs() {
  const paperTheme = useTheme();

  const tabScreenOptions = {
    tabBarStyle: {
      backgroundColor: paperTheme.colors.surface,
      borderTopColor: paperTheme.colors.outline,
    },
    tabBarActiveTintColor: paperTheme.colors.primary,
    tabBarInactiveTintColor: paperTheme.colors.onSurfaceDisabled,
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "500",
      marginBottom: 3,
    },
    tabBarIconStyle: {
      marginTop: 3,
    },
    headerStyle: {
      backgroundColor: paperTheme.colors.onSecondary,
    },
    headerTintColor: paperTheme.colors.onPrimaryContainer,
    headerTitleStyle: {
      color: paperTheme.colors.onPrimaryContainer,
      fontWeight: "600",
    },
    headerShadowVisible: false,
  };

  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      {TAB_SCREENS.map(({ name, component, title, icon: Icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerShown: false,
            title,
            tabBarIcon: ({ color, size = 24 }) => (
              <Icon size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
