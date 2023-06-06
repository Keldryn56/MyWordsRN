import db from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import { calculateDiff, containsObject } from "../../utils/dates";
import { useTheme } from "@react-navigation/native";

export default DeckWord = ({route, navigation}) => {

    const userProfile = useSelector((state) => state.user.data);
    const colors = useTheme().colors

    let data = route.params?.data

    const [search, setSearch] = useState("")
    const [item, setItem] = useState(data)  
    const [saving, setSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const [favorites, setFavorites] = useState([])

    const clearSearch = () => setSearch(""); 

    const deckSave = () => {

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

    useEffect(() => {
        if(saving) deckSave()
    }, [saving]);

    useEffect(() => {
        navigation.setOptions({ 
            headerTitle: 'Gérer les mots',
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

    useEffect(() => {
		const q = db()
			.collection("favorites")
			.where("userId", "==", userProfile.uid)
            .orderBy("createdDt", "desc"); 

		const unsubscribe = q.get().then((querySnapshot) => {
			const data = [];
            try{
                querySnapshot.forEach((doc) => {
                    let fav = doc.data()

                    data.push({
                        name: fav.name,
                        phonetic: fav.phonetic, 
                        createdDt: fav.createdDt
                    });
                });
                setFavorites(data);
                setIsLoading(false);
            }catch(e){
                console.log(e)
            }
			
		});
		return () => unsubscribe;
	}, []);

    const addToDeck = (el) => {
        setItem({
            ...item,
            words: [
                ...item.words,
                el
            ]
        })
    }

    const removeFromDeck = (el) => {

        let localWords = [...item.words]

        localWords = localWords.filter(x => {
            return x.name !=  el.name
        })

        setItem({
            ...item,
            words: localWords
        })
    }

    const renderItem = (props) => { 

        return (
            <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center', marginBottom: 10}}>
                {item.words.filter(el => el.name == props.item.name).length == 0 ? (  
                    <TouchableOpacity onPress={() => addToDeck(props.item)}>
                        <Ionicons name="square-outline" size={26} color="tomato" />
                    </TouchableOpacity>
                ) : 
                    <TouchableOpacity onPress={() => removeFromDeck(props.item)}>
                        <Ionicons name="checkbox" size={26} color="tomato" />
                    </TouchableOpacity>
                }
                <View style={{flexGrow: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize: 15, color: colors.text}}>{props.item.name} </Text>
                    {props.item.phonetic && 
                        <Text style={{ fontWeight: "500", color: colors.text}}>
                            ({props.item.phonetic})
                        </Text>
                    }
                </View>
                <Text style={{color: 'gray', fontSize: 13}}>{calculateDiff(props.item.createdDt)}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
           <SearchBar
                value={search}
                onValueChange={setSearch}
                onClear={clearSearch}
            />
            {isLoading ? (
                <View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                >
                    <ActivityIndicator color="tomato" size="large" />
                </View>
            ) : (
                <View style={[styles.container, {backgroundColor: colors.card, borderRadius: 5}]}>
                    <FlatList 
                        data={favorites}
                        renderItem={renderItem}
                    />
                </View>
            )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});