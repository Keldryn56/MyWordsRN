import db from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import ColorPicker, { Swatches } from 'reanimated-color-picker';
import { loginStyle } from "../../styles/login";
import Ionicons from "react-native-vector-icons/Ionicons";

export default DeckEdit = ({route, navigation}) => {

    const userProfile = useSelector((state) => state.user.data);
    const colors = useTheme().colors

    let data = route.params?.data || { // If no params => Create Deck with empty values+
        name: "",
        color: "tomato",
        words: [], 
        userId: userProfile.uid
    }

    const [item, setItem] = useState(data)  
    const [errorName, setErrorName] = useState(false)
    const [saving, setSaving] = useState(false);

    const deckSave = () => {

        if(item.name == ""){
            setSaving(false)
            setErrorName(true)
            return false
        }else{
            setErrorName(false)
        }

        db().collection("decks").doc(item.id).set({...item, updatedDt: new Date().toUTCString()}).then(() => {
            showMessage({
                message: "Deck sauvegardé",
                type: "success"
            })
            navigation.goBack()
        }).catch(e => {
            showMessage({
                message: e.message,
                type: "danger"
            }) 
        }).finally(() => {
            setSaving(false)
        })
    } 

    const handleItemName = (value) => {
        setItem({
            ...item,
            name: value
        })
    }

    useEffect(() => {
        if(saving){
          deckSave()
        }
      }, [saving]);

    useEffect(() => {
        navigation.setOptions({ 
            headerTitle: route.params?.data ? 'Editer '+item.name : 'Nouveau Deck',
            headerRight: () => {
                return (
                    saving ?
                        <ActivityIndicator color="tomato" size="small" style={{marginRight: 20}} />
                     : (
                        <TouchableOpacity onPress={() => setSaving(true)}>
                            <Ionicons style={{marginRight: 20}} name="checkmark-sharp" size={25} color="tomato" />
                        </TouchableOpacity>
                    )
                )
            }
        });
    }, [saving])

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={loginStyle.fields}>
				<View style={loginStyle.inputContainer}>
					<Text style={[loginStyle.inputLabel, {color: colors.text}]}>Nom du deck</Text>
					<CustomTextInput
						placeholder="Informatique"
						value={item.name}
                        error={errorName}
                        textColor={colors.text}
						onChangeText={handleItemName}
					/>
                    {errorName && (
						<Text style={loginStyle.errorLabel}>
							Merci de saisir un nom
						</Text>
					)}
				</View>
                <View style={loginStyle.inputContainer}>
					<Text style={[loginStyle.inputLabel, {color: colors.text}]}>Couleur</Text>
					<CustomTextInput
						placeholder="Informatique"
                        readOnly={true}
                        textColor={item.color}
						value={item.color}
					/>
				</View>
            </View>
            <ColorPicker style={{ flex:1 }} value='red' onComplete={({hex}) => setItem({...item, color:hex})}>
            <Swatches />
            </ColorPicker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff'
    },
});