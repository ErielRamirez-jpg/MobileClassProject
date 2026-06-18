import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../services/supabaseClient";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ProductCard from "../components/ProductCard";
import ScreenWrapper from "../components/ScreenWrapper";
import SectionTitle from "../components/SectionTitle";
import TagChip from "../components/TagChip";
import { useTheme } from "../contexts/ThemeContext";
import { RootStackParamList } from "../navigation/StackNavigator";
import { TabsParamList } from "../navigation/TabsNavigator";
import { ProductCategory, PRODUCT_CATEGORIES, CATEGORY_LABELS } from "../utils/types/Skincare";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addProductFromDatabase } from "../store/slices/skincareSlice";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, "Products">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ProductsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.skincare.products);
  const { colors } = useTheme();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<ProductCategory>("cleanser");

  const handleAddProduct = async () => {
    if (!name.trim() || !brand.trim()) return;

    // Cambiado de "products" a "Productos" para coincidir con tu base de datos
    const { data, error } = await supabase
      .from("Productos")
      .insert([{ name: name.trim(), brand: brand.trim(), category }])
      .select();

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    if (data && data[0]) {
      dispatch(addProductFromDatabase({
        id: data[0].id,
        name: name.trim(),
        brand: brand.trim(),
        category
      }));
    }

    setName("");
    setBrand("");
    setCategory("cleanser");
    setShowForm(false);
  };

  return (
    <ScreenWrapper>
      <SectionTitle title="Mis Productos" subtitle="Registra los productos de tu rutina" />
      <CustomButton
        title={showForm ? "Cancelar" : "Agregar producto"}
        onPress={() => setShowForm(!showForm)}
        variant={showForm ? "secondary" : "primary"}
      />
      {showForm && (
        <View style={[styles.form, { backgroundColor: colors.inputBackground }]}>
          <CustomInput placeholder="Nombre" value={name} onChange={setName} />
          <CustomInput placeholder="Marca" value={brand} onChange={setBrand} />
          <View style={styles.categoryRow}>
            {PRODUCT_CATEGORIES.map((cat) => (
              <TagChip key={cat} label={CATEGORY_LABELS[cat]} selected={category === cat} onPress={() => setCategory(cat)} />
            ))}
          </View>
          <CustomButton title="Guardar producto" onPress={handleAddProduct} />
        </View>
      )}
      <SectionTitle title={`Productos (${products.length})`} />
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onPress={() => navigation.navigate("ProductDetail", { productId: p.id })} />
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  form: { borderRadius: 9, borderWidth: 1, borderColor: "gray", padding: 14, marginTop: 12 },
  categoryRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
});