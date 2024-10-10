import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const InicioAppMedica = () => {
  // Lista de URLs de imágenes de la galería
  const navigation = useNavigation();
  const imagenes = [
    {
      id: '1',
      uri: 'https://images.all-free-download.com/images/thumbjpg/banner_donate_blood_and_save_lives_template_elegant_doctor_sketch_modern_realistic_design_6925045.jpg',
    },
    {
      id: '3',
      uri: 'https://previews.123rf.com/images/watcartoon/watcartoon1711/watcartoon171100033/90465235-presentaci%C3%B3n-del-doctor-para-banner-plantilla-de-dise%C3%B1o-cubierta-anuncio-cartel.jpg',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={estilos.itemImagen}>
      <Image source={{ uri: item.uri }} style={estilos.imagenDoctor} />
    </View>
  );

  return (
    <ScrollView style={estilos.contenedor}>
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>Ubicación</Text>
        <View style={estilos.ubicacionContenedor}>
          <FontAwesome5 name='map-marker-alt' size={20} color='black' style={estilos.iconoUbicacion} />
          <Text style={estilos.ubicacion}>Medellín, COL</Text>
        </View>
        <View style={estilos.barraBusquedaContenedor}>
          <TextInput
            style={estilos.barraBusqueda}
            placeholder='Buscar doctor...'
            placeholderTextColor='rgba(0, 0, 0, 0.6)'
          />
          <FontAwesome name='search' size={20} color='black' style={estilos.iconoBusqueda} />
        </View>
      </View>

      {/* Banner con las imágenes usando FlatList */}
      <View style={estilos.banner}>
        <FlatList
          data={imagenes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={estilos.galeriaContenedor}
        />
      </View>

      {/* Categorías */}
      <View style={estilos.categorias}>
        <TouchableOpacity style={estilos.elementoCategoria}>
          <Text>Odontología</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.elementoCategoria}>
          <Text>Cardiología</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('All Doctor')} style={estilos.elementoCategoria}>
          <Text>Ver Todos</Text>
        </TouchableOpacity>
      </View>

      {/* Centros Médicos Cercanos */}
      <View style={estilos.centrosMedicos}>
        <Text>Centros Médicos Cercanos</Text>
        <ScrollView horizontal>
          <View style={estilos.elementoCentro}>
            <Image source={{ uri: 'https://via.placeholder.com/100x100' }} style={estilos.imagenCentro} />
            <Text>Clínica Salud Amanecer</Text>
          </View>
          <View style={estilos.elementoCentro}>
            <Image source={{ uri: 'https://via.placeholder.com/100x100' }} style={estilos.imagenCentro} />
            <Text>Cardiología Dorada</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  encabezado: {
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  titulo: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 'normal',
    marginHorizontal: 10,
  },
  ubicacionContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconoUbicacion: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  ubicacion: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  barraBusquedaContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  barraBusqueda: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 8,
    flex: 1,
    fontSize: 16,
  },
  iconoBusqueda: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  banner: {
    marginTop: 20,
    backgroundColor: '#f0f0f0', // Fondo del banner
    padding: 0,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200, // Limita la altura del banner
  },
  galeriaContenedor: {
    flexDirection: 'row',
    width: '100%', // Asegura que ocupe todo el ancho
  },
  itemImagen: {
    width: width, // La imagen ocupa todo el ancho de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagenDoctor: {
    width: '100%', // La imagen ocupa todo el ancho del banner
    height: 200, // Ajusta la altura para que ocupe el espacio completo del banner
    resizeMode: 'cover', // Hace que la imagen se ajuste correctamente al tamaño del contenedor
  },
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  elementoCategoria: {
    backgroundColor: '#e6f5f9',
    padding: 15,
    borderRadius: 10,
  },
  centrosMedicos: {
    marginTop: 20,
  },
  elementoCentro: {
    marginRight: 10,
    alignItems: 'center',
  },
  imagenCentro: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default InicioAppMedica;
