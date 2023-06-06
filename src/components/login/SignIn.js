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
import CustomTextInputPw from "../CustomTextInputPw";
import SignInWithSocial from "./SignInWithSocial";

const SignIn = ({ navigation }) => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errorEmail, setErrorEmail] = React.useState(false);
	const [sending, setSending] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
    const colors = useTheme().colors

	const handleSignIn = async () => {
		if (email == "" || password == "") {
			return false;
		}

		setSending(true);
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => console.log("logged in "))
			.catch((e) => {
				let err = getFirebaseMessage(e.code);
				showMessage({ message: err.message, type: err.type});
			})
			.finally(() => setSending(false));
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
					<Text style={[styles.inputLabel, {color: colors.text}]}>Password</Text>
					<CustomTextInputPw
                        autoCapitalize="none"
						secureTextEntry={!showPassword}
						placeholder="Mot de passe"
						setShowPassword={setShowPassword}
						value={password}
						onChangeText={setPassword}
					/>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("PasswordLost")}>
					<Text style={{ textAlign: "right", fontSize: 13, color: "#1877f2" }}>
						Mot de passe oublié ?
					</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				disabled={sending}
				style={styles.btnValidation}
				onPress={handleSignIn}
			>
				{sending ? (
					<View style={{ alignSelf: "center" }}>
						<ActivityIndicator size="small" color="#ffffff" />
					</View>
				) : (
					<Text style={styles.btnValidationLabel}>Connexion</Text>
				)}
			</TouchableOpacity>
            <SignInWithSocial buttonText="Se connecter avec Google" sending={sending} setSending={setSending} />
			<TouchableOpacity
				onPress={() => navigation.navigate("SignUp")}
			>
				<Text style={{ textAlign: "center", fontSize: 15, color:colors.text }}>
					Pas de compte?{" "}
					<Text style={{ textDecorationLine: "underline", fontWeight: 500 }}>
						Inscrivez vous!
					</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignIn;
