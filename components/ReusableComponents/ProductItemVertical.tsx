/** @format */

/**
 * Composant ProductItemVertical - Affiche un produit dans une disposition verticale
 * 
 * Ce composant réutilisable permet d'afficher les informations d'un produit
 * dans une carte verticale avec image, titre, prix et autres détails.
 */

import { Image, StyleSheet, Text, View, Platform, Pressable, Dimensions } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";

/**
 * Interface définissant les props du composant
 * @param item - Objet contenant les données du produit à afficher
 * @param allSpace - Espacement total à prendre en compte pour le calcul de la largeur
 * @param onPress - Fonction appelée lors du clic sur le produit
 */
interface ProductItemVerticalProps {
  item: any;
  allSpace: number;
  onPress: () => void,
}

const ProductItemVertical: React.FC<ProductItemVerticalProps> = ({ item, allSpace, onPress }) => {

  const navigation = useNavigation<NavigationProp<any>>();
    
  // Calcul de la largeur de l'élément (48% de l'espace disponible)
  const width = (Dimensions.get("window").width - ms(allSpace)) * 0.48;

  return (
    <Pressable onPress={onPress} style={[styles.container, { width: width }]}>
      {/* Container de l'image du produit */}
      <View style={styles.imageContainer}>
        <Image
          source={item.images[0]}
          style={{ width: "100%", height: "100%", borderRadius: ms(15) }}
          resizeMode="cover"
        />
      </View>

      {/* Section des informations du produit */}
      <View style={styles.content}>
        {/* Titre et type de transaction */}
        <View>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.transaction}>{item.transaction}</Text>
        </View>
        
        {/* État du produit */}
        <View style={styles.conditionContainer}>
          <Text style={styles.condition}>{item.condition}</Text>
        </View>
        
        {/* Prix et localisation */}
        <View>
          <Text style={styles.price}>{item.price}€</Text>
          <Text style={styles.city}>{item.city}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItemVertical;

/**
 * Styles du composant
 * Définit l'apparence de la carte produit et de ses éléments
 */
const styles = StyleSheet.create({
  container: {
    borderWidth: ms(2),
    borderColor: colors.accentGray,
    borderRadius: ms(15),
    height: Platform.OS == "ios" ? ms(260) : ms(280), // Hauteur adaptée selon la plateforme
    overflow: "hidden",
    backgroundColor: colors.primary,
  },
  imageContainer: {
    flex: 0.6, // 60% de la hauteur pour l'image
    backgroundColor: colors.primary,
    borderRadius: ms(15),
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 0.4, // 40% de la hauteur pour le contenu
    padding: ms(10),
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: ms(12),
    color: colors.textColor,
  },
  transaction: {
    fontFamily: "Inter-Medium",
    color: colors.textColor,
    fontSize: ms(11),
  },
  price: {
    fontFamily: "Inter-Bold",
    color: colors.accentTertiary,
    fontSize: ms(11),
  },
  city: {
    fontFamily: "Inter-Italic",
    color: colors.textOpacityP,
    fontSize: ms(11),
  },
  condition: {
    fontFamily: "Inter-Bold",
    color: colors.tertiary,
    fontSize: ms(10),
  },
  conditionContainer: {
    borderColor: colors.tertiary,
    paddingVertical: Platform.OS == "ios" ? ms(1) : ms(0), // Ajustement du padding vertical selon la plateforme
    paddingHorizontal: ms(8),
    borderRadius: ms(8),
    borderWidth: ms(1),
    alignSelf: "flex-start",
  },
});
