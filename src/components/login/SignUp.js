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
import { validateEmail, validatePassword } from "../../utils/validation";
import CustomTextInput from "../CustomTextInput";
import CustomTextInputPw from "../CustomTextInputPw";
import SignInWithSocial from "./SignInWithSocial";

const SignIn = ({ navigation }) => {
    const colors = useTheme().colors
	const [email, setEmail] = React.useState("");
	const [userName, setUserName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [verifPassword, setVerifPassword] = React.useState("");

	const [errorEmail, setErrorEmail] = React.useState(false);
	const [errorUserName, setErrorUserName] = React.useState(false);
	const [errorPassword, setErrorPassword] = React.useState(false);
	const [errorVerifPassword, setErrorVerifPassword] = React.useState(false);

	const [showPassword, setShowPassword] = React.useState("");
	const [showVerifPassword, setShowVerifPassword] = React.useState("");

	const [sending, setSending] = React.useState(false);

	const handleSignUp = async () => {
		if (email == "" || !validateEmail(email)) {
			setErrorEmail(true);
			return false;
		} else {
			setErrorEmail(false);
		}
		if (userName == "") {
			setErrorUserName(true);
			return false;
		} else {
			setErrorUserName(false);
		}
		if (password == "" || !validatePassword(password)) {
			setErrorPassword(true);
			return false;
		} else {
			setErrorPassword(false);
		}

		if (password != verifPassword) {
			setErrorVerifPassword(true);
			return false;
		} else {
			setErrorVerifPassword(false);
		}

		try {
			setSending(true);

			await auth().createUserWithEmailAndPassword(email, password);
			await auth().currentUser.updateProfile({ displayName: userName });
			auth().currentUser.getIdTokenResult(true);
		} catch (e) {
			console.log(e);
			let err = getFirebaseMessage(e.code);
			showMessage({ message: err.message, type: err.type });
		} finally {
			setSending(false);
		}
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
				<View style={styles.inputContainer}>
					<Text style={[styles.inputLabel, {color: colors.text}]}>Nom d'utilisateur</Text>
					<CustomTextInput
						error={errorUserName}
						placeholder="Pseudo"
						autoComplete="username"
						value={userName}
						onChangeText={setUserName}
					/>
					{errorUserName && (
						<Text style={styles.errorLabel}>
							Le pseudo ne doit pas être vide
						</Text>
					)}
				</View>
				<View style={styles.inputContainer}>
					<Text style={[styles.inputLabel, {color: colors.text}]}>Mot de passe</Text>
					<CustomTextInputPw
                        autoCapitalize="none"
						secureTextEntry={!showPassword}
						placeholder="Mot de passe"
						error={errorPassword}
						setShowPassword={setShowPassword}
						value={password}
						onChangeText={setPassword}
					/>
					{errorPassword && (
						<Text style={styles.errorLabel}>
							Votre mot de passe doit faire au moins 8 caractères, contenir un
							chiffre et une lettre
						</Text>
					)}
				</View>
				<View style={styles.inputContainer}>
					<Text style={[styles.inputLabel, {color: colors.text}]}>Confirmation</Text>
					<CustomTextInputPw
                        autoCapitalize="none"
						secureTextEntry={!showVerifPassword}
						placeholder="Mot de passe"
						setShowPassword={setShowVerifPassword}
						error={errorVerifPassword}
						value={verifPassword}
						onChangeText={setVerifPassword}
					/>
					{errorVerifPassword && (
						<Text style={styles.errorLabel}>
							Les 2 mots de passe ne sont pas identiques
						</Text>
					)}
				</View>
			</View>
			<TouchableOpacity
				disabled={sending}
				style={styles.btnValidation}
				onPress={handleSignUp}
			>
				{sending ? (
					<View style={{ alignSelf: "center" }}>
						<ActivityIndicator size="small" color="#ffffff" />
					</View>
				) : (
					<Text style={styles.btnValidationLabel}>Inscription</Text>
				)}
			</TouchableOpacity>
            <SignInWithSocial buttonText="S'inscrire avec Google" sending={sending} setSending={setSending} />
			<TouchableOpacity
				onPress={() => navigation.navigate("SignIn")}
			>
				<Text style={{ textAlign: "center", fontSize: 15, color: colors.text }}>
					Déjà un compte?{" "}
					<Text style={{ textDecorationLine: "underline", fontWeight: 500 }}>
						Connectez vous!
					</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignIn;
