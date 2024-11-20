/**
 * Composant ProviderAuth - Gère l'authentification via des fournisseurs tiers (Google)
 * 
 * Ce composant implémente l'authentification OAuth avec Google en utilisant expo-auth-session.
 * Il gère le flux complet d'authentification et la récupération des informations utilisateur.
 */

import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { setUserProvider } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";

// Nécessaire pour finaliser le processus d'authentification dans le navigateur
WebBrowser.maybeCompleteAuthSession();

interface ProviderAuthProps {
  source: string, // Identifie la source de l'authentification dans l'application
}

const ProviderAuth: React.FC<ProviderAuthProps> = ({ source }) => {
  const dispatch = useDispatch();

  // Configuration de l'authentification Google avec les identifiants clients
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "217146752812-f826cq3bt93ktlhlu14tdd31fvl1t8f8.apps.googleusercontent.com",
    iosClientId:
      "217146752812-fhj4jvhnks99246mm87mii00j7cmlvvo.apps.googleusercontent.com",
    expoClientId:
      "217146752812-fhj4jvhnks99246mm87mii00j7cmlvvo.apps.googleusercontent.com",
  });
  
  // État pour éviter les doubles soumissions pendant l'authentification
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Surveille la réponse de l'authentification Google
  useEffect(() => {
    if (response) {
      handleSignInWithGoogle();
    }
  }, [response]);

  /**
   * Démarre le processus d'authentification Google
   * Empêche les tentatives multiples simultanées
   */
  const startGoogleAuth = async () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    await promptAsync();
  };

  /**
   * Gère la réponse de l'authentification Google
   * Récupère les informations utilisateur si l'authentification réussit
   */
  const handleSignInWithGoogle = async () => {
    if (response?.type === "success") {
      await getGoogleUserInfo(response.authentication.accessToken);
    }
    setIsAuthenticating(false);
  };

  /**
   * Récupère les informations de l'utilisateur depuis l'API Google
   * et les stocke dans le state Redux
   */
  const getGoogleUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      // Prépare les données utilisateur pour le stockage Redux
      const userProviderForm = {
        email: user.email,
        firstName: user.given_name,
        lastName: user.family_name,
        accountProviderId: user.id,
        urlImageUser: user.picture,
        emailVerified: user.verified_email,
        providerName: "GOOGLE",
        source: source,
      }

      dispatch(setUserProvider(userProviderForm));

    } catch (error) {
      console.error("Erreur rencontrée", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton d'authentification Google */}
      <Pressable
        style={styles.providerButton}
        onPress={startGoogleAuth}
        disabled={isAuthenticating}
      >
        <Image
          source={require("../../assets/google-icon.png")}
          style={styles.providerIcon}
        />
        <Text style={styles.providerText}>Continuer avec Google</Text>
      </Pressable>
    </View>
  );
};

export default ProviderAuth;

// Styles du composant
const styles = StyleSheet.create({
  container: {
    gap: ms(10),
    marginTop: ms(14),
  },
  providerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: ms(7),
    paddingVertical: ms(11),
    width: "100%",
    borderWidth: ms(1),
    gap: ms(8),
    borderColor: colors.textColor,
  },
  providerIcon: {
    width: ms(17),
    height: ms(17),
  },
  providerText: {
    fontSize: ms(12),
    fontFamily: "Inter-Medium",
    color: colors.textColor,
    textAlign: "center",
  },
});