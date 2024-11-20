/** 
 * @format
 * Composant pour afficher un élément individuel dans la liste des marques
 * Chaque élément est cliquable et affiche le logo d'une marque
 */

import { Image, Pressable, StyleSheet, ImageSourcePropType } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";

// Interface définissant les props attendues par le composant
interface MarquesItemProps {
  item: {
    image: ImageSourcePropType; // Source de l'image du logo
    title: string; // Nom de la marque
  };
  widthParent: number; // Largeur du conteneur parent pour calculer la taille de l'élément
}

const MarquesItem: React.FC<MarquesItemProps> = ({ item, widthParent }) => {
  // Gestionnaire d'événement pour le clic sur une marque
  const pressed = (title: string) => {
    console.log(title);
  }

  return (
    // Conteneur cliquable occupant 1/3 de la largeur du parent
    <Pressable onPress={() => pressed(item.title)}  style={[styles.itemContainer, { width: widthParent / 3 }]}>
      <Image source={item.image} style={styles.image} />
    </Pressable>
  );
};

export default MarquesItem;

// Styles pour le composant
const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: ms(10), // Padding adaptatif avec react-native-size-matters
  },
  image: {
    width: "100%",
    height: ms(40), // Hauteur adaptative pour le logo
    resizeMode: "contain", // Garde les proportions de l'image
  },
});