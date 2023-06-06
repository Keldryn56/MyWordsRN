import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";
import { loginStyle as styles } from "../../styles/login";

export default UserData = (props) => {

    const colors = useTheme().colors

    return (
        <View style={styles.fields}>
            <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, {color: colors.text}]}>Nom d'utilisateur</Text>
                <CustomTextInput
                    error={props.errorUserName}
                    placeholder="Pseudo"
                    autoComplete="username"
                    value={props.userName}
                    onChangeText={props.setUserName}
                />
                {props.errorUserName && (
                    <Text style={styles.errorLabel}>
                        Le pseudo ne doit pas être vide
                    </Text>
                )}
            </View>
        </View>
    )
}