import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Wifi, WifiOff, AlertCircle } from "lucide-react-native";
import useNetworkStatus from "../hooks/useNetworkStatus";

export default function OfflineBanner() {
  const { isOnline, isSlow } = useNetworkStatus();
  const slideAnim = useRef(new Animated.Value(100)).current;
  const [showBanner, setShowBanner] = useState(false);

  const hideBanner = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowBanner(false));
  };

  useEffect(() => {
    let timer;

    if (!isOnline || isSlow) {
      setShowBanner(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setShowBanner(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      timer = setTimeout(() => {
        hideBanner();
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOnline, isSlow]);

  if (!showBanner) return null;

  let bannerConfig = {
    backgroundColor: "#10b981",
    icon: Wifi,
    message: "You're back online!",
  };

  if (!isOnline) {
    bannerConfig = {
      backgroundColor: "#dc2626",
      icon: WifiOff,
      message: "You are offline – showing cached data",
    };
  } else if (isSlow) {
    bannerConfig = {
      backgroundColor: "#f59e0b",
      icon: AlertCircle,
      message: "Slow connection – using cached data",
    };
  }

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          transform: [{ translateY: slideAnim }],
          backgroundColor: bannerConfig.backgroundColor,
        },
      ]}
    >
      <Text style={[styles.text, { color: "white" }]}>
        {bannerConfig.message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 14,
    paddingHorizontal: 16,
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
});
