/** @format */

/**
 * Composant ButtonWithoutBg - Bouton personnalisable avec fond
 * 
 * Ce composant réutilisable crée un bouton avec bordure colorée et fond,
 * permettant une apparence plus marquée dans l'interface. Il peut inclure du texte
 * et une icône optionnelle.
 */

import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";

/**
 * Interface définissant les props du composant
 * @param onPress - Fonction appelée lors du clic sur le bouton
 * @param color - Couleur de la bordure et du texte
 * @param content - Texte à afficher dans le bouton
 * @param icon - Icône optionnelle à afficher à côté du texte
 * @param backgroundColor - Couleur de fond du bouton
 */
interface ButtonWithoutBgProps {
  onPress: () => void;
  color: string;
  content: string;
  icon?: string;
  backgroundColor?: string;
}

/**
 * Crée un bouton avec fond et bordure colorée
 * Le bouton s'adapte à son contenu et peut inclure une icône
 */
const ButtonWithoutBg: React.FC<ButtonWithoutBgProps> = ({
  onPress,
  color,
  content,
  icon,
  backgroundColor = "#FFFFFF",
}) => {
  return (
    <Pressable
      style={[styles.container, { borderColor: color, backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.contentText, { color: color }]}>{content}</Text>
      {icon && icon}
    </Pressable>
  );
};

export default ButtonWithoutBg;

/**
 * Styles du composant
 * Définit l'apparence et la mise en page du bouton et de son contenu
 */
const styles = StyleSheet.create({
  container: {
    paddingVertical: ms(9),
    paddingHorizontal: ms(18),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: ms(5),
    borderWidth: ms(2),
    borderRadius: ms(10),
  },
  contentText: {
    fontFamily: "Inter-SemiBold",
    fontSize: ms(13),
    color: colors.textColor,
  },
});
