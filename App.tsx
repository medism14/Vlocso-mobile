/** @format */
// Google auth:
// ios id: 217146752812-fhj4jvhnks99246mm87mii00j7cmlvvo.apps.googleusercontent.com
// android id: 217146752812-f826cq3bt93ktlhlu14tdd31fvl1t8f8.apps.googleusercontent.com

// Android sha-1: 4C:5A:8F:0A:51:BE:A9:85:7D:D7:3B:04:0E:B7:22:81:06:E6:58:C1
// OR : 63:4D:45:8B:2C:65:0E:28:01:AD:6C:25:89:43:B2:7E:65:18:6A:D0

//Mon adresse: http://192.168.230.2

import * as SplashScreen from "expo-splash-screen";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import 'react-native-gesture-handler';
import { useCallback, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Provider } from "react-redux";
import store from "./redux/store";
import StackNavigator from "./navigation/StackNavigator";
import { LogBox } from 'react-native';

SplashScreen.preventAutoHideAsync();

interface AppProps {
  route?: any;
}

export default function App({ route }: AppProps) {
  const [fontsLoaded] = useFonts({
    // Regular fonts
    "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),

    // Italic fonts
    "Inter-ThinItalic": require("./assets/fonts/Inter-ThinItalic.ttf"),
    "Inter-ExtraLightItalic": require("./assets/fonts/Inter-ExtraLightItalic.ttf"),
    "Inter-LightItalic": require("./assets/fonts/Inter-LightItalic.ttf"),
    "Inter-Italic": require("./assets/fonts/Inter-Italic.ttf"),
    "Inter-MediumItalic": require("./assets/fonts/Inter-MediumItalic.ttf"),
    "Inter-SemiBoldItalic": require("./assets/fonts/Inter-SemiBoldItalic.ttf"),
    "Inter-BoldItalic": require("./assets/fonts/Inter-BoldItalic.ttf"),
    "Inter-ExtraBoldItalic": require("./assets/fonts/Inter-ExtraBoldItalic.ttf"),
    "Inter-BlackItalic": require("./assets/fonts/Inter-BlackItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.chargingContainer}>
        <Image
          source={require("./assets/charging4.gif")}
          style={{ width: wp("100%"), height: hp("100%") }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <StackNavigator />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chargingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pageContainer: {
    flex: 1,
  },
});