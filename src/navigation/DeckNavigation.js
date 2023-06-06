import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DeckScreen from "../screens/DeckScreen";
import DeckEdit from "../components/decks/DeckEdit";
import DeckWords from "../components/decks/DeckWords";

const Stack = createStackNavigator();

export const DeckNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "center"
			}}
		>
			<Stack.Screen
				options={{ headerTitle: "Mes Decks" }}
				name="DeckList"
				component={DeckScreen}
			/>
            <Stack.Screen
				options={{ headerTitle: "Editer un deck" }}
				name="DeckEdit"
				component={DeckEdit}
			/>
            <Stack.Screen
				options={{ headerTitle: "Ajouter des mots" }}
				name="DeckWords"
				component={DeckWords}
			/>
		</Stack.Navigator>
	);
};
