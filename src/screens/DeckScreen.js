import db from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import DeckItem from "../components/decks/DeckItem";

export default DeckScreen = ({navigation}) => {
	const userProfile = useSelector((state) => state.user.data);
	const [decks, setDecks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
    const colors = useTheme().colors

	useEffect(() => {
		const q = db()
			.collection("decks")
			.where("userId", "==", userProfile.uid)
			.orderBy("updatedDt", "desc");

		const unsubscribe = q.onSnapshot((querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({
					...doc.data(),
					id: doc.id,
				});
			});
			setDecks(data);
			setIsLoading(false);
		});
		return () => unsubscribe;
	}, []);

	const NewItem = () => (
        <View style={deck.nameContainer}>
            <Ionicons name="add" size={34} color="tomato" />
        </View>
	);



	return (
		<View style={styles.container}>
			<Text style={[styles.title, {color: colors.text}]}>Vos Decks de mots</Text>
			{isLoading ? (
				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
				>
					<ActivityIndicator color="tomato" size="large" />
				</View>
			) : (
				<View style={{ marginTop: 10, flex:1}}>
					<View style={[deck.container]}>
						{decks.map((el) => (
                            <DeckItem navigation={navigation} key={el.id} item={el} />
						))}
                        <TouchableOpacity style={deck.newItem} onPress={() => navigation.navigate('DeckEdit')}>
						    <NewItem />
                        </TouchableOpacity>
					</View>
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
	title: {
		fontSize: 22,
		fontWeight: "600",
	},
});

const deck = StyleSheet.create({
    container: {
		flexDirection: "row",
		justifyContent: "flex-start",
		flexWrap: "wrap",
		columnGap: 20,
		rowGap: 20,
		borderRadius: 5,
		paddingVertical: 10,
	},
	newItem: {
		width: '29.3%',
		height: 150,
		borderStyle: "dashed",
		borderWidth: 2,
		borderColor: "tomato",
		borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.06)'
	},
	nameContainer: {
		justifyContent: "center",
		flexGrow: 1,
		alignItems: "center",
	}
});
