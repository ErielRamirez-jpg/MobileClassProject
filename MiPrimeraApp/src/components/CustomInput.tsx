import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";


type Props = {
    type: "text"|"email"|"password"|"number";
    placeholder: string;
    value: string;
    //funcion que recibe datos (cadena)
    onChange: (text: string) => void;

}

export default function CustomInput({type, placeholder, value, onChange}:Props){

    const [isSecureText, setIsSecureText]= useState(true)

    const icon : typeof MaterialIcons["name"]| undefined =
    type === "email" ? 'alternate-email':
        type === "password"  ? 'lock' : undefined

    return(
        //wrapper
    <View style={styles.wrapper}>
        <View style = {styles.inputContainer}>
            <Ionicons name={icon as any} size={20} color ="#00000"/>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                style={styles.input}
                secureTextEntry={true}

            />
                
            <TouchableOpacity 
            onPress={
                ()=>{
                    setIsSecureText(!isSecureText)
                }
            }>
                <Ionicons name={isSecureText ? "eye" : "eye-off"} size={22}/>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({

    wrapper: {
        marginBottom:10,
    },

    inputContainer: {
        //distribucion de componentes
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        
        //estilizacion de input
        borderColor:'gray',
        borderWidth: 1,
        borderRadius:9,
        backgroundColor:"#f0f0f0",
        paddingLeft: 20,
    },
    input:{
        width:'80%',
        paddingVertical:10,
        paddingHorizontal:10,

    }
})