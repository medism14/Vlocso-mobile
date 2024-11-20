/** @format */

import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";

/**
 * Interface définissant les propriétés du composant StateButton
 * Permet une personnalisation complète du style et du comportement du bouton
 */
interface StateButtonProps {
  color: string;          // Couleur principale du bouton (bordure et texte)
  content?: string;       // Texte affiché dans le bouton
  icon?: any;            // Icône optionnelle à afficher
  fontSize: any;         // Taille de la police
  paddingVertical: any;  // Espacement vertical interne
  paddingHorizontal: any;// Espacement horizontal interne
  marginLeft?: any;      // Marge gauche
  disabled?: boolean;    // État désactivé du bouton
  marginTop?: any;       // Marge supérieure
  borderRadius?: any;    // Rayon de la bordure
  alignSelf?: any;       // Alignement du bouton
  fontFamily?: any;      // Police de caractères
  width?: any;          // Largeur du bouton ('normal' ou 'full')
  onPress: () => void;   // Fonction appelée lors du clic
}

/**
 * Composant StateButton - Bouton personnalisable avec bordure et style configurable
 * Utilisé pour les actions principales dans l'interface
 */
const StateButton: React.FC<StateButtonProps> = ({
  color,
  content = "Cliquez ici",
  icon,
  fontSize,
  paddingVertical,
  paddingHorizontal,
  marginLeft = ms(0),
  disabled = false,
  marginTop = ms(15),
  borderRadius = ms(10),
  alignSelf = "flex-start",
  fontFamily = "Inter-SemiBold",
  width = "normal",
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[{
        // Styles principaux du bouton
        borderColor: color,
        borderWidth: ms(2),
        marginLeft: marginLeft,
        alignSelf: alignSelf,
        borderRadius: borderRadius,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        flexDirection: "row",
        gap: ms(5),
        marginTop: marginTop,
        alignItems: "center",
        justifyContent: "center",
      }, 
      // Ajustement conditionnel de la largeur
      width == "full" ? { width: "100%" }: {} ]}
    >
      {/* Texte du bouton avec style personnalisé */}
      <Text
        style={{
          fontSize: fontSize,
          color: color,
          fontFamily: fontFamily,
        }}
      >
        {content}
      </Text>
      {/* Affichage conditionnel de l'icône */}
      {icon && icon}
    </Pressable>
  );
};

export default StateButton;

// Styles supplémentaires si nécessaire
const styles = StyleSheet.create({});
