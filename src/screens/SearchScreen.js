import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Definition from "../components/Definition";
import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
	const userProfile = useSelector((state) => state.user.data);
	const isFocused = useIsFocused();
	const [search, setSearch] = useState("");
	const [init, setInit] = useState(false);
	const [word, setWord] = useState("");

	const fetchWord = () => {
		if (!init) {
			setInit(true);
		}
		setWord(search);
	};

	useEffect(() => {
		if (!isFocused) {
			setSearch("");
		}
	}, [isFocused]);

	return (
		<View style={styles.container}>
			<SearchBar
				onEndEditing={fetchWord}
				onClear={() => setSearch("")}
				placeholder="Rechercher un mot anglais..."
				value={search}
				searchContainerStyle={{ marginBottom: 0, margin: 20 }}
				onValueChange={setSearch}
			/>
			{init && (
				<Definition
					route={{
						params: {
							word: word,
						},
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default SearchScreen;
