import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, KeyboardTypeOptions } from "react-native";

type Props = {
    type?: "text" | "email" | "password" | "number";
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
}

export default function CustomInput ({type = "text", placeholder, value, onChange}: Props){
    const [isSecureText, setIsSecureText] = useState(type === 'password');
    const isPasswordField = type === 'password'; 

    const icon : typeof MaterialIcons["name"] | undefined = 
        type === "email" ? 'alternate-email' : 
            type === "password" ? 'lock' : undefined
    const keyboardType: KeyboardTypeOptions = 
        type === "email"? 'email-address' :
            type === "number" ? 'phone-pad':
                'default';
    
    const getError = () => {
        if (type === 'email' && !value.includes('@')) return 'Correo invalido';
        if (type === 'password' && value.length < 4) return 'La contraseña es muy debil';
        if (type === 'number' && (value.length != 8 || value.includes('-'))) return 'Numero de telefono invalido';
    }
    const error = getError();

    return(
        //wrapper
         <View style={styles.wrapper}>
            <View style={[styles.inputContainer, error && styles.inputError]}>
                <MaterialIcons name={icon as any} size={22} color ="#000000"/>
                <TextInput 
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    secureTextEntry={isSecureText}
                    keyboardType={keyboardType}
                />
              { isPasswordField && <TouchableOpacity
                onPress={
                    ()=>{
                        setIsSecureText(!isSecureText)
                    }
                }
                >
                    <Ionicons name={isSecureText ? "eye" : "eye-off"} size={22} />
                </TouchableOpacity>}
            </View>
            {
            error && 
                <Text style ={styles.inputError} > {error} </Text>
            }
         </View>

    );
}


const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    inputContainer: {
        //distribucion de componentes
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,

        //estilizacion de input
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 9,
        backgroundColor: "#f0f0f0",
        paddingLeft: 20,

    },
    input: {
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 10,
      
    },
    inputError :{
        color:'red',
        borderColor: 'red',
    }
})