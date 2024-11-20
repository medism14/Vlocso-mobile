/** @format */

import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { ms } from "react-native-size-matters";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import globalStyles from "../../../globals/globalStyles";

/**
 * Interface définissant les props du composant DisplayImagesEdit
 * @param images - Tableau d'images à afficher
 * @param allSpace - Espacement total à appliquer
 */
interface DisplayImagesEditProps {
  images: { imageUrl: string }[]; // Correction du type pour inclure imageUrl
  allSpace: number;
}

/**
 * Composant permettant d'afficher un carrousel d'images avec pagination
 * Gère le défilement horizontal et l'indicateur de position courante
 */
const DisplayImagesEdit: React.FC<DisplayImagesEditProps> = ({
  images,
  allSpace,
}) => {
  // Référence vers le FlatList pour contrôler le défilement
  const flatListRef = useRef<FlatList<{ imageUrl: string }> | null>(null); // Correction du type

  // Calcul de la largeur disponible en tenant compte des marges
  const width = Dimensions.get("window").width - ms(allSpace);

  // État pour suivre l'index de l'image actuellement affichée
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /**
   * Configuration de la visibilité des éléments du FlatList
   * Un élément est considéré comme visible s'il est affiché à plus de 50%
   */
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  /**
   * Callback appelé lorsqu'un nouvel élément devient visible
   * Met à jour l'index courant pour la pagination
   */
  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }, []);

  return (
    <View>
      {/* Carrousel d'images avec défilement horizontal */}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <View style={[styles.imageContainer, { width: width }]}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode={"cover"}
            />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        keyExtractor={(_, index) => index.toString()}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {/* Indicateurs de pagination */}
      <View style={[globalStyles.pagination, { marginTop: ms(10) }]}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              globalStyles.dot,
              currentIndex === index && globalStyles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default DisplayImagesEdit;

/**
 * Styles du composant
 * Définit l'apparence du conteneur d'image et des images elles-mêmes
 */
const styles = StyleSheet.create({
  imageContainer: {
    padding: ms(5),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: ms(10),
  },
  image: {
    width: wp(72),
    height: hp(25),
    borderRadius: ms(10),
  },
});
