/** @format */

/**
 * Composant réutilisable pour un bouton de retour en arrière.
 * Utilise react-native-size-matters pour une mise à l'échelle cohérente sur différents appareils.
 */

import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";

/**
 * Interface définissant les props du bouton de retour
 * @property {Function} onPress - Fonction callback appelée lors du clic sur le bouton
 */
interface BackFormButtonProps {
  onPress: () => void;
}

/**
 * Composant de bouton de retour avec style personnalisé
 * Affiche un texte "Retour" dans un conteneur pressable stylisé
 */
const BackFormButton: React.FC<BackFormButtonProps> = ({ onPress }) => {
  return (
    <Pressable style={styles.comeBackForm} onPress={onPress}>
      <Text style={styles.comeBackFormText}>Retour</Text>
    </Pressable>
  );
};

export default BackFormButton;

/**
 * Styles du composant utilisant react-native StyleSheet
 * Les dimensions sont mises à l'échelle avec ms() pour la compatibilité multi-écrans
 */
const styles = StyleSheet.create({
  comeBackForm: {
    borderWidth: ms(1),
    borderColor: colors.tertiary,
    borderRadius: ms(5),
    backgroundColor: colors.primary,
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: ms(30),
    paddingVertical: ms(6),
  },
  comeBackFormText: {
    color: colors.textColor,
    fontSize: ms(14),
    fontFamily: "Inter-Bold",
  },
});
