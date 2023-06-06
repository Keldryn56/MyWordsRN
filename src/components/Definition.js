import db from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Results from "./search/Results";

const Definition = ({ route }) => {
	let word = route.params.word;
	const isFocused = useIsFocused();

	const userProfile = useSelector((state) => state.user.data);

	const [result, setResult] = useState([]);
	const [searching, setSearching] = useState(false);

	const [isFavorite, setIsFavorite] = useState(false);
	const [documentId, setDocumentId] = useState(null);
	const [favoriteChange, setFavoriteChange] = useState(true);

	const handleFavoriteChange = () => {
		if (!isFavorite) {
			let data = {
				userId: userProfile.uid,
				name: result.word,
                createdDt: new Date().toUTCString(),
				phonetic: result.phonetic || "",
			};

			db()
				.collection("favorites")
				.add(data)
				.then(() => {
					setFavoriteChange(!favoriteChange);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			db()
				.collection("favorites")
				.doc(documentId)
				.delete()
				.then(() => {
					setFavoriteChange(!favoriteChange);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	useEffect(() => {
		setSearching(true);
        setIsFavorite(false)
		async function fetchWord() {
			fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
				.then((response) => response.json())
				.then((results) => {
					setResult(results[0]);
				})
				.catch((e) => {
					console.log(e);
				})
				.finally(() => setSearching(false));
		}

		fetchWord();
	}, [word]);

	useEffect(() => {
		if (result?.word) {
			const q = db()
				.collection("favorites")
				.where("name", "==", result.word)
				.where("userId", "==", userProfile.uid)
				.limit(1);

			const unsubscribe = q.onSnapshot((querySnapshot) => {
				if (querySnapshot.docs.length) {
					setIsFavorite(true);
					setDocumentId(querySnapshot.docs[0].id);
				} else {
					setIsFavorite(false);
					setDocumentId(null);
				}
			});

			return unsubscribe;
		}
	}, [result]);

	return (
		<View style={styles.container}>
			{searching ? (
				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
				>
					<ActivityIndicator color="tomato" size="large" />
				</View>
			) : (
				<Results
					result={result}
					search={word}
					isFavorite={isFavorite}
					handleFavoriteChange={handleFavoriteChange}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});

export default Definition;
