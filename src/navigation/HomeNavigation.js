import { createStackNavigator } from "@react-navigation/stack";
import Definition from "../components/Definition";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export const HomeNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "center",
			}}
		>
			<Stack.Screen
				options={{ headerTitle: "Accueil" }}
				name="Home"
				component={HomeScreen}
			/>
			<Stack.Screen name="Definition" component={Definition} />
		</Stack.Navigator>
	);
};
