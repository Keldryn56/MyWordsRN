import { useActionSheet } from "@expo/react-native-action-sheet";
import db from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { actionMenu } from "../../actionSheets/FavoriteSheet";

const FavoriteItem = (props) => {
	const { showActionSheetWithOptions } = useActionSheet();
    const colors = useTheme().colors

	let { item } = props;

	const [pendingDelete, setPendingDelete] = useState(false);
	const [speaking, setSpeaking] = useState(false);

	const deleteFavorite = async () => {
		try {
			setPendingDelete(true);
			await db().collection("favorites").doc(item.id).delete();
		} catch (e) {
			showMessage({ message: e.message, type: "danger" });
		} finally {
			setPendingDelete(false);
		}
	};

	const speak = () => {
		Speech.speak(item.name, {
			onStart: () => setSpeaking(true),
			onDone: () => setSpeaking(false),
			onError: () => setSpeaking(false),
			language: "en-US",
		});
	};

	const stopSpeaking = () => {
		Speech.stop().then(() => setSpeaking(false));
	};

	return (
		<>
			{speaking ? (
				<TouchableOpacity hitSlop={20} onPress={stopSpeaking}>
					<Ionicons name="pause" size={26} color="tomato" />
				</TouchableOpacity>
			) : (
				<TouchableOpacity hitSlop={20} onPress={speak}>
					<Ionicons name="volume-medium" size={26} color="tomato" />
				</TouchableOpacity>
			)}
            <Text style={{ flexGrow: 1, fontSize: 15, color: colors.text}}>
                {item.name} 
                {item.phonetic && 
                    <Text style={{ fontWeight: "500"}}>
                        ({item.phonetic})
                    </Text>
                }
            </Text>
			{pendingDelete ? (
				<ActivityIndicator size="small" color="tomato" />
			) : (
				<TouchableOpacity
					hitSlop={20}
					onPress={() => actionMenu(deleteFavorite, showActionSheetWithOptions)}
				>
					<Ionicons name="ellipsis-vertical" size={22} color="gray" />
				</TouchableOpacity>
			)}
		</>
	);
};

const styles = StyleSheet.create({
});

export default FavoriteItem;
