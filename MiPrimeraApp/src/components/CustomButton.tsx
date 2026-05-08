import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

//Tipados
type CustomButtonProps = {
    //tipos de datos primitivos
    title: string;
    onPress: () => void;
    //tipo: union de literales
    variant?: "primary" | "secondary" | "tertiary";
}

//funcion base con el import, onPress es un metodo
export default function CustomButton ({title, onPress, variant='primary'}:CustomButtonProps){
    const styles = getStyles(variant);

    return(<TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style = {styles.buttonText}> {title} </Text>
    </TouchableOpacity>);
}

const getStyles = (variant: "primary" | "secondary" | "tertiary") => 
    
    StyleSheet.create({
    button:{
        width:150,
        borderRadius: 6,
        //operador ternario
        backgroundColor: variant === "primary" ? 'navy' : 
        variant === "secondary" ? 'gray' : "#fff",
        padding: 12,
    },

    buttonText:{
        color: variant=== "tertiary" ? 'black':'#fff'
    }
})