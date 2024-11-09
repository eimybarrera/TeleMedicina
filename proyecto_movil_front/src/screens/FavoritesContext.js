import React, { createContext, useState, useContext, useEffect } from 'react';  

// Contexto  
const FavoritesContext = createContext();  

// Hook personalizado   
export const useFavorites = () => useContext(FavoritesContext);  

// Proveedor del contexto  
export const FavoritesProvider = ({ children }) => {  
    const [favorites, setFavorites] = useState(() => {  
        // Leer los favoritos iniciales desde localStorage  
        const savedFavorites = localStorage.getItem('favorites');  
        return savedFavorites ? JSON.parse(savedFavorites) : [];  
    });  

    // Efecto para guardar los favoritos en localStorage cada vez que cambian  
    useEffect(() => {  
        localStorage.setItem('favorites', JSON.stringify(favorites));  
    }, [favorites]);  

    // Función para agregar o quitar favoritos  
    const toggleFavorite = (doctor) => {  
        setFavorites((prevFavorites) => {  
            if (prevFavorites.some((fav) => fav.id === doctor.id)) {  
                return prevFavorites.filter((fav) => fav.id !== doctor.id);  
            } else {  
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