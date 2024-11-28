/** @format */

/**
 * Importation des composants et utilitaires nécessaires
 * - Composants React Native pour l'interface utilisateur
 * - Utilitaires pour la gestion responsive des dimensions
 * - Palette de couleurs globale
 */
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef } from "react";
import { ms } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../globals/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

/**
 * Composant Header
 * Affiche l'en-tête de l'application contenant :
 * - Le logo Vlocso
 * - Une barre de recherche interactive
 */

interface HeaderProps {
  navigation: any; // Définissez le type approprié pour navigation
}

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  // Utilisez HeaderProps ici

  const textInputRef = useRef<TextInput>(null);

  const handlePress = () => {
    navigation.navigate("SearchStack");
    textInputRef.current?.blur();
  };

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
        style={{
          width: wp("15%"),
          height: undefined,
          aspectRatio: 1,
          marginVertical: ms(15),
        }}
      />

      {/* Barre de recherche personnalisée */}
      <TouchableWithoutFeedback style={styles.searchBar} onPress={handlePress}>
        <Text style={styles.searchBarPlaceHolder}>
          Faites votre recherche ici...
        </Text>
      </TouchableWithoutFeedback>
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
    paddingLeft: ms(10),
    borderWidth: ms(1),
    borderColor: "gray",
    backgroundColor: colors.primary,
    width: wp(80),
    height: hp(4.4),
    borderRadius: ms(5),
    fontStyle: "italic",
    fontSize: ms(12),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  searchBarPlaceHolder: {
    fontSize: ms(13),
    fontFamily: "Inter-Regular",
    color: "rgba(0, 0, 0, 0.4)",
  },
});
