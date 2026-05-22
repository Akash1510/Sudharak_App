import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth Screens
import Splash from "./src/screens/auth/SplashScreen";
import Login from "./src/screens/auth/LoginPhoneScreen";
import OTP from "./src/screens/auth/OTPVerificationScreen";
import Language from "./src/screens/auth/LanguageSelectionScreen";

// Profile Screens
import ReportDetail from "./src/screens/profile/ReportDetailScreen";
import EditProfile from "./src/screens/profile/EditProfileScreen";
import ReportChat from "./src/screens/report/ReportChatScreen"
// Bottom Tabs
import BottomTabs from "./src/BottomTabs";
import ReportPreviewScreen from "./src/screens/report/ReportPreviewScreen";
import ReportSuccessScreen from "./src/screens/report/ReportSuccessScreen";
import ReportCommentScreen from './src/screens/home/ReportCommentScreen'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* 🔐 AUTH FLOW */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Language" component={Language} />

        {/* 🔥 MAIN APP */}
        <Stack.Screen name="Main" component={BottomTabs} />

        {/* 👤 EXTRA SCREENS */}
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ReportDetail" component={ReportDetail} />
        <Stack.Screen name="ReportChat" component={ReportChat} />
        <Stack.Screen name="ReportSuccess" component={ReportSuccessScreen} />
        <Stack.Screen name="ReportPreview" component={ReportPreviewScreen} />
        <Stack.Screen name="Comments" component={ReportCommentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}