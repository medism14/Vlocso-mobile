/** @format */

// Importation des composants et utilitaires nécessaires
import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters"; // Utilitaire pour le scaling responsive
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../globals/colors";

/**
 * Interface définissant les props du composant SectionProfil
 * @param title - Texte à afficher dans la section
 * @param icon - Icône optionnelle à afficher avant le titre
 * @param onPress - Fonction callback optionnelle appelée lors du clic
 */
interface SectionProfilProps {
  title: string;
  icon?: any;
  onPress?: () => void,
}

/**
 * Composant représentant une section cliquable du profil utilisateur
 * Affiche un titre, une icône optionnelle et une flèche de navigation
 */
const SectionProfil: React.FC<SectionProfilProps> = ({
  title,
  icon,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.elementsContainer]}>
        {/* Container gauche avec l'icône et le titre */}
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: ms(6) }}
        >
          {icon}
          <Text style={styles.text}>{title}</Text>
        </View>

        {/* Flèche de navigation à droite */}
        <FontAwesomeIcon
          icon={faChevronRight}
          size={ms(20)}
          style={styles.rightArrow}
        />
      </View>
    </Pressable>
  );
};

export default SectionProfil;

// Styles du composant
const styles = StyleSheet.create({
  container: {
    paddingVertical: ms(10),
    borderBottomColor: colors.textColor,
    borderBottomWidth: ms(2), // Bordure inférieure pour séparer les sections
  },
  elementsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Espace les éléments aux extrémités
  },
  text: {
    fontSize: ms(18),
    fontFamily: "Inter-Bold",
    color: colors.textColor,
  },
  rightArrow: {
    position: "absolute",
    right: 0, // Positionne la flèche à l'extrémité droite
  },
});
