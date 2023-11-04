import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SCREENS } from "../constants/Screen";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Index from "../pages/Index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { calenderOptions, homeOptions, optionOptions, payOptions, screenOptions } from "../components/OptionTab";
import OtpScreen from "../pages/OtpScreen";
import Outcome from "../pages/Outcome";
import NewPassword from "../pages/NewPassword";
import Profile from "../pages/Profile";
import OutcomeDetail from "../pages/OutcomeDetail";
import Account from "../pages/Account";
import Schedule from "../pages/Schedule";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Home = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="TabIndex" component={Index} options={homeOptions}/>
            <Tab.Screen name="Calender" component={Outcome} options={calenderOptions}/>
            <Tab.Screen name="Tuition" component={Schedule} options={payOptions}/>
            <Tab.Screen name="Option" component={Profile} options={optionOptions}/>
        </Tab.Navigator>
    )
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={SCREENS.LOGIN} screenOptions={{headerShown:false}}>
                <Stack.Screen name={SCREENS.LOGIN} component={Login}/>
                <Stack.Screen name={SCREENS.FORGOT} component={ForgotPassword}/>
                <Stack.Screen name={SCREENS.INDEX} component={Home}/>
                <Stack.Screen name={SCREENS.OTPSCREEN} component={OtpScreen}/>
                <Stack.Screen name={SCREENS.NEWPASSWORD} component={NewPassword}/>
                <Stack.Screen name={SCREENS.OUTCOMEDETAIL} component={OutcomeDetail}/>
                <Stack.Screen name={SCREENS.ACCOUNT} component={Account}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;