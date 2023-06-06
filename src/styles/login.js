import Constants from "expo-constants";
import {
    StyleSheet
} from "react-native";

export const loginStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		paddingBottom: 20,
		paddingHorizontal: 30,
		flexDirection: "column",
		justifyContent: "center",
	},
	inputContainer: {
		flexDirection: "column",
		rowGap: 5,
		marginBottom: 10,
	},
	inputLabel: {
		fontSize: 16,
	},
	input: {
		borderColor: "darkgray",
		borderRadius: 5,
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
	error: {
		borderColor: "tomato",
		borderWidth: 1.5,
	},
	errorLabel: {
		color: "tomato",
		fontWeight: 600,
		marginBottom: -5,
		fontSize: 13,
	},
	btnValidation: {
		backgroundColor: "tomato",
		borderRadius: 5,
		padding: 14,
	},
	btnValidationLabel: {
		color: "#ffffff",
		textAlign: "center",
		textTransform: "uppercase",
		fontWeight: 500,
		fontSize: 16,
	},
	fields: {
		marginVertical: 10,
	},
});