import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Platform, StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigation from "./src/navigation/AuthNavigation";
import TabNavigation from "./src/navigation/TabNavigation";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import { clearUserProfile, setUserProfile, setUserTheme } from "./src/stores/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default MainApp = () => {
	const userProfile = useSelector((state) => state.user.data);
    const userTheme = useSelector((state) => state.user.theme);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const onIdTokenChanged = (user) => {
		if (user) {
			dispatch(
				setUserProfile({
					uid: user.uid,
					displayName: user.displayName,
					email: user.email,
				})
			);
		} else {
			dispatch(clearUserProfile());
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const unsubscribe = auth().onIdTokenChanged(onIdTokenChanged);
		return unsubscribe; // unsubscribe on unmount
	}, []);

    useEffect(() => {
        const initUserTheme = () => {
            AsyncStorage.getItem('@theme').then((theme) => dispatch(setUserTheme(theme))).catch(e => console.log(e))
        } 
        return initUserTheme;
    })

	return (
		<SafeAreaProvider>
            <FlashMessage position="top" titleStyle={{textAlign: 'center'}} floating={true} statusBarHeight={Constants.statusBarHeight} />
            <StatusBar style={userTheme == "light" ? "dark" : userTheme == "dark" ? "light" : ""} />
			{isLoading ? (
				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
				>
					<ActivityIndicator color="tomato" size="large" />
				</View>
			) : userProfile ? (
				<TabNavigation />
			) : (
				<AuthNavigation />
			)}
		</SafeAreaProvider>
	);
};
