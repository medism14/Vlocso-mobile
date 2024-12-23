/** @format */

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import { setUserLogin } from "../redux/features/authSlice";

/**
 * Fonction pour obtenir l'URL de l'API
 * Retourne l'URL définie dans les variables d'environnement ou une URL par défaut.
 */
const getApiUrl = () => {
  return process.env.API_URL;
};

/**
 * Fonction pour déconnecter l'utilisateur
 * Cette fonction supprime le token d'accès et le refresh token du stockage,
 * et envoie une requête de déconnexion au serveur si un refresh token est présent.
 */
const deconnectUser = async () => {
  try {
    // Récupération du refresh token depuis le stockage asynchrone
    const refreshToken = await AsyncStorage.getItem("@refreshToken");

    // Vérification de l'existence du refresh token pour procéder à la déconnexion côté serveur
    if (refreshToken) {
      // Création d'une instance Axios pour la requête de déconnexion
      const axiosInstance = axios.create({
        baseURL: getApiUrl(),
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Envoi de la requête de déconnexion avec le refresh token
      await axiosInstance.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    // Gestion des erreurs lors de la récupération du refresh token
  } finally {
    // Suppression des tokens d'accès et de rafraîchissement du stockage
    await AsyncStorage.multiRemove(["@accessToken", "@refreshToken"]);
    // Mise à jour de l'état de l'utilisateur dans le store Redux
    store.dispatch(setUserLogin(null));
  }
};

/**
 * Instance Axios configurée que pour la connexion
 * - URL de base de l'API
 * - Timeout de 10 secondes
 * - Headers par défaut
 */
const apiUserCheck = axios.create({
  baseURL: getApiUrl(),
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Intercepteur pour les requêtes
 * Ajoute le token d'accès dans l'en-tête Authorization si disponible
 */
apiUserCheck.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("@accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Erreur dans l'intercepteur de requête:", error);
    return Promise.reject(error);
  }
);

/**
 * Intercepteur pour les réponses
 * Gère le rafraîchissement automatique du token en cas d'expiration
 * Déconnecte l'utilisateur si le rafraîchissement échoue
 */
apiUserCheck.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Vérifie si l'erreur est due à un token manquant ou invalide
    if (
      error.response?.status === 401 &&
      (error.response?.data?.message ===
        "Missing or invalid Authorization header" ||
        error.response?.data?.message === "Unauthorized: Invalid JWT token") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Récupère le refresh token depuis le stockage asynchrone
        const refreshToken = await AsyncStorage.getItem("@refreshToken");

        // Si aucun refresh token n'est trouvé, déconnecte l'utilisateur
        if (!refreshToken) {
          await deconnectUser();
          return Promise.reject(error);
        }

        // Tente d'obtenir un nouveau token d'accès
        const response = await apiUserCheck.post(
          `/auth/refresh/${refreshToken}`
        );
        const newAccessToken = await response.data.data;

        // Si un nouveau token d'accès est obtenu, le stocke et met à jour l'en-tête de la requête originale
        if (newAccessToken) {
          await AsyncStorage.setItem("@accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiUserCheck(originalRequest);
        }
      } catch (refreshError) {
        // En cas d'erreur lors du rafraîchissement, déconnecte l'utilisateur
        await deconnectUser();
        return Promise.reject(refreshError);
      }
    }

    // Si l'erreur 401 persiste, déconnecte l'utilisateur
    if (error.response?.status === 401) {
      await deconnectUser();
    }

    return Promise.reject(error);
  }
);

export default apiUserCheck;
