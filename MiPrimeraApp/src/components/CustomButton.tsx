import { Text, TouchableOpacity, StyleSheet } from "react-native";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    //tipo: union de literales 
    variant?: "primary" | "secondary" | "tertiary";
    //tipo: literal
    //variant: "primary"
};

export default function CustomButton({title, onPress, variant='primary'}: CustomButtonProps) {
  const styles = getStyles(variant);
    return (
  <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText} > {title} </Text>
  </TouchableOpacity>);
}

const getStyles = (variant: "primary" | "secondary" | "tertiary") =>
    StyleSheet.create({
    button:{
        borderRadius: 6,
        //operador ternario
        backgroundColor: variant === "primary" ? 'navy' : 
                            variant === "secondary" ? 'gray' : 
                            "#fff ",
        padding:12,
        width: 150,
    },
    buttonText:{
        color: variant === "tertiary" ? "#0000" : "#fff"
    }
})