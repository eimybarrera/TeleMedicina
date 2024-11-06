import React, { createContext, useState, useContext } from 'react';

// Contexto
const FavoritesContext = createContext();

// Hook personalizado 
export const useFavorites = () => useContext(FavoritesContext);

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {
const [favorites, setFavorites] = useState([]);

  // Función para agregar o quitar favoritos
const toggleFavorite = (doctor) => {
    console.log("Toggle favorite:", doctor);
    setFavorites((prevFavorites) => {
    if (prevFavorites.some((fav) => fav.id === doctor.id)) {
        // Si ya está en favoritos, lo quitamos
        return prevFavorites.filter((fav) => fav.id !== doctor.id);
    } else {
        // Si no está, lo agregamos
        return [...prevFavorites, doctor];
    }
    });
};

return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
    {children}
    </FavoritesContext.Provider>
);
};
