import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserTheme } from "../../stores/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

export default UserAppearance = () => {
    const themes = ["light", "dark", "auto"]
    const colors = useTheme().colors
    const userTheme = useSelector(state => state.user.theme) 
    const [theme, setTheme] = useState(userTheme)

    const dispatch = useDispatch()

    const handleThemeChange = async(el) => {
        try {
            setTheme(el)
            dispatch(setUserTheme(el))
            await AsyncStorage.setItem('@theme', el)
        } catch (e) {
            showMessage({
                message: e.message,
                type: danger
            })
        }
    }
    return (
        <View style={{flexDirection: 'row', columnGap: 10}}> 
            {
                themes.map((el, index) => (
                    <TouchableOpacity key={el+index} onPress={() => handleThemeChange(el)} style={styles.buttonContainer(theme, el, colors)}>
                        <Text style={styles.text(theme, el, colors)}>{el}</Text>
                    </TouchableOpacity>
                ))
            }   
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: (item, el, colors) => {
        return {
            flexGrow: 1, 
            paddingVertical: 16,
            borderRadius: 5,
            backgroundColor: item == el ? 'tomato' : colors.card,
        }
    },
    text: (item, el, colors) => {
        return {
            textAlign: 'center', 
            textTransform: 'capitalize',
            color: item == el ? '#ffffff' : colors.text,
        }
    }
})