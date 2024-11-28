/** @format */

import { Dimensions, Image, StyleSheet, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { colors } from "../../../globals/colors";
import { ms } from "react-native-size-matters";
import { FlatList } from "react-native-gesture-handler";
import globalStyles from "../../../globals/globalStyles";

/**
 * Props d'interface pour le composant DisplayImagesDetails
 * @property {any[]} images - Tableau d'images à afficher dans le carrousel
 */
interface DisplayImagesDetailsProps {
  images: any[];
}

/**
 * Composant qui affiche un carrousel d'images avec pagination
 * Permet de faire défiler horizontalement les images avec un indicateur de position
 */
const DisplayImagesDetails: React.FC<DisplayImagesDetailsProps> = ({
  images,
}) => {
  // État pour suivre l'index de l'image actuellement affichée
  const [currentIndex, setCurrentIndex] = useState(0);
  // Référence pour accéder au composant FlatList
  const flatListRef = useRef<FlatList<any> | null>(null);
  // Récupère la largeur de l'écran pour dimensionner les images
  const width = Dimensions.get("window").width;

  // Configuration pour détecter quand une image devient visible
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  /**
   * Callback appelé lorsqu'une nouvelle image devient visible
   * Met à jour l'index actuel pour la pagination
   */
  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Carrousel d'images avec défilement horizontal */}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{uri: item.imageUrl }}
            style={[styles.image, { width: width }]}
            resizeMode={"stretch"}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {/* Indicateurs de pagination */}
      <View style={[globalStyles.pagination, { marginVertical: ms(15) }]}>
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

export default DisplayImagesDetails;

/**
 * Styles du composant
 * Définit l'apparence du conteneur et des images
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  image: {
    height: ms(280),
  },
});
