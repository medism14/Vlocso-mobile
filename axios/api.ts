/**
 * Configuration Axios pour la gestion des requêtes HTTP
 * Inclut la gestion des tokens d'authentification et des intercepteurs
 * @format
 */

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import { setUserLogin } from "../redux/features/authSlice";
import { getBasicUserInfo } from "../utils";
import apiUserCheck from "./apiUserCheck";

/**
 * Fonction pour obtenir l'URL de l'API
 * Retourne l'URL définie dans les variables d'environnement ou une URL par défaut.
 */
const getApiUrl = () => {
  return process.env.API_URL || "http://localhost:8080";
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

    // Si un refresh token est trouvé, procéder à la déconnexion côté serveur
    if (refreshToken) {
      try {
        // Création d'une instance Axios sans intercepteurs
        const axiosInstance = axios.create({
          baseURL: getApiUrl(),
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Envoi de la requête de déconnexion avec le refresh token
        await axiosInstance.post("/auth/logout", { refreshToken });
      } catch (error) {
        console.error("Erreur lors de la déconnexion côté serveur:", error);
        // On continue la déconnexion locale même si la déconnexion serveur échoue
      }
    }

    // Suppression des tokens du stockage local
    await AsyncStorage.multiRemove(["@accessToken", "@refreshToken"]);

    // Mise à jour du state Redux en dernier pour éviter les problèmes de synchronisation
    store.dispatch(setUserLogin(null));
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    // En cas d'erreur, on force quand même la suppression du state
    store.dispatch(setUserLogin(null));
  }
};

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Vérifie si l'utilisateur est connecté via son token
 * Met à jour le state Redux si l'utilisateur est valide
 * Déconnecte l'utilisateur en cas d'erreur
 */
const ifUserConnected = async (accessToken: string) => {
  const user = store.getState().auth.userLogin;

  try {
    if (!user) {
      const response = await apiUserCheck.get(`/users/by-token/${accessToken}`);
      const userInfo = getBasicUserInfo(response.data);
      store.dispatch(setUserLogin(userInfo));
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur:", error);
    await deconnectUser();
  }
};

/**
 * Intercepteur pour les requêtes sortantes
 * Ajoute automatiquement le token d'authentification aux headers
 * Vérifie la validité de la session utilisateur
 */
api.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await AsyncStorage.getItem("@accessToken");
      console.log(getApiUrl());
      if (accessToken) {
        await ifUserConnected(accessToken);
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    } catch (error) {
      console.error("Erreur dans l'intercepteur de requête:", error);
      return Promise.reject(error);
    }
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
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Tentative de rafraîchissement du token si erreur 401
    if (
      error.response?.status === 401 &&
      (error.response?.data?.message ===
        "Missing or invalid Authorization header" ||
        error.response?.data?.message === "Unauthorized: Invalid JWT token") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("@refreshToken");

        if (!refreshToken) {
          await deconnectUser();
          return Promise.reject(error);
        }

        // Obtention et stockage du nouveau token
        const response = await axios.post(
          `${getApiUrl()}/auth/refresh/${refreshToken}`,
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const newAccessToken = response.data.data;

        if (newAccessToken) {
          await AsyncStorage.setItem("@accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        await deconnectUser();
        return Promise.reject(refreshError);
      }
    }

    // Déconnexion si erreur 401 persistante
    if (error.response?.status === 401) {
      await deconnectUser();
    }

    return Promise.reject(error);
  }
);

export default api;
