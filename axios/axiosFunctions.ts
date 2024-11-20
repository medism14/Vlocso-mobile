/** @format */

// Importation des modules nécessaires
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import axios from "axios";
import { setUserLogin } from "../redux/features/authSlice";

/**
 * Fonction pour obtenir l'URL de l'API
 * Retourne l'URL définie dans les variables d'environnement ou une URL par défaut.
 */
export const getApiUrl = () => {
  return process.env.API_URL || "http://localhost:8080"; // URL par défaut si aucune variable d'environnement n'est définie
};

/**
 * Fonction pour déconnecter l'utilisateur
 * Cette fonction supprime le token d'accès et le refresh token du stockage,
 * et envoie une requête de déconnexion au serveur si un refresh token est présent.
 */
export const deconnectUser = async () => {
  try {
    // Récupération de l'utilisateur actuellement connecté depuis le store Redux
    const user = store.getState().auth.userLogin;

    // Récupération du refresh token depuis le stockage asynchrone
    const refreshToken = await AsyncStorage.getItem("@refreshToken");

    // Suppression des tokens d'accès et de rafraîchissement du stockage asynchrone
    await AsyncStorage.multiRemove(["@accessToken", "@refreshToken"]);

    // Si un refresh token est trouvé, procéder à la déconnexion
    if (refreshToken) {
      // Création d'une instance Axios sans intercepteurs pour effectuer la requête de déconnexion
      const axiosInstance = axios.create({
        baseURL: getApiUrl(), // URL de base de l'API
        timeout: 10000, // Délai d'attente de 10 secondes
        headers: {
          "Content-Type": "application/json", // Type de contenu de la requête
        },
      });

      // Envoi de la requête de déconnexion avec le refresh token
      await axiosInstance.post("/auth/logout", { refreshToken });
    }

    // Si un utilisateur est connecté, mettre à jour l'état de l'utilisateur dans Redux
    if (user) {
      store.dispatch(setUserLogin(null)); // Déconnexion de l'utilisateur
    }
  } catch (error) {
    // Gestion des erreurs lors de la déconnexion
    console.error("Erreur lors de la déconnexion:", error);
  }
};
