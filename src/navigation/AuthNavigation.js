import { NavigationContainer, DefaultTheme  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import PasswordLost from "../components/login/PasswordLost";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import { DarkThemeCustom, LightThemeCustom } from "../styles/DarkThemeCustom";

const Auth = createNativeStackNavigator();

export default function AuthNavigation() {
    let theme = useColorScheme();
    const userTheme = useSelector(state => state.user.theme)  

    if(userTheme != "auto"){
        theme = userTheme
    }

	return (
		<NavigationContainer theme={theme === 'dark' ? DarkThemeCustom : LightThemeCustom}>
			<Auth.Navigator
				screenOptions={{
					headerShown: false,
                    presentation: "transparentModal"
				}}
			>
				<Auth.Screen
					name="SignIn"
					component={SignIn}
					options={{
						title: "Connexion",
						headerTitleAlign: "center",
					}}
				/>
				<Auth.Screen
					name="SignUp"
					component={SignUp}
					options={{
						title: "Inscription",
						headerTitleAlign: "center",
					}}
				/>
				<Auth.Screen
					name="PasswordLost"
					component={PasswordLost}
					options={{
						title: "Mot de passe oublié",
						headerTitleAlign: "center",
					}}
				/>
			</Auth.Navigator>
		</NavigationContainer>
	);
}
