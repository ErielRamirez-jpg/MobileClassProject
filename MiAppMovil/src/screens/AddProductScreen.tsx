import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../services/supabaseClient";
import ScreenWrapper from "../components/ScreenWrapper";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function AddProductScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("otro");

  const handleAddProduct = async () => {
    if (!name || !brand) return Alert.alert("Error", "Llena los campos");

    const { error } = await supabase.from("products").insert([
      { name, brand, category }
    ]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Éxito", "Producto guardado en Supabase");
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper>
      <CustomInput placeholder="Nombre" value={name} onChange={setName} />
      <CustomInput placeholder="Marca" value={brand} onChange={setBrand} />
      <CustomButton title="Guardar Producto" onPress={handleAddProduct} />
    </ScreenWrapper>
  );
}