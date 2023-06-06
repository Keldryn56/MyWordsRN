import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { Text, useColorScheme } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { DarkThemeCustom, LightThemeCustom } from "../styles/DarkThemeCustom";
import { DeckNavigator } from "./DeckNavigation";
import { FavoriteNavigator } from "./FavoriteNavigation";
import { HomeNavigator } from "./HomeNavigation";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const resetTabStacksOnBlur = ({ navigation }) => ({
	blur: () => {
		const state = navigation.getState();

		state.routes.forEach((route, tabIndex) => {
			if (state?.index !== tabIndex && route.state?.index > 0) {
				navigation.dispatch(StackActions.popToTop());
			}
		});
	},
});

const TabNavigation = () => {
    let theme = useColorScheme();
    const userTheme = useSelector(state => state.user.theme)  

    if(userTheme != "auto"){
        theme = userTheme
    }

	return (
		<NavigationContainer theme={theme === 'dark' ? DarkThemeCustom : LightThemeCustom}> 
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === "Accueil") {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === "Paramètres") {
							iconName = focused ? "settings" : "settings-outline";
						} else if (route.name === "Ma liste") {
							iconName = focused ? "list" : "list-outline";
						} else if (route.name === "Mes Decks") {
							iconName = focused ? "copy" : "copy-outline";
						} else if (route.name === "Ajouter") {
							iconName = focused ? "add-circle" : "add-circle";
							size = 50;
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarLabel: ({ focused, color }) => {
						if (route.name != "Ajouter") {
							return (
								<Text
									style={{
										fontSize: 10,
										fontWeight: focused ? "500" : "400",
										color: color,
									}}
								>
									{route.name}
								</Text>
							);
						}
					},
					tabBarActiveTintColor: "tomato",
					tabBarInactiveTintColor: "gray",
					headerTitleAlign: "center",
					tabBarItemStyle: {
						marginVertical: 8,
					},
					tabBarStyle: {
						height: 60,
					},
				})}
			>
				<Tab.Screen
					options={{ headerShown: false }}
					listeners={resetTabStacksOnBlur}
					name="Accueil"
					component={HomeNavigator}
				/>
				<Tab.Screen
					options={{ headerShown: false }}
					listeners={resetTabStacksOnBlur}
					name="Ma liste"
					component={FavoriteNavigator}
				/>
				<Tab.Screen
					name="Ajouter"
					component={SearchScreen}
					options={{
						tabBarIconStyle: {
							backgroundColor: "white",
						},
						tabBarItemStyle: {
							borderRadius: 50,
							maxWidth: 50,
							maxHeight: 50,
							top: -26,
						},
						tabBarLabelStyle: {
							display: "none",
						},
					}}
				/>
				<Tab.Screen
					options={{ headerShown: false }}
					listeners={resetTabStacksOnBlur}
					name="Mes Decks"
					component={DeckNavigator}
				/>
				<Tab.Screen name="Paramètres" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default TabNavigation;
