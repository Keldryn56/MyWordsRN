import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default CustomTextInputPw = (props) => {
	const [isFocused, setIsFocused] = useState(false);
    const colors = useTheme().colors

	return (
		<View
			style={[
				props.style || styles.input,
                {
                    borderColor: colors.border,
                    backgroundColor: colors.card
                },
				isFocused ? styles.focused : "",
				props.error ? styles.error : ""
			]}
		>
			<TextInput
				style={{ flexGrow: 1, color: colors.text }}
				autoCapitalize={props.autoCapitalize || undefined}
				onEndEditing={props.onEndEditing || undefined}
				secureTextEntry={props.secureTextEntry || undefined}
				placeholder={props.placeholder || undefined}
                placeholderTextColor={colors.text}
				autoComplete={props.autoComplete || undefined}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				value={props.value}
				onChangeText={(value) => props.onChangeText(value.trim())}
			/>
			<Ionicons
				onPress={() => props.setShowPassword(props.secureTextEntry)}
				name={!props.secureTextEntry ? "eye-off" : "eye"}
				size={22}
				color="tomato"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	error: {
		borderColor: "tomato",
		borderWidth: 1.5,
	},
	input: {
		flexDirection: "row",
		alignItems: "center",
        opacity: 0.8,
		borderRadius: 5,
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
	focused: {
		borderWidth: 1.5,
	},
});
