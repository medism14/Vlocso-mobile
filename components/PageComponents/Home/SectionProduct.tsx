/** @format */

/**
 * Composant SectionProduct - Affiche une section de produits avec navigation horizontale
 * Permet l'affichage d'éléments sous forme de carrousel avec des boutons de navigation
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { ms } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../globals/colors";
import SectionProductItem from "./SectionProductItem";

interface SectionProductProps {
  icon: React.ReactElement;
  title: string;
  elements: any[][]; // Tableau 2D contenant les éléments à afficher
}

const { width } = Dimensions.get("window");

const SectionProduct: React.FC<SectionProductProps> = ({
  icon,
  title,
  elements,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const av = new Animated.Value(0);

  // Calcul de la largeur disponible en tenant compte des marges
  const widthWithoutPadding = width - ms(40);

  // Configuration pour détecter les éléments visibles dans le carrousel
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  /**
   * Gère le changement d'élément visible dans le carrousel
   * Met à jour l'index courant lorsqu'un nouvel élément devient visible
   */
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        setCurrentIndex(newIndex);
      }
    },
    [currentIndex]
  );

  /**
   * Gère le défilement du carrousel
   * @param direction - Direction du défilement ('back' ou 'next')
   */
  const handleScroll = (direction: "back" | "next") => {
    const newIndex = direction === "back" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < elements.length) {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      } else {
        console.log("flatListRef.current is null");
      }
    }
  };

  /**
   * Génère un bouton de navigation (précédent/suivant)
   * @param direction - Direction du bouton ('back' ou 'next')
   */
  const renderNavigationButton = (direction: "back" | "next") => (
    <Pressable
      onPress={() => handleScroll(direction)}
      style={({ pressed }) => [
        styles.presImgPressButton,
        pressed && styles.buttonPressed,
      ]}
      accessibilityLabel={direction === "back" ? "Précédent" : "Suivant"}
      accessibilityRole="button"
    >
      <FontAwesomeIcon
        icon={direction === "back" ? faChevronLeft : faChevronRight}
        size={Dimensions.get("window").width > 500 ? ms(15) : ms(12)}
      />
    </Pressable>
  );

  // Gestion du nettoyage des listeners d'animation
  useEffect(() => {
    const listener = av.addListener(() => {
      return;
    });

    return () => {
      av.removeListener(listener);
    };
  }, [av]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          {icon}
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.presImgButtonNextBack}>
          {renderNavigationButton("back")}
          {renderNavigationButton("next")}
        </View>
      </View>

      <View style={styles.titleLine} />

      {/* Carrousel principal des produits */}
      <FlatList
        ref={flatListRef}
        data={elements}
        renderItem={({ item }) => (
          <SectionProductItem items={item} widthParent={widthWithoutPadding} />
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

export default SectionProduct;

// Styles avec support responsive
const styles = StyleSheet.create({
  container: {
    marginTop: ms(30),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    gap: Dimensions.get("window").width > 500 ? ms(8) : ms(5),
    alignItems: "center",
  },
  titleText: {
    fontSize: Dimensions.get("window").width > 500 ? ms(22) : ms(16),
    fontFamily: "Inter-Bold",
    color: colors.textColor,
  },
  titleLine: {
    marginTop: ms(5),
    height: ms(2),
    width: "100%",
    backgroundColor: "#333333",
  },
  presImgButtonNextBack: {
    flexDirection: "row",
  },
  presImgPressButton: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(3),
    backgroundColor: colors.secondary,
    borderRadius: ms(3),
    borderWidth: ms(1),
  },
  buttonPressed: {
    backgroundColor: colors.primary,
    transform: [{ scale: 0.95 }],
  },
});
