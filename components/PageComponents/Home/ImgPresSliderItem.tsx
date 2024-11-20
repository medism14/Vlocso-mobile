/** 
 * @format
 * Composant pour afficher un élément de slider avec image et texte superposé
 * Utilisé dans la page d'accueil pour présenter les fonctionnalités principales
 */

import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ms } from "react-native-size-matters";
import {
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../../globals/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// Calcul de la largeur ajustée pour le slider avec marges
const { width } = Dimensions.get("screen");
const adjustedWidth = width - ms(40);

// Types pour les props du composant
interface ImgPresSliderItemProps {
  item: {
    image: any;
    text: string;
  };
}

/**
 * Composant ImgPresSliderItem
 * Affiche une image avec un texte superposé et un bouton d'action
 * @param item - Objet contenant l'image et le texte à afficher
 */
const ImgPresSliderItem: React.FC<ImgPresSliderItemProps> = ({
  item,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={{ marginTop: ms(30), width: adjustedWidth }}>
      {/* Image principale */}
      <Image source={item.image} style={styles.presImg} />

      {/* Boutons de navigation (actuellement commentés) */}
      {/* <View style={styles.presImgButtonNextBack}>
        <Pressable onPress={handleBack} style={styles.presImgPressButton}>
          <FontAwesomeIcon icon={faChevronLeft} size={ms(14)} />
        </Pressable>

        <Pressable onPress={handleNext} style={styles.presImgPressButton}>
          <FontAwesomeIcon icon={faChevronRight} size={ms(14)} />
        </Pressable>
      </View> */}

      {/* Conteneur du texte superposé */}
      <View style={styles.imgPresTextContainer}>
        <Text style={styles.imgPresText}>
          {item.text}
        </Text>
      </View>

      {/* Bouton d'action */}
      <View style={styles.presImgButtonContainer}>
        <TouchableOpacity
          onPress={() => console.log("touched")}
          style={styles.presImgButton}
        >
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: ms(12), color: colors.textColor }}>
            Acheter ou louer dès maintenant
          </Text>
          <FontAwesomeIcon icon={faAngleRight} />
        </TouchableOpacity>
      </View>

      {/* Overlay noir pour améliorer la lisibilité du texte */}
      <View style={styles.presImgBlackOverlay} />
    </View>
  );
};

export default ImgPresSliderItem;

// Styles du composant
const styles = StyleSheet.create({
  // Style de l'image principale
  presImg: {
    width: adjustedWidth,
    height: hp(20),
    marginHorizontal: "auto",
    borderRadius: ms(10),
    position: "relative",
  },
  // Overlay noir semi-transparent
  presImgBlackOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: ms(10),
  },
  // Conteneur du texte principal
  imgPresTextContainer: {
    position: "absolute",
    transform: [{ translateY: 25 }],
    bottom: "50%",
    width: "100%",
    alignItems: "center",
    zIndex: 20,
  },
  // Style du texte principal
  imgPresText: {
    color: colors.primary,
    textAlign: "center",
    fontFamily: "Inter-Black",
    marginHorizontal: ms(10),
    fontSize: ms(18),
  },
  // Conteneur du bouton d'action
  presImgButtonContainer: {
    position: "absolute",
    bottom: "10%",
    width: "100%",
    alignItems: "center",
    zIndex: 15,
  },
  // Style du bouton d'action
  presImgButton: {
    backgroundColor: "white",
    paddingVertical: ms(5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ms(15),
    borderRadius: ms(5),
  },
  // Styles pour les boutons de navigation (non utilisés actuellement)
  presImgButtonNextBack: {
    flexDirection: "row",
    zIndex: 30,
    position: "absolute",
    top: 0,
    right: 0,
  },
  presImgPressButton: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(3),
    backgroundColor: colors.secondary,
    borderRadius: ms(3),
    borderWidth: ms(1),
  },
});
