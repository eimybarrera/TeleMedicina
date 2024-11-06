import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const FavoritesContext = createContext();

// Hook personalizado 
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children, userId }) => {
    const [favorites, setFavorites] = useState([]);

    // Obtener favoritos al iniciar la aplicación
    useEffect(() => {
        if (userId) {
            axios.get(`http: del back/${userId}`)
                .then(response => {
                    setFavorites(response.data);
                })
                .catch(error => {
                    console.error("Error al obtener favoritos:", error);
                });
        }
    }, [userId]);

    // Función para agregar o quitar favoritos
    const toggleFavorite = (doctor) => {
        axios.post(`http:del back/toggle`, {
            id_paciente: userId,
            id_doctor: doctor.id
        })
        .then(() => {
            setFavorites((prevFavorites) => {
                if (prevFavorites.some((fav) => fav.id_doctor === doctor.id)) {
                    // Si ya está en favoritos, lo quitamos
                    return prevFavorites.filter((fav) => fav.id_doctor !== doctor.id);
                } else {
                    // Si no está, lo agregamos
                    return [...prevFavorites, doctor];
                }
            });
        })
        .catch(error => {
            console.error("Error al modificar favoritos:", error);
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
