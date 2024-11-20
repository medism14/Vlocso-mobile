/** @format */

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../../globals/colors";
import globalStyles from "../../../globals/globalStyles";
import MarquesItem from "./MarquesItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Interface définissant la structure d'une marque
 */
interface Brand {
  id: number;
  image: any;
  title: string;
}

/**
 * Props du composant Marques
 */
interface MarquesProps {
  brands: Brand[];
  title: string;
  position: "left" | "right"; // Contrôle l'alignement du composant
}

/**
 * Composant Marques - Affiche un carrousel horizontal de marques avec navigation
 * Permet de faire défiler les marques avec des boutons de pagination
 */
const Marques: React.FC<MarquesProps> = ({ brands, title, position }) => {
  const flatListRef = useRef<FlatList<Brand> | null>(null);
  const brandContentRef = useRef<View | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const indexRef = useRef<number>(0);

  /**
   * Calcule la largeur du conteneur des marques
   * Nécessaire pour le dimensionnement correct des éléments du carrousel
   */
  useEffect(() => {
    const handleMesure = () => {
      if (brandContentRef.current) {
        brandContentRef.current.measure((x, y, width, height) => {
          setWidth(width - 50);
        });
      }
    };

    const timeout = setTimeout(handleMesure, 100);
    return () => clearTimeout(timeout);
  }, []);

  /**
   * Gère la navigation vers l'élément précédent
   * Retourne au dernier élément si on est au début
   */
  const handleBack = () => {
    if (indexRef.current <= 0) {
      indexRef.current = brands.length - 3;
    } else {
      indexRef.current--;
    }
    setCurrentIndex(indexRef.current);

    flatListRef.current?.scrollToIndex({
      index: indexRef.current,
      animated: true,
    });
  };

  /**
   * Gère la navigation vers l'élément suivant
   * Retourne au premier élément si on est à la fin
   */
  const handleNext = () => {
    if (indexRef.current >= brands.length - 3) {
      indexRef.current = 0;
    } else {
      indexRef.current++;
    }
    setCurrentIndex(indexRef.current);

    flatListRef.current?.scrollToIndex({
      index: indexRef.current,
      animated: true,
    });
  };

  // Détermine l'alignement du composant en fonction de la prop position
  const alignmentStyle: ViewStyle =
    position === "left"
      ? { alignItems: "flex-start" }
      : { alignItems: "flex-end" };

  return (
    <View style={alignmentStyle}>
      <Text
        style={[
          {
            fontFamily: "Inter-Bold",
            textAlign: position,
            color: colors.textColor,
            fontSize: ms(16),
          },
        ]}
      >
        {title}
      </Text>

      {/* Conteneur principal du carrousel */}
      <View ref={brandContentRef} style={styles.brandContent}>
        <FlatList
          ref={flatListRef}
          data={brands}
          renderItem={({ item }) => (
            <MarquesItem item={item} widthParent={width} />
          )}
          pagingEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Boutons de navigation */}
        <Pressable style={styles.paginationLeft} onPress={handleBack}>
          <View style={styles.PaginationButton}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              color={"white"}
              size={ms(14)}
            />
          </View>
        </Pressable>

        <Pressable style={styles.paginationRight} onPress={handleNext}>
          <View style={styles.PaginationButton}>
            <FontAwesomeIcon
              icon={faChevronRight}
              color={"white"}
              size={ms(14)}
            />
          </View>
        </Pressable>

        {/* Indicateurs de pagination */}
        <View style={globalStyles.pagination}>
          {Array.from({ length: brands.length - 2 }, (_, index) => (
            <View
              key={index}
              style={[globalStyles.dot, currentIndex === index && globalStyles.activeDot]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Marques;

/**
 * Styles du composant
 * Définit la mise en page du carrousel et des éléments de navigation
 */
const styles = StyleSheet.create({
  brandContent: {
    backgroundColor: colors.secondary,
    borderWidth: ms(2),
    borderRadius: ms(10),
    paddingVertical: ms(4),
    paddingHorizontal: ms(25),
    width: "90%",
    position: "relative",
  },
  paginationLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: ms(40),
    alignItems: "center",
    justifyContent: "center",
  },
  paginationRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ms(40),
    alignItems: "center",
    justifyContent: "center",
  },
  PaginationButton: {
    backgroundColor: colors.tertiary,
    width: ms(20),
    height: ms(20),
    borderRadius: ms(10),
    alignItems: "center",
    justifyContent: "center",
  },
});
