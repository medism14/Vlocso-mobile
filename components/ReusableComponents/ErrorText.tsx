/** @format */

/**
 * Composant ErrorText - Affiche un message d'erreur stylisé
 * 
 * Ce composant réutilisable permet d'afficher des messages d'erreur
 * avec une mise en forme cohérente dans l'application (couleur rouge, 
 * police spécifique, etc.)
 */

import { StyleSheet, Text } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";

/**
 * Interface définissant les props du composant
 * @param children - Le contenu textuel du message d'erreur
 */
interface ErrorTextProps {
  children: React.ReactNode;
}

/**
 * Affiche un message d'erreur avec le style défini
 */
const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  return (
      <Text style={styles.text}>{children}</Text>
  );
};

export default ErrorText;

/**
 * Styles du composant
 * Définit l'apparence du texte d'erreur avec une couleur rouge,
 * une taille de police adaptative et une police personnalisée
 */
const styles = StyleSheet.create({
  text: {
    marginTop: ms(5),
    fontSize: ms(12),
    color: colors.accentRed,
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },
});
