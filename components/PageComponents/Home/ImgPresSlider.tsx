// Importation des composants et hooks nécessaires
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef, useEffect, useState, useCallback } from "react";
import ImgPresSliderItem from "./ImgPresSliderItem";
import { ms } from "react-native-size-matters";
import globalStyles from "../../../globals/globalStyles";

// Interface définissant la structure d'un élément du slider
interface SlideItem {
  id: number;
  image: any; 
  text: string;
}

// Données statiques des slides à afficher
const data: SlideItem[] = [
  {
    id: 1,
    image: require("../../../assets/voiture.jpeg"),
    text: "Accédez facilement à notre catalogue de voiture incroyable",
  },
  {
    id: 2,
    image: require("../../../assets/ducatiPres.png"),
    text: "Explorez aisément notre sélection exceptionnelle de motos",
  },
];

const ImgPresSlider: React.FC = () => {
  // Références pour gérer le défilement automatique et l'état du slider
  const flatListRef = useRef<FlatList<SlideItem> | null>(null);
  const indexRef = useRef<number>(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Fonction pour passer au slide suivant
  const changementSlides = (): void => {
    indexRef.current = (indexRef.current + 1) % data.length;
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: indexRef.current,
        animated: true,
      });
    }
  };

  // Configuration du défilement automatique des slides
  const AutoScrollingSlides = (time: number): void => {
    intervalIdRef.current = setInterval(() => {
      changementSlides();
    }, time);
  };

  // Réinitialisation du timer lors d'une interaction utilisateur
  const reset4Seconds = (): void => {
    clearInterval(intervalIdRef.current);
    AutoScrollingSlides(5000);
  };

  // Initialisation du défilement automatique au montage du composant
  useEffect(() => {
    AutoScrollingSlides(5000);
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  // Configuration pour détecter les éléments visibles dans le slider
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  // Gestion du changement de slide visible
  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      reset4Seconds();
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Liste horizontale des slides avec pagination */}
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <ImgPresSliderItem item={item} />
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {/* Indicateurs de pagination */}
      <View style={globalStyles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[globalStyles.dot, currentIndex === index && globalStyles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImgPresSlider;

// Styles du composant
const styles = StyleSheet.create({
  container: {
    gap: ms(5),
  },
});