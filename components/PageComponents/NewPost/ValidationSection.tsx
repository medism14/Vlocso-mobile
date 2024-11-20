/** @format */

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../../globals/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import globalStyles from "../../../globals/globalStyles";

/**
 * Props d'interface pour le composant ValidationSection
 * @property {Function} onPress - Fonction callback appelée lors du clic sur les boutons
 */
interface ValidationSectionProps {
  onBackHome: () => void;
  onLookAnnonce: () => void;
}

/**
 * Composant affichant une section de validation après la création réussie d'une annonce
 * Inclut un message de confirmation, une image de validation et deux boutons d'action
 */
const ValidationSection: React.FC<ValidationSectionProps> = ({ onBackHome, onLookAnnonce }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre annonce a été créé avec succès</Text>

      {/* Image de confirmation */}
      <Image
        source={require("../../../assets/check.png")}
        style={styles.checkImageStyle}
        resizeMode="contain"
      />

      {/* Bouton de retour à la page d'accueil */}
      <Pressable style={({pressed}) => [styles.styleButton, pressed && globalStyles.buttonAnimation]} onPress={onBackHome}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={ms(14)}
          color={colors.accentTertiary}
        />
        <Text
          style={{
            fontFamily: "Inter-Medium",
            fontSize: ms(14),
            color: colors.accentTertiary,
          }}
        >
          Revenir à la page d'accueil
        </Text>
      </Pressable>

      {/* Bouton pour visualiser l'annonce créée */}
      <Pressable style={({pressed}) => [styles.styleButton, pressed && globalStyles.buttonAnimation]} onPress={onLookAnnonce}>
        <FontAwesomeIcon
          icon={faEye}
          size={ms(14)}
          color={colors.accentTertiary}
        />
        <Text
          style={{
            fontFamily: "Inter-Medium",
            fontSize: ms(14),
            color: colors.accentTertiary,
          }}
        >
          Voir l'annonce
        </Text>
      </Pressable>
    </View>
  );
};

export default ValidationSection;

/**
 * Styles du composant
 * Utilise react-native-size-matters (ms) pour la mise à l'échelle responsive
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter-ExtraBold",
    fontSize: ms(18),
    textAlign: "center",
    color: colors.accentGreen,
    marginTop: ms(20),
  },
  checkImageStyle: {
    width: ms(300),
    height: ms(200),
    alignSelf: "center",
    marginTop: ms(15),
    marginBottom: ms(35),
  },
  // Style commun pour les boutons d'action
  styleButton: {
    marginTop: ms(15),
    paddingVertical: ms(7),
    paddingHorizontal: ms(14),
    alignSelf: "center",
    borderColor: colors.accentTertiary,
    borderWidth: ms(2),
    borderRadius: ms(10),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(5),
  },
});
