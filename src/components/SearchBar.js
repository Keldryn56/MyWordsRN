import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = (props) => {
    const colors = useTheme().colors;

    const styles = StyleSheet.create({
        searchContainer: {
            backgroundColor: colors.card,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            columnGap: 10,
            marginBottom: 20,
        },
    });
    
	let clearIcon = props.clearIcon || true;

	return (
		<View style={[styles.searchContainer, props.searchContainerStyle || null]}>
			{props.searchIconContent || (
				<Ionicons
					name="search"
					size={props.searchIconSize || 24}
					color={props.searchIconColor || colors.text}
				/>
			)}
			<TextInput
				onEndEditing={props.onEndEditing || null}
				placeholder={props.placeholder || "Rechercher..."}
				style={{ flexGrow: 1, color: colors.text }}
                placeholderTextColor={colors.text}
				value={props.value}
				onChangeText={props.onValueChange}
			/>
			{props.value != "" && clearIcon && (
				<TouchableOpacity
					hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
					onPress={props.onClear}
				>
					{props.clearIconContent || (
						<Ionicons
							name="close"
							size={props.clearIconSize || 24}
							color={props.clearIconColor || "gray"}
						/>
					)}
				</TouchableOpacity>
			)}
		</View>
	);
    
};

export default SearchBar;
