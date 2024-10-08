import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const InicioAppMedica = () => {
  return (
    <ScrollView style={estilos.contenedor}>
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>Ubicación</Text>
        <View style={estilos.ubicacionContenedor}>
          <FontAwesome5 name='map-marker-alt' size={20} color='black' style={estilos.iconoUbicacion} />
          <Text style={estilos.ubicacion}>Seattle, USA</Text>
        </View>

        {/* Barra de búsqueda */}
        <TextInput style={estilos.barraBusqueda} placeholder='Buscar doctor...' />
      </View>

      {/* Banner */}
      <View style={estilos.banner}>
        <Text style={estilos.textoBanner}>¿Buscas doctores especialistas?</Text>
        <Image source={{ uri: 'https://example.com/doctor-image.jpg' }} style={estilos.imagenDoctor} />
      </View>

      {/* Categorías */}
      <View style={estilos.categorias}>
        <TouchableOpacity style={estilos.elementoCategoria}>
          <Text>Odontología</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.elementoCategoria}>
          <Text>Cardiología</Text>
        </TouchableOpacity>
        {/* Agregar más categorías */}
      </View>

      {/* Centros Médicos Cercanos */}
      <View style={estilos.centrosMedicos}>
        <Text>Centros Médicos Cercanos</Text>
        <ScrollView horizontal>
          <View style={estilos.elementoCentro}>
            <Image source={{ uri: 'https://example.com/clinic-image.jpg' }} style={estilos.imagenCentro} />
            <Text>Clínica Salud Amanecer</Text>
          </View>
          <View style={estilos.elementoCentro}>
            <Image source={{ uri: 'https://example.com/clinic-image2.jpg' }} style={estilos.imagenCentro} />
            <Text>Cardiología Dorada</Text>
          </View>
          {/* Agregar más centros */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

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
  barraBusqueda: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 8,
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  banner: {
    marginTop: 20,
    backgroundColor: '#a0d7f5',
    padding: 20,
    borderRadius: 10,
    position: 'relative',
  },
  textoBanner: {
    fontSize: 20,
    color: '#fff',
  },
  imagenDoctor: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 10,
    right: 10,
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
