import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
    ActivityIndicator,
    Image, Text,
    TouchableOpacity,
    View
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { loginStyle as styles } from "../../styles/login";
import { getFirebaseMessage } from "../../utils/firebaseErrors";
import { validateEmail } from "../../utils/validation";
import CustomTextInput from "../CustomTextInput";

const PasswordLost = ({ navigation }) => {
	const [email, setEmail] = React.useState("");
	const [errorEmail, setErrorEmail] = React.useState(false);
	const [sending, setSending] = React.useState(false);
    const colors = useTheme().colors

	const resetPassword = () => {
		setSending(true);
		auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				showMessage({
					message: "Votre mot de passe a été envoyé. Vérifiez votre boite mail",
					info: "success"
				});
			})
			.catch((e) => {
				let err = getFirebaseMessage(e.code);

				showMessage({
					message: err.message,
					type: err.type
				});
			})
			.finally(() => {
				setSending(false);
			});
	};

	const checkEmailFormat = () => {
		if (validateEmail(email) || email == "") {
			setErrorEmail(false);
		} else {
			setErrorEmail(true);
		}
	};

	return (
		<View style={[styles.container, {backgroundColor: colors.background}]}>
			<Image
				style={{
					height: 200,
					width: 300,
					alignSelf: "center",
					resizeMode: "contain",
				}}
				source={require("../../../assets/mywords.png")}
			/>
			<View style={styles.fields}>
				<View style={styles.inputContainer}>
					<Text style={[styles.inputLabel, {color: colors.text}]}>Email</Text>
					<CustomTextInput
						autoCapitalize="none"
						onEndEditing={checkEmailFormat}
						error={errorEmail}
						placeholder="Email"
						autoComplete="email"
						value={email}
						onChangeText={setEmail}
					/>
					{errorEmail && (
						<Text style={styles.errorLabel}>
							Merci de saisir une adresse email valide
						</Text>
					)}
				</View>
			</View>
			<TouchableOpacity
				disabled={sending}
				style={styles.btnValidation}
				onPress={resetPassword}
			>
				{sending ? (
					<View style={{ alignSelf: "center" }}>
						<ActivityIndicator size="small" color="#ffffff" />
					</View>
				) : (
					<Text style={styles.btnValidationLabel}>
						Réinitialiser le mot de passe
					</Text>
				)}
			</TouchableOpacity>
			<TouchableOpacity
				style={{ marginTop: 30 }}
				onPress={() => navigation.goBack()}
			>
				<Text style={{ textAlign: "center", fontSize: 15, color: colors.text }}>
					<Text style={{ textDecorationLine: "underline", fontWeight: 500 }}>
						Retour à la connexion
					</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default PasswordLost;
