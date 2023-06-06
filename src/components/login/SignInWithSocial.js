import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { showMessage } from "react-native-flash-message";

GoogleSignin.configure({
    webClientId: '703676611348-gao5kl4ebt3e5c263v5q6c531mlpttmq.apps.googleusercontent.com', 
});

const SignInWithSocial = (props) => {

    const {setSending, sending, buttonText} = props

    const signInWithGoogle = async() => {
        try{
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            setSending(true)
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            auth().signInWithCredential(googleCredential);
        }catch(e){
            let message = ""
            
            if (e.code === statusCodes.SIGN_IN_CANCELLED) {
                return false;
            } else if (e.code === statusCodes.IN_PROGRESS) {
                return false;
            } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                message = "Service PlayStore indisponibles"
            } else {
                message = e.message
            }

            showMessage({
                message: message, 
                type: 'danger'
            })
            setSending(false)
        }
    } 

	return (
		<View style={styles.container}>
			<View style={styles.delimiterContainer}>
				<View style={styles.delimiter} />
				<View style={styles.delimiterLabelContainer}>
					<Text style={styles.delimiterLabel}>OU</Text>
				</View>
				<View style={styles.delimiter} />
			</View>
			<View style={styles.socialIcons}>
				<TouchableOpacity disabled={sending} style={[styles.googleButtonContainer, sending ? styles.googleButtonContainerDisabled : '']} onPress={signInWithGoogle}>
                    <View style={styles.googleIconContainer}>
					    <Ionicons name="logo-google" size={22} color={sending ? 'rgba(219,68,55, 0.5)' : 'rgb(219,68,55)'} />
                    </View>
                    <View style={styles.googleTextContainer}>
                        <Text style={styles.googleText}>{buttonText}</Text>
                    </View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	socialIcons: {
		alignItems: "center",
		marginBottom: 10,
		columnGap: 15,
	},
	delimiterContainer: {
		marginVertical: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	delimiter: {
		height: 1,
		borderBottomColor: "darkgray",
		borderWidth: 0.2,
		flexGrow: 1,
		opacity: 0.5,
	},
	delimiterLabelContainer: {
		borderColor: "darkgray",
		borderWidth: 1,
		padding: 4,
		borderRadius: 5,
	},
	delimiterLabel: {
		color: "darkgray",
		fontSize: 16,
	},
    googleButtonContainer:{
        backgroundColor: 'rgb(67, 133, 245)', 
        flexDirection: 'row', 
        borderRadius: 5,
        marginBottom: 10
    },
    googleButtonContainerDisabled:{
        opacity: 0.2
    },
    googleIconContainer:{
        backgroundColor: '#ffffff',
        margin: 2, 
        paddingVertical: 8, 
        paddingHorizontal: 10,
        borderRadius: 5
    },
    googleTextContainer:{
        justifyContent: 'center', 
        paddingHorizontal: 20
    },
    googleText:{
        color: '#ffffff', 
        fontSize: 16, 
        fontWeight: '700'
    }
});

export default SignInWithSocial;
