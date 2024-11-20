/** @format */

/**
 * Composant PostCard - Carte cliquable pour afficher une option de publication
 * Affiche un titre, une icône principale avec une icône secondaire superposée,
 * et un bouton de continuation
 */

import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../globals/colors";
import { ms } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

/**
 * Props du composant PostCard
 * @property {string} title - Titre affiché en haut de la carte
 * @property {ReactElement} icon - Icône secondaire à superposer sur l'icône principale
 * @property {Function} onPress - Fonction appelée lors du clic sur la carte ou le bouton
 */
interface PostCardProps {
  title: string;
  icon: any;
  onPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ title, icon, onPress }) => {
  return (
    <Pressable style={styles.pageStyle} onPress={onPress}>
      {/* En-tête avec le titre de l'option */}
      <Text style={styles.title}>{title}</Text>

      {/* Conteneur des icônes avec superposition */}
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={faBullhorn} size={ms(60)} />
        {/* Icône secondaire positionnée en superposition */}
        <View style={styles.littleIcon}>{icon}</View>
      </View>

      {/* Bouton de continuation avec texte */}
      <Pressable onPress={onPress} style={styles.button}>
        <Text
          style={{
            fontFamily: "Inter-SemiBold",
            fontSize: ms(14),
            color: colors.primary,
          }}
        >
          Continuer
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default PostCard;

/**
 * Styles du composant
 * Utilise ms() pour le scaling adaptatif des dimensions
 */
const styles = StyleSheet.create({
  pageStyle: {
    width: "45%", // Occupe 45% de la largeur du parent
    backgroundColor: colors.secondary,
    padding: ms(15),
    paddingBottom: ms(10),
    borderRadius: ms(8),
    justifyContent: "space-between",
  },
  title: {
    fontSize: ms(12),
    fontFamily: "Inter-Bold",
    textAlign: "center",
    color: colors.textColor,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: ms(10),
    alignSelf: "center",
    position: "relative", // Permet le positionnement absolu de l'icône secondaire
  },
  littleIcon: {
    position: "absolute", // Positionnement absolu par rapport au conteneur
    top: ms(-7),
    right: ms(-12),
  },
  button: {
    backgroundColor: colors.tertiary,
    marginTop: ms(20),
    alignItems: "center",
    padding: ms(5),
    borderRadius: ms(5),
  },
});
