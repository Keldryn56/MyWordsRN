import Ionicons from "react-native-vector-icons/Ionicons";

export const actionMenu = (deleteFavorite, showActionSheetWithOptions) => {
	const icon = (name) => <Ionicons name={name} size={22} />;
	const options = ["Supprimer", "Annuler"];
	const destructiveButtonIndex = 0;
	const withIcons = true;
	const icons = [icon("trash"), icon("close-circle")];
	const cancelButtonIndex = 1;

	showActionSheetWithOptions(
		{
			options,
			cancelButtonIndex,
			withIcons,
			icons,
			cancelButtonTintColor: "#D93F0B",
			destructiveButtonIndex,
		},
		(selectedIndex) => {
			switch (selectedIndex) {
				case destructiveButtonIndex:
					deleteFavorite();
					break;

				case cancelButtonIndex:
				// Canceled
			}
		}
	);
};
