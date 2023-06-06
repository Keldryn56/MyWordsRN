import db from "@react-native-firebase/firestore";
import * as Speech from "expo-speech";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import { useSelector } from "react-redux";
import RandomWord from "../components/home/RandomWord";
import { getRandomWord } from "../utils/commonWords";
import Favorites from "./../components/home/Favorites";

const HomeScreen = ({ navigation }) => {
    const colors = useTheme();

	let userProfile = useSelector((state) => state.user.data);

	const [lastFavorites, setLastFavorites] = useState([]);
	const [pendingDelete, setPendingDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

    const [generateWord, setGenerateWord] = useState(false)
    const randomWord = useMemo(() => getRandomWord(), [generateWord])  

	const deleteFavorite = async (id) => {
		setPendingDelete(true);
		await db().collection("favorites").doc(id).delete();
		setPendingDelete(false);
	};

	const speak = (word, index) => {
		Speech.speak(word, {
			onStart: () => {
				let localFavorites = [...lastFavorites];
				localFavorites[index].playing = true;
				setLastFavorites(localFavorites);
			},
			onDone: () => {
				stopSpeaking(index);
			},
			onError: () => {
				stopSpeaking(index);
			},
			language: "en-US",
		});
	};

	const stopSpeaking = (index) => {
		let localFavorites = [...lastFavorites];
		localFavorites[index].playing = false;

		Speech.stop().then(() => {
			setLastFavorites(localFavorites);
		});
	};

	useEffect(() => {
		const q = db()
			.collection("favorites")
			.where("userId", "==", userProfile.uid)
			.orderBy("createdDt", "desc")
			.limit(6);

		const unsubscribe = q.onSnapshot((querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({
					...doc.data(),
					id: doc.id,
				});
			});
			setLastFavorites(data);
			setIsLoading(false);
		});
		return () => unsubscribe;
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.smallTitle}>Bienvenue sur MyWords!</Text>
			<Text style={[styles.bigTitle, {color: colors.colors.text}]}>{userProfile.displayName}</Text>
			{isLoading ? (
				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
				>
					<ActivityIndicator color="tomato" size="large" />
				</View>
			) : (
				<View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Definition', {word: randomWord})} style={{backgroundColor: colors.dark ? colors.colors.card : '#478eff', borderRadius: 5, padding: 20}}>
                        <RandomWord randomWord={randomWord} setGenerateWord={setGenerateWord} generateWord={generateWord}  />
                    </TouchableOpacity>
                    <Favorites
                        items={lastFavorites}
                        navigation={navigation}
                        speak={speak}
                        stopSpeaking={stopSpeaking}
                        pendingDelete={pendingDelete}
                        deleteFavorite={deleteFavorite}
                    />
				</View>
			)}
		</View>
	);
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    smallTitle: {
        fontSize: 18,
        fontWeight: "400",
        color: "darkgray",
        marginBottom: -4,
    },
    bigTitle: {
        fontSize: 30,
        fontWeight: "900",
    },
});

export default HomeScreen;
