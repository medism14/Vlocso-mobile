/** @format */

/**
 * Composant SuccessText - Affiche un message de succès stylisé
 * 
 * Ce composant réutilisable permet d'afficher des messages de confirmation
 * ou de succès avec une mise en forme cohérente dans l'application.
 * 
 * @param {ReactNode} children - Le contenu textuel à afficher
 */

import { StyleSheet, Text } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";

const SuccessText = ({ children }: any) => {
  return (
      <Text style={styles.text}>{children}</Text>
  );
};

export default SuccessText;

// Styles du composant
const styles = StyleSheet.create({
  text: {
    marginTop: ms(5), // Espacement par rapport à l'élément au-dessus
    fontSize: ms(12), // Taille de police responsive avec react-native-size-matters
    color: colors.accentGreen, // Couleur verte pour indiquer le succès
    fontFamily: "Inter-Medium", // Police personnalisée pour la cohérence visuelle
    textAlign: "center",
  },
});
