/** @format */

import { StyleSheet, View } from "react-native";
import React from "react";
import Marques from "./Marques";
import { ms } from "react-native-size-matters";

/**
 * Tableau des marques de voitures avec leurs informations
 * Chaque objet contient un id unique, le nom de la marque et son logo
 */
const brandsCars = [
  {
    id: 1,
    title: 'Audi',
    image: require("../../../assets/Audi.png"),
  },
  {
    id: 2,
    title: 'Mercedez',
    image: require("../../../assets/Mercedez.png"),
  },
  {
    id: 3,
    title: 'Ducati',
    image: require("../../../assets/Ducati.png"),
  },
  {
    id: 4,
    title: 'Maybach',
    image: require("../../../assets/maybach.png"),
  },
  {
    id: 5,
    title: 'Suzuki',
    image: require("../../../assets/Suzuki.png"),
  },
  {
    id: 6,
    title: 'Yamaha',
    image: require("../../../assets/Yamaha.png"),
  },
];

/**
 * Tableau des marques de motos avec leurs informations
 * Structure identique à brandsCars pour maintenir la cohérence
 */
const brandsMotos = [
  {
    id: 1,
    title: 'Audi',
    image: require("../../../assets/Audi.png"),
  },
  {
    id: 2,
    title: 'Mercedez',
    image: require("../../../assets/Mercedez.png"),
  },
  {
    id: 3,
    title: 'Ducati',
    image: require("../../../assets/Ducati.png"),
  },
  {
    id: 4,
    title: 'Maybach',
    image: require("../../../assets/maybach.png"),
  },
  {
    id: 5,
    title: 'Suzuki',
    image: require("../../../assets/Suzuki.png"),
  },
  {
    id: 6,
    title: 'Yamaha',
    image: require("../../../assets/Yamaha.png"),
  },
];

/**
 * Composant principal affichant les marques de voitures et de motos
 * Utilise le composant Marques pour afficher chaque section avec un alignement différent
 */
const AllMarques: React.FC = () => {
  return (
    <View style={{ marginTop: ms(30), gap: ms(30) }}>
      {/* Section des marques de voitures alignée à gauche */}
      <Marques brands={brandsCars} title={"Marques de voitures"} position={"left"} />

      {/* Section des marques de motos alignée à droite */}
      <Marques brands={brandsMotos} title={"Marques de motos"} position={"right"}/>
    </View>
  );
};

export default AllMarques;

// Styles non utilisés pour le moment, conservés pour une utilisation future
const styles = StyleSheet.create({});
