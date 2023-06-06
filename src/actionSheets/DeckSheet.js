import { useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const actionMenu = (deleteDeck, duplicateDeck, editDeck, showActionSheetWithOptions) => {    
	const icon = (name) => <Ionicons name={name} size={22} />;
	const options = ["Modifier", "Dupliquer", "Supprimer", "Annuler"];
	const destructiveButtonIndex = 2;
	const withIcons = true;
	const icons = [icon("create"), icon("copy") , icon("trash"), icon("close-circle")];
	const cancelButtonIndex = 3;

	showActionSheetWithOptions(
		{
			options,
			cancelButtonIndex,
			withIcons,
			icons,
			cancelButtonTintColor: "#D93F0B",
			destructiveButtonIndex
		},
		(selectedIndex) => {
			switch (selectedIndex) {
                case 0:
                    editDeck()
                    break;
                case 1:
                    duplicateDeck()
                    break;
				case 2:
					deleteDeck();
					break;
				case 3:
				// Canceled
			}
		}
	);
};
