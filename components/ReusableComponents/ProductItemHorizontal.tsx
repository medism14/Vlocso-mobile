/** @format */

/**
 * Composant ProductItemHorizontal - Affiche un produit en format horizontal
 *
 * Ce composant réutilisable permet d'afficher les informations d'un produit
 * dans une mise en page horizontale avec image et détails.
 */

import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";

/**
 * Interface définissant les props du composant
 * @param item - Objet contenant les données du produit à afficher
 */
interface ProductItemHorizontalProps {
  item: {
    annonce: {
      annonceId: number;
      title: string;
      images: Array<{ imageUrl: string }>;
      transaction: string;
      vehicle: {
        vehicleId: number;
        condition: string;
        description: string;
        mark: string;
        model: string;
        year: number;
        gearbox: string;
        fuelType: string;
        klmCounter: string;
        climatisation: string;
        type: string;
      };
      price: string;
      city: string;
      phoneNumber: string;
      quantity: number;
      annonceState: string;
      endDate: string;
      premium: boolean;
      premiumExpiration: string;
    };
    user: {
      userId: number;
      firstName: string;
      lastName: string;
      urlImageUser: string;
    };
  };
}

const ProductItemHorizontal: React.FC<ProductItemHorizontalProps> = ({
  item,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Pressable
      onPress={() => navigation.navigate("AnnounceEdit", { item })}
      style={styles.container}
    >
      {/* Container de l'image du produit */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.annonce.images[0]?.imageUrl }}
          style={{ width: "100%", height: "100%", borderRadius: ms(15) }}
          resizeMode="stretch"
        />
      </View>

      {/* Container des informations du produit */}
      <View style={styles.content}>
        {/* Titre et type de transaction */}
        <View>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {item.annonce.title}
          </Text>
          <Text style={styles.transaction}>{item.annonce.transaction}</Text>
        </View>

        {/* État du produit */}
        <View style={styles.conditionContainer}>
          <Text style={styles.condition}>
            {item.annonce.vehicle?.condition}
          </Text>
        </View>

        {/* Prix et localisation */}
        <View>
          <Text style={styles.price}>{item.annonce.price}€</Text>
          <Text style={styles.city}>{item.annonce.city}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItemHorizontal;

/**
 * Styles du composant
 * Définit l'apparence et la mise en page de la carte produit
 */
const styles = StyleSheet.create({
  container: {
    borderWidth: ms(2),
    borderColor: colors.accentGray,
    borderRadius: ms(15),
    flexDirection: "row", // Layout horizontal
    height: ms(145),
    overflow: "hidden",
    backgroundColor: colors.primary,
  },
  imageContainer: {
    flex: 0.4, // 40% de l'espace horizontal
    backgroundColor: colors.primary,
    borderRadius: ms(13),
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.accentGray,
    borderWidth: ms(1),
    borderRightWidth: ms(2),
  },
  content: {
    flex: 0.6, // 60% de l'espace horizontal
    padding: ms(10),
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: ms(16),
  },
  transaction: {
    fontFamily: "Inter-Medium",
    color: colors.textColor,
    fontSize: ms(14),
  },
  price: {
    fontFamily: "Inter-Bold",
    color: colors.accentTertiary,
    fontSize: ms(14),
  },
  city: {
    fontFamily: "Inter-Italic",
    color: colors.textOpacityP,
    fontSize: ms(12),
  },
  condition: {
    fontFamily: "Inter-Bold",
    color: colors.tertiary,
    fontSize: ms(12),
  },
  conditionContainer: {
    borderColor: colors.tertiary,
    paddingVertical: Platform.OS == "ios" ? ms(3) : ms(0), // Ajustement selon la plateforme
    padding: ms(10),
    borderRadius: ms(10),
    borderWidth: ms(1),
    alignSelf: "flex-start",
  },
});
