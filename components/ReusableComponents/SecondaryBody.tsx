/** @format */

import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import { colors } from "../../globals/colors";
import { ms } from "react-native-size-matters";

/**
 * Interface définissant les props du composant SecondaryBody
 * @param children - Éléments React enfants à afficher dans le corps secondaire
 * @param step - Étape actuelle dans une séquence (optionnel)
 * @param totalStep - Nombre total d'étapes dans la séquence (optionnel)
 */
interface SecondaryBodyProps {
  children: ReactElement | ReactElement[];
  step?: number;
  totalStep?: number;
}

/**
 * Composant qui affiche un conteneur secondaire avec une barre de progression optionnelle
 * Utilisé pour encapsuler du contenu avec un style cohérent et potentiellement montrer la progression
 */
const SecondaryBody: React.FC<SecondaryBodyProps> = ({
  children,
  step,
  totalStep,
}) => {
  const { width } = Dimensions.get("window");

  /**
   * Calcule la largeur de la barre de progression en fonction de l'étape actuelle
   * @returns {number} Largeur calculée de la barre de progression
   */
  const getWidthElement = (): number => {
    if (step && totalStep && totalStep > 0) {
      return (width - ms(30)) * (step / totalStep);
    }
    return 0;
  };

  return (
    <View style={[styles.secondaryBody, step ? styles.secondaryBodyRadiusIfStep : { borderRadius: ms(8) }]}>
      {/* Affiche la barre de progression si step et totalStep sont définis */}
      {step && totalStep && (
        <View style={[styles.step, { width: getWidthElement() }]} />
      )}

      {children}
    </View>
  );
};

export default SecondaryBody;

/**
 * Styles du composant
 * Définit l'apparence du conteneur secondaire et de la barre de progression
 */
const styles = StyleSheet.create({
  secondaryBody: {
    backgroundColor: colors.secondary,
    paddingVertical: ms(20),
    paddingHorizontal: ms(15),
    width: "100%",
  },
  secondaryBodyRadiusIfStep: {
    borderBottomLeftRadius: ms(8),
    borderBottomRightRadius: ms(8),
    paddingVertical: ms(27),
  },
  step: {
    backgroundColor: colors.tertiary,
    height: ms(7),
    position: "absolute",
    top: ms(0),
    left: ms(0),
  },
});
