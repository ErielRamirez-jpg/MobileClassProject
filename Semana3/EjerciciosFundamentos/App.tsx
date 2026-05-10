import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

//Arreglo
const productos = [
  {id:1, nombre:'Laptop Acer', precio:1200},
  {id:2, nombre:'PS2', precio:100},
  {id:3, nombre:'Mouse', precio:30}
]

export default function App() {

  const nombre = (nombrePersona :string) => {
    return `Bienvenido ${nombrePersona} (delete: System32)`;
  }

  const [name, setName] = useState("");
  const [edad, setEdad] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/*Ejercicio 1*/}
      <View style={styles.listaContainer}>
        <Text style={styles.tituloLista}>Nombre:</Text>
      <TextInput style={styles.inputCustom}
        placeholder="Escribe tu nombre aquí"
        value={name}
        onChangeText={setName}
      />
      
      {name === "" ? null : 
      <Text style={styles.textCustom}>{nombre(name)}</Text>
        }
      </View>

      
        {/*Ejercicio 2*/}
      <View style={styles.listaContainer}>
        <Text style={styles.tituloLista}>Edad:</Text>
        <TextInput style = {styles.inputCustom} placeholder="Ingresa tu edad aqui" 
        value={edad.toString()} 
        onChangeText={(texto) => setEdad(Number(texto))}
        />

        {edad >= 21 ? <Text style={styles.textCustom}>Mayor de edad</Text> :
          edad >0 && edad<21 ? <Text style={styles.textCustom}>Menor de edad</Text> :
          <Text></Text>

        }
      </View>
      
        {/*Ejercicio 3*/}
      <View style={styles.listaContainer}>
        <Text style={styles.tituloLista}>Productos:</Text>
        {productos.map((producto) => (
          <View key={producto.id} style={styles.productoItem}>
            <Text style={styles.textProducto}>
               {producto.nombre} - <Text>${producto.precio}</Text>
            </Text>
          </View>

        ))}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical:50,
  },

  listaContainer: {
    width: '85%',
  },

  inputCustom: {
    borderWidth: 1,
    borderRadius: 7,
    width: '90%',
    borderColor: 'grey',
    fontSize: 20,
    backgroundColor: '#f8f9fa',

  },

  textCustom: {
    fontSize: 18,
    color: '#555',
  },

  tituloLista: {
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomColor: '#eee',
    marginTop:90
  },
  
  productoItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop:7
  },

  textProducto: {
    fontSize: 16,
    color: '#333',
  }
});
