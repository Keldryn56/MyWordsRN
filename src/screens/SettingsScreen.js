import auth, { firebase } from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import UserAppearance from "../components/settings/UserAppearance";
import UserData from "../components/settings/UserData";
import { loginStyle as styles } from "../styles/login";

export default SettingsScreen = ({navigation}) => {

    const colors = useTheme().colors
    const userProfile = useSelector((state) => state.user.data);
    const [userName, setUserName] = useState(userProfile.displayName)
    const [errorUserName, setErrorUserName] = useState(false);
    const [saving, setSaving] = useState(false)

	const logOut = async () => {
		auth().signOut().then(() => {
            showMessage({
                message: "Vous avez été deconnecté",
                type: "info"
            })
        }).catch(e => {
            showMessage({
                message: "Erreur lors de la fermeture de session",
                type: "danger"
            })
        })
        
	};

    const updateUserProfile = async() => {
        if (userName == "") {
			setErrorUserName(true);
            setSaving(false)
			return false;
		} else {
			setErrorUserName(false);
		} 

        try {
            await firebase.auth().currentUser.updateProfile({
                displayName: userName
            });
            showMessage({message: 'Profil mis à jour',type: 'success'})
            auth().currentUser.getIdTokenResult(true);
        } catch (error) {
            showMessage({
                message: getFirebaseMessage(error.code),
                type: 'danger'
            })
            console.log(error.message)
        }finally{
            setSaving(false)
        }
        
    }

    useEffect(() => {
        if(saving){
            updateUserProfile()
        }
    }, [saving]);

    useEffect(() => {
        navigation.setOptions({ 
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
		<View style={{ flex: 1, padding: 20, flexDirection: 'column' }}>
            <Text style={{color: colors.text, fontSize: 22, fontWeight: '600', marginBottom: 10}}>Vos informations</Text>
            <UserData 
                userName={userName} 
                setUserName={setUserName} 
                errorUserName={errorUserName}
            />
            <Text style={{color: colors.text, fontSize: 22, fontWeight: '600', marginBottom: 10}}>Theme</Text>
            <UserAppearance />
            <TouchableOpacity
				style={[styles.btnValidation, {marginTop: 'auto'}]}
				onPress={logOut}>
                <Text style={styles.btnValidationLabel}>Deconnexion</Text>
			</TouchableOpacity>
		</View>
	);

}
