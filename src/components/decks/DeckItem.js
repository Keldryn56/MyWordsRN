import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import { actionMenu } from "../../actionSheets/DeckSheet";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { showMessage } from "react-native-flash-message";
import db from "@react-native-firebase/firestore"

export default DeckItem = (props) => {
    let {item, navigation} = props
    const { showActionSheetWithOptions } = useActionSheet();

    const deleteDeck = () => {
        db().collection("decks").doc(item.id).delete().then(() => {
            showMessage({
                message: "Deck Supprimé",
                type: "success"
            })
        })
    }

    const duplicateDeck = () => {
        db().collection("decks").add({
            name: item.name+' copie',
            userId: item.userId,
            color: item.color,
            updatedDt: new Date().toUTCString(),
            words: item.words
        }).then(() => {
            showMessage({
                message: "Deck dupliqué",
                type: "success"
            })
        }).catch((e) => {
            showMessage({
                message: e.message,
                type: "danger"
            })
        });
    }

    const editDeck = () => { 
        navigation.navigate('DeckEdit', {
            data: item
        })
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('DeckWords', {data:item})} onLongPress={() => actionMenu(deleteDeck, duplicateDeck, editDeck, showActionSheetWithOptions)} style={[deck.item, {backgroundColor: item.color}]}>
            <TouchableOpacity onPress={() => actionMenu(deleteDeck, duplicateDeck, editDeck, showActionSheetWithOptions)} style={{ alignSelf: "flex-end" }} hitSlop={20}>
                <Ionicons name="ellipsis-vertical" size={18} color="white" />
            </TouchableOpacity>
            <View style={deck.nameContainer}>
                <Text style={deck.nameTitle}>{item.name}</Text>
            </View>
            <View>
                <Text style={deck.nbWords}>{item.words.length} Mot(s)</Text>
            </View>
        </TouchableOpacity>
    );
}

const deck = StyleSheet.create({
	item: {
		width: '29.3%',
		height: 150,
		borderRadius: 15,
		backgroundColor: "tomato",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	nameContainer: {
		justifyContent: "center",
		flexGrow: 1,
		alignItems: "center",
	},
	nameTitle: {
		fontWeight: "500",
		color: "#ffffff",
		fontSize: 15,
		textAlign: "center",
	},
	nbWords: {
		fontSize: 12,
		fontWeight: "400",
		color: "#ffffff",
	},
});