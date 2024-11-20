/** @format */

/**
 * Composant OperationLogo - Affiche le logo de l'application avec un titre optionnel
 * 
 * Ce composant réutilisable permet d'afficher le logo de l'application centré,
 * avec la possibilité d'ajouter un titre en dessous. Il est utilisé sur différents
 * écrans nécessitant une identification visuelle de l'application.
 */

import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";

/**
 * Interface définissant les props du composant
 * @param title - Texte optionnel à afficher sous le logo
 */
interface OperationLogoProps {
  title?: string;
}

/**
 * Affiche le logo de l'application de manière centrée avec un titre optionnel
 * Le logo maintient un ratio carré et s'adapte à différentes tailles d'écran
 */
const OperationLogo: React.FC<OperationLogoProps> = ({ title }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", marginBottom: ms(20) }}>
      {/* Logo de l'application avec ratio 1:1 */}
      <Image
        source={require("../../assets/logo-withoutName.png")}
        style={{ width: ms(70), height: undefined, aspectRatio: 1 }}
      />
      {/* Affiche le titre si fourni */}
      {title && (<Text style={styles.title}>{title}</Text>)}
    </View>
  );
};

export default OperationLogo;

/**
 * Styles du composant
 * Définit l'apparence du titre sous le logo
 */
const styles = StyleSheet.create({
  title: {
    fontSize: ms(20),
    marginBottom: ms(5),
    fontFamily: "Inter-Bold",
    textDecorationLine: "underline",
    color: colors.textColor,
  },
});
