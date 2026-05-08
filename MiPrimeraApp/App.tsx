import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';
import CustomInput from './src/components/CustomInput';
import { useState } from 'react';

export default function App() {
  //definicion d e una variable de estado en ReactNative
  const [inpuText, setInputText] = useState("");
  return (
    <View style={styles.container}>
      <Text>Programacion movil</Text>
      <StatusBar style="auto" />

      <CustomInput type={'number'}
       placeholder={''} 
       value={inpuText} 
       onChange={setInputText }/>

      <CustomButton 
      title={"Primary button"} 
      onPress={()=>{console.log("Press desde boton app")}} 
      variant='primary'/>

      <CustomButton 
      title={"Secondary Button"} 
      onPress={()=>{console.log("Press desde boton app 2")}} 
      variant='secondary'/>

      <CustomButton 
      title={"Tertiary Button"} 
      onPress={()=>{console.log("Press desde boton app 3")}} 
      variant='tertiary'/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
