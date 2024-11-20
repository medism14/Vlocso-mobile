/** @format */

/**
 * Composant StateButtonWithTitle - Affiche un bouton avec un titre personnalisé
 * 
 * Ce composant combine un titre et un StateButton pour créer un élément d'interface
 * utilisateur cohérent. Il est utilisé pour les actions qui nécessitent une
 * description claire de leur fonction.
 */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import StateButton from "./StateButton";
import { colors } from "../../../globals/colors";

/**
 * Interface définissant les props du composant
 * @property {string} title - Le texte à afficher comme titre du bouton
 * @property {boolean} disabled - État désactivé du bouton (optionnel)
 * @property {string} color - Couleur du titre et du bouton
 * @property {any} marginTop - Marge supérieure du conteneur (optionnel)
 * @property {Function} onPress - Fonction appelée lors du clic sur le bouton
 */
interface StateButtonWithTitleProps {
  title: string;
  disabled?: boolean;
  color: string;
  marginTop?: any;
  onPress: () => void,
}

/**
 * Composant qui affiche un titre suivi d'un bouton d'état personnalisable
 * Utilise le composant StateButton pour la partie interactive
 */
const StateButtonWithTitle: React.FC<StateButtonWithTitleProps> = ({
  title,
  disabled = false,
  color,
  marginTop = ms(15),
  onPress,
}) => {
  return (
    <View style={[styles.container, { marginTop: marginTop }]}>
      <Text style={[styles.title, { color: color }]}>{title}:</Text>
      <StateButton
        color={color}
        fontSize={ms(13)}
        paddingVertical={ms(6)}
        paddingHorizontal={ms(35)}
        marginLeft={ms(10)}
        marginTop={ms(0)}
        disabled={disabled}
        onPress={onPress}
      />
    </View>
  );
};

export default StateButtonWithTitle;

/**
 * Styles du composant
 * Définit l'espacement entre les éléments et la mise en forme du titre
 */
const styles = StyleSheet.create({
  container: {
    gap: ms(7), // Espacement vertical entre le titre et le bouton
  },
  title: {
    fontSize: ms(15),
    fontFamily: "Inter-SemiBold",
    color: colors.textColor,
  },
});
