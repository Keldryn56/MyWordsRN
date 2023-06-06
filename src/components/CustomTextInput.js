import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default CustomTextInput = (props) => {
	const [isFocused, setIsFocused] = useState(false);
    const colors = useTheme().colors
    console.log(colors)

	return (
		<TextInput
			autoCapitalize={props.autoCapitalize || undefined}
			onEndEditing={props.onEndEditing || undefined}
			style={[
				props.style || styles.input,
                {
                    borderColor: colors.border,
                    backgroundColor: colors.card
                },
				isFocused ? styles.focused : "",
				props.error ? styles.error : "",
                {
                    color: colors.text
                }
			]}
			secureTextEntry={props.secureTextEntry || undefined}
			placeholder={props.placeholder || undefined}
            placeholderTextColor={colors.text}
			autoComplete={props.autoComplete || undefined}
            readOnly={props.readOnly || false}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			value={props.value}
			onChangeText={(value) => props.onChangeText(value)}
		/>
	);
};

const styles = StyleSheet.create({
	error: {
		borderColor: "tomato",
		borderWidth: 1.5,
	},
	input: {
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
