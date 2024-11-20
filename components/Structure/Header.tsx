/** @format */

/**
 * Importation des composants et utilitaires nécessaires
 * - Composants React Native pour l'interface utilisateur
 * - Utilitaires pour la gestion responsive des dimensions
 * - Palette de couleurs globale
 */
import { Image, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../globals/colors";

/**
 * Composant Header
 * Affiche l'en-tête de l'application contenant :
 * - Le logo Vlocso
 * - Une barre de recherche interactive
 */
const Header: React.FC = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo Vlocso avec dimensions responsives */}
      <Image
        source={require("../../assets/vlocso.png")}
        style={{ width: wp("15%"), height: undefined, aspectRatio: 1, marginVertical: ms(15) }}
      />

      {/* Barre de recherche personnalisée */}
      <TextInput
        style={[styles.searchBar]}
        placeholder="Faites votre recherche ici..."
      >
      </TextInput>
    </View>
  );
};

export default Header;

/**
 * Styles du composant
 * searchBar: Style de la barre de recherche avec :
 * - Dimensions responsives (largeur: 80% de l'écran, hauteur: 4.4% de l'écran)
 * - Bordures et coins arrondis
 * - Mise en forme du texte (italique)
 */
const styles = StyleSheet.create({
  searchBar: {
    padding: ms(10),
    borderWidth: ms(1),
    borderColor: "gray",
    backgroundColor: colors.primary,
    width: wp(80),
    height: hp(4.4),
    borderRadius: ms(5),
    fontStyle: "italic",
    fontSize: ms(12),
  },
});
