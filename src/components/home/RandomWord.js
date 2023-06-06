import randomWords from "random-words";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useTheme } from "@react-navigation/native";

export default Random = (props) => {

	let {randomWord, setGenerateWord, generateWord} = props
    const [playing, setPlaying] = useState(false)
    const colors = useTheme()

    const speak = () => {
		Speech.speak(randomWord, {
			onStart: () => {
				setPlaying(true)
			},
			onDone: () => {
				setPlaying(false)
			},
			onError: () => {
				setPlaying(false)
			},
			language: "en-US",
		});
	};

	const stopSpeaking = () => {
		Speech.stop().then(() => {
			setPlaying(false)
		});
	};

	return (
        <>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 18, fontWeight: "600", flexGrow: 1, color: '#ffffff'}}>Mot aléatoire:</Text>
                <TouchableOpacity hitSlop={{top: 20, right: 20, bottom: 20, left: 20}} onPress={() => setGenerateWord(!generateWord)}>
                    <Ionicons name="refresh" size={26} color={colors.dark ? 'tomato' : '#ffffff'} />
                </TouchableOpacity>
            </View> 
            <View style={{alignSelf: 'center', flexDirection: 'row', marginVertical: 10, alignItems: 'center', columnGap: 10}}>
                {playing ? (
                    <TouchableOpacity hitSlop={{top: 20, right: 20, bottom: 20, left: 20}} onPress={() => stopSpeaking()}>
                        <Ionicons name="pause" size={34} color={colors.dark ? 'tomato' : '#ffffff'} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity hitSlop={{top: 20, right: 20, bottom: 20, left: 20}} onPress={() => speak()}>
                        <Ionicons name="volume-medium" size={34} color={colors.dark ? 'tomato' : '#ffffff'} />
                    </TouchableOpacity>
                )}
                <Text style={{fontSize: 32, color: '#ffffff', fontWeight: 'bold', marginTop: -6}}>{randomWord}</Text>
            </View>
        </>
    )
}
