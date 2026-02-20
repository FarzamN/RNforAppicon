import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export default function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(Boolean(state.isConnected));

      // Bonus: detect slow network
      const slow =
        state.type === "cellular" &&
        (state.details?.cellularGeneration === "2g" ||
          state.details?.cellularGeneration === "3g");

      setIsSlow(Boolean(slow));
    });

    return () => unsubscribe();
  }, []);

  return { isOnline, isSlow };
}
