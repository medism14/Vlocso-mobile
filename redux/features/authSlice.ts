// Import de Redux Toolkit pour la gestion d'état
import { createSlice } from "@reduxjs/toolkit";

// État initial de l'authentification
// userProvider: fournisseur d'authentification (ex: Google, Facebook)
// userLogin: informations de connexion de l'utilisateur
const initialState = {
    userProvider: null,
    userLogin: null,
};

// Création du slice d'authentification avec ses reducers
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Met à jour les informations de connexion de l'utilisateur
        setUserLogin: (state, action) => {
            state.userLogin = action.payload;
        },
        // Définit le fournisseur d'authentification utilisé
        setUserProvider: (state, action) => {
            state.userProvider = action.payload;
        },
        // Réinitialise le fournisseur d'authentification à null
        // Utile lors de la déconnexion ou du changement de méthode d'authentification
        setReinitialiseUserProvider: (state) => {
            state.userProvider = null;
        },
    }
});

// Export des actions pour être utilisées dans l'application
export const { setUserLogin, setUserProvider, setReinitialiseUserProvider } = authSlice.actions; 
// Export du reducer pour le store Redux
export default authSlice.reducer;
