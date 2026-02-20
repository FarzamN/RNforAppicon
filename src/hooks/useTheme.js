import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../theme/theme";
import { setTheme } from "../store/slices/settingsSlice";

export default function useTheme() {
  const dispatch = useDispatch();
  const systemScheme = useColorScheme();
  const themePreference = useSelector((state) => state.settings.theme);

  const isDark =
    themePreference === "dark" ||
    (themePreference === "system" && systemScheme === "dark");

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    dispatch(setTheme(isDark ? "light" : "dark"));
  };

  return {
    theme,
    isDark,
    themePreference,
    toggleTheme,
  };
}
