import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from '@react-navigation/native';

const Favorites = (props) => {
	const {
		items,
		pendingDelete,
		deleteFavorite,
		navigation,
		speak,
		stopSpeaking,
	} = props;

    const colors = useTheme()

	const renderFavorite = ({ item, index }) => (
		<TouchableOpacity
			style={{
				flex: 1,
				flexDirection: "row",
				alignItems: "center",
				paddingVertical: 10,
				columnGap: 10,
			}}
			onPress={() => navigation.navigate("Definition", { word: item.name })}
		>
			{item.playing ? (
				<TouchableOpacity onPress={() => stopSpeaking(index)}>
					<Ionicons name="pause" size={26} color={colors.dark ? 'tomato' : 'white' } />
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={() => speak(item.name, index)}>
					<Ionicons name="volume-medium" size={26} color={colors.dark ? 'tomato' : 'white' } />
				</TouchableOpacity>
			)}
			<Text style={{ fontSize: 15, flexGrow: 1, color: "#ffffff", marginTop: -5 }}>
				{item.name} <Text style={{ fontWeight: "500" }}>({item.phonetic})</Text>
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={[styles.favoritesContainer, colors.dark == true ? {backgroundColor: colors.colors.card} : '']}>
            {items.length == 0 ? (
                <>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.favoritesTitle}>Aucun mot</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Ajouter")}
                            style={[styles.favoritesButton, colors.dark == true ? {backgroundColor: colors.colors.card} : '']}
                        >
                            <Text style={styles.favoritesButtonTitle}>Ajouter un mot</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : 
                <>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.favoritesTitle}>Derniers mots ajoutés:</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Ma liste")}
                            style={[styles.favoritesButton, colors.dark == true ? {backgroundColor: colors.colors.card} : '']}
                        >
                            <Text style={[styles.favoritesButtonTitle]}>Voir tout</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={items.slice(0, 6)}
                        renderItem={renderFavorite}
                        style={{ marginTop: 10 }}
                        ItemSeparatorComponent={() => (
                            <View style={{ backgroundColor: "#ffffff", height: 0.6 }} />
                        )}
                    />
                </>
            }
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	favoritesContainer: {
		padding: 20,
		marginVertical: 20,
		backgroundColor: "tomato",
		borderRadius: 5,
	},
	favoritesTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#ffffff",
		flexGrow: 1,
	},
	favoritesButton: {
		backgroundColor: "white",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
	},
	favoritesButtonTitle: {
		color: "tomato",
		fontWeight: "500",
	},
});

export default Favorites;
