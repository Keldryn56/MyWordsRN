import db from "@react-native-firebase/firestore";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import FavoriteItem from "./../components/favorites/FavoriteItem";
import SearchBar from "./../components/SearchBar";

const FavoritesScreen = ({ navigation }) => {
	const userProfile = useSelector((state) => state.user.data);
    const colors = useTheme().colors

	const [search, setSearch] = useState("");
	const [favorites, setFavorites] = useState([]);
	const [threshold, setThreshold] = useState(10);
	const [pendingDelete, setPendingDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const q = db()
			.collection("favorites")
			.where("userId", "==", userProfile.uid)
			.orderBy("createdDt", "desc");

		const unsubscribe = q.onSnapshot((querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push({
					...doc.data(),
					id: doc.id,
				});
			});
			setFavorites(data);
			setIsLoading(false);
		});
		return () => unsubscribe;
	}, []);

	const clearSearch = () => setSearch("");

	return (
		<View style={styles.container}>
			{isLoading ? (
				<View
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
				>
					<ActivityIndicator color="tomato" size="large" />
				</View>
			) : (
				<View style={{ flex: 1 }}>
					<SearchBar
						value={search}
						onValueChange={setSearch}
						onClear={clearSearch}
					/>
					<Text style={[styles.title, {color: colors.text}]}>Votre liste de mots ({favorites.length})</Text>
					{favorites.length == 0 ? (
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Ionicons
								name="close-circle-outline"
								size={80}
								color="darkgray"
							/>
							<Text
								style={{ color: "darkgray", fontSize: 18, fontStyle: "italic" }}
							>
								Votre liste est vide
							</Text>
						</View>
					) : (
						<FlatList
							data={favorites.slice(0, threshold).filter((item) =>
								item.name
									.toLowerCase()
									.includes(search.toLowerCase().slice(0, threshold))
							)}
							renderItem={({ item, index }) => (
								<TouchableOpacity
                                    key={item.id}
									onPress={() =>
										navigation.navigate("Definition", { word: item.name })
									}
									style={[styles.favoriteContainer, {backgroundColor: colors.card}]}
								>
									<FavoriteItem item={item} />
								</TouchableOpacity>
							)}
							style={{ marginTop: 10, flex:1 }}
                            onEndReached={() => {
                                setThreshold(threshold+5)
                            }}
							onEndReachedThreshold={0.1}
						/>
					)}
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
	favoriteContainer: {
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		columnGap: 10,
	},
	title: {
		fontSize: 22,
		fontWeight: "600",
		marginBottom: 10,
	},
});

export default FavoritesScreen;
