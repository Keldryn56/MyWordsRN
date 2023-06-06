import { useTheme } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { useState } from "react";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Results = (props) => {
	let { result, search, isFavorite, handleFavoriteChange } = props;
    const colors = useTheme().colors

	const [speaking, setSpeaking] = useState(false);

	const speak = () => {
		Speech.speak(result.word, {
			onStart: () => {
				setSpeaking(true);
			},
			onDone: () => {
				setSpeaking(false);
			},
			onError: () => {
				setSpeaking(false);
			},
			language: "en-US",
		});
	};

	const stopSpeaking = () => {
		Speech.stop().then(() => {
			setSpeaking(false);
		});
	};

	const renderItem = ({ item, index }) => {
		let counter = 1;
		return (
			<View key={index}>
				<Text style={[styles.wordType, {color: colors.text}]}>{item.partOfSpeech}</Text>
				<View style={styles.wordDefinitions}>
					{item.definitions.map((def) => (
						<Text style={{color: colors.text}}>
							{counter++}. {def.definition}
						</Text>
					))}
				</View>
			</View>
		);
	};

	if (result?.meanings) {
		return (
			<SafeAreaView style={[styles.resultContainer, {backgroundColor : colors.card}]}>
				<View style={styles.resultHeader}>
					{speaking ? (
						<TouchableOpacity onPress={() => stopSpeaking()}>
							<Ionicons name="pause" size={35} color="tomato" />
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => speak()}>
							<Ionicons name="volume-medium" size={35} color="tomato" />
						</TouchableOpacity>
					)}
					<Text style={[styles.resultWord, {color: colors.text}]}>{result.word}</Text>
					<TouchableOpacity
						style={{ flexGrow: 1 }}
						onPress={handleFavoriteChange}
					>
						<Ionicons
							style={{ alignSelf: "flex-end" }}
							name={isFavorite ? "star" : "star-outline"}
							size={28}
							color="tomato"
						/>
					</TouchableOpacity>
				</View>
				<Text style={[styles.resultPhonetic, {color: colors.text}]}>
					{result?.phonetics?.map((el) =>
						el.text ? "[" + el.text + "] " : ""
					)}
				</Text>
				<FlatList
					data={result?.meanings || []}
					keyExtractor={(item, index) => index}
					renderItem={renderItem}
					ItemSeparatorComponent={
						<View
							style={{
								backgroundColor: "lightgray",
								height: 0.6,
								marginVertical: 10,
							}}
						/>
					}
				/>
			</SafeAreaView>
		);
	}

	return (
		<View style={styles.error}>
			<Ionicons name="close-circle-outline" size={80} color="darkgray" />
			<Text style={styles.errorText}>
				Aucun résultat pour la recherche {search}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	resultContainer: {
		marginTop: 20,
		borderRadius: 5,
		flex: 1,
		padding: 20,
	},
	resultHeader: {
		flexDirection: "row",
		columnGap: 10,
		alignItems: "center",
	},
	resultWord: {
		fontSize: 35,
		fontWeight: "500",
	},
	resultPhonetic: {
		fontSize: 20,
		fontWeight: "300",
		marginBottom: 20,
	},
	wordType: {
		fontSize: 16,
		fontWeight: 500,
	},
	wordDefinitions: {
		marginLeft: 15,
		marginTop: 10,
		flexDirection: "column",
		rowGap: 5,
	},
	error: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	errorText: {
		color: "darkgray",
		fontSize: 18,
		fontStyle: "italic",
	},
});

export default Results;
