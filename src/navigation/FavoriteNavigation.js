import { createStackNavigator } from "@react-navigation/stack";
import Definition from "../components/Definition";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createStackNavigator();

export const FavoriteNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "center",
			}}
		>
			<Stack.Screen
				options={{ headerTitle: "Ma Liste" }}
				name="List"
				component={FavoritesScreen}
			/>
			<Stack.Screen name="Definition" component={Definition} />
		</Stack.Navigator>
	);
};
