/** @format */

/**
 * Composant pour afficher une grille de produits avec deux colonnes
 * Gère l'affichage des annonces et un bouton "voir plus" si nécessaire
 */

import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
} from "react-native";
import { ms } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCrown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../globals/colors";
import type { ImageSourcePropType } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

/**
 * Interface définissant la structure d'un produit
 */
interface ItemProps {
  id: number;
  title: string;
  images: ImageSourcePropType[];
  transaction: string;
  condition: string;
  price: string;
  city: string;
  premium: boolean;
}

/**
 * Props du composant principal
 */
interface SectionProductItemProps {
  items: ItemProps[];
  widthParent: number;
}

/**
 * Composant principal qui gère l'affichage des produits en grille
 */
const SectionProductItem: React.FC<SectionProductItemProps> = ({
  items,
  widthParent,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  /**
   * Rendu d'un produit individuel
   * Affiche l'image, le titre, la catégorie, l'état, le prix et la localisation
   */
  const renderProduct = (item: ItemProps) => (
    <Pressable
      style={styles.product}
      key={item.id}
      onPress={() => navigation.navigate('AnnounceDetails', { item })}
    >
      <View>
        <Image
          source={item.images[0]}
          style={styles.image}
          accessibilityLabel={item.title}
        />
        {/* Badge premium affiché uniquement pour les annonces premium */}
        {item.premium && (
          <View style={styles.premium}>
            <FontAwesomeIcon icon={faCrown} size={ms(16)} color="white" />
          </View>
        )}
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {item.transaction}
        </Text>
      </View>

      {/* Affichage conditionnel de l'état du produit */}
      {item.condition && (
        <View style={styles.conditionCard}>
          <Text style={styles.conditionText}>{item.condition}</Text>
        </View>
      )}

      <View>
        <Text style={styles.price}>{item.price}€</Text>
        <Text style={styles.location}>{item.city}</Text>
      </View>
    </Pressable>
  );

  /**
   * Rendu d'une colonne de produits
   * Affiche jusqu'à deux produits ou un bouton "voir plus" si aucun produit
   */
  const renderProductColumn = (startIndex: number) => (
    <View style={styles.productColumn}>
      {items[startIndex] && renderProduct(items[startIndex])}
      {items[startIndex + 1] && renderProduct(items[startIndex + 1])}
      {/* Affiche le bouton "voir plus" si aucun produit n'est présent dans la colonne */}
      {!items[startIndex] && !items[startIndex + 1] && (
        <Pressable
          onPress={() => console.log("plus d'annonce pressed")}
          style={styles.moreAnnonceWrapper}
          accessibilityLabel="Voir plus d'annonce"
          accessibilityRole="button"
        >
          <View style={styles.moreAnnonce}>
            <View style={styles.moreAnnonceContent}>
              <View style={styles.moreAnnoncePlus}>
                <FontAwesomeIcon icon={faPlus} size={ms(26)} />
              </View>
              <Text style={styles.moreAnnonceText}>Voir plus d'annonce</Text>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { width: widthParent }]}>
      {renderProductColumn(0)}
      {renderProductColumn(2)}
    </View>
  );
};

export default SectionProductItem;

/**
 * Styles du composant
 * Organisation en sections : container, product, image, textes, bouton "voir plus"
 */
const styles = StyleSheet.create({
  // Styles du conteneur principal
  container: {
    marginBottom: ms(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ms(15),
  },
  // Styles des colonnes de produits
  productColumn: {
    width: "48%",
    gap: 20,
    overflow: "hidden",
  },
  // Styles de la carte produit
  product: {
    overflow: "hidden",
    height: Platform.OS === "ios" ? ms(250) : ms(262),
    justifyContent: "space-between",
  },
  // Styles des éléments visuels
  image: {
    width: "100%",
    height: ms(150),
    borderRadius: ms(5),
  },
  premium: {
    backgroundColor: colors.accentTertiary,
    paddingVertical: ms(3),
    width: "auto",
    alignSelf: "flex-start",
    position: "absolute",
    right: ms(4),
    top: ms(4),
    borderRadius: ms(6),
    paddingHorizontal: ms(7),
  },
  // Styles des textes
  title: {
    fontFamily: "Inter-Bold",
    color: colors.textColor,
    marginTop: ms(7),
    fontSize: ms(14),
  },
  category: {
    fontFamily: "Inter-SemiBold",
    color: colors.textColor,
    marginTop: Platform.OS === "ios" ? ms(1) : ms(0),
    fontSize: ms(13),
  },
  conditionCard: {
    borderRadius: ms(10),
    borderWidth: ms(2),
    borderColor: colors.textColor,
    alignSelf: "flex-start",
    paddingVertical: Platform.OS === "ios" ? ms(1) : ms(0),
    paddingHorizontal: ms(15),
  },
  conditionText: {
    fontFamily: "Inter-Regular",
    color: colors.textColor,
    fontSize: ms(11),
  },
  price: {
    color: colors.accentTertiary,
    fontFamily: "Inter-SemiBold",
    fontSize: ms(12),
  },
  location: {
    fontFamily: "Inter-Italic",
    color: colors.textOpacity,
    fontSize: ms(12),
  },
  // Styles du bouton "voir plus"
  moreAnnonceWrapper: {
    flex: 1,
    width: "100%",
    padding: ms(3),
  },
  moreAnnonce: {
    backgroundColor: colors.secondary,
    flex: 1,
    justifyContent: "center",
    borderRadius: ms(5),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: ms(0), height: ms(0) },
        shadowOpacity: ms(0.1),
        shadowRadius: ms(4),
      },
      android: {
        elevation: ms(4),
      },
    }),
  },
  moreAnnonceContent: {
    gap: 10,
    marginRight: ms(10),
    alignItems: "center",
  },
  moreAnnonceText: {
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    fontSize: ms(20),
    marginHorizontal: ms(10),
    color: colors.textColor,
  },
  moreAnnoncePlus: {
    backgroundColor: colors.primary,
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
