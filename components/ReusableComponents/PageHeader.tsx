/** @format */

/**
 * Composant PageHeader - En-tête de page réutilisable avec navigation
 * 
 * Ce composant fournit une barre d'en-tête standard avec:
 * - Un bouton retour à gauche
 * - Un titre optionnel au centre 
 * - Un bouton d'annulation optionnel à droite
 */

import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";

/**
 * Interface définissant les props du composant
 * @param onPress - Fonction appelée lors du clic sur le bouton retour
 * @param title - Titre optionnel à afficher au centre
 * @param marginB - Marge optionnelle en bas (non utilisée actuellement)
 * @param color - Couleur optionnelle (non utilisée actuellement)
 * @param cancelPress - Fonction optionnelle pour le bouton d'annulation
 */
interface PageHeaderProps {
  onPress: () => void;
  title?: string;
  marginB?: any;
  color?: string;
  cancelPress?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  onPress,
  title = "",
  color = "white",
  cancelPress,
}) => {
  return (
    <View style={[styles.homeButton]}>
      {/* Conteneur gauche avec bouton retour et titre */}
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {/* Bouton retour avec effet de pression */}
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.homeButtonIconContainer,
            pressed && styles.buttonPressed,
          ]}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={ms(18)}
            style={styles.homeButtonIcon}
          />
        </Pressable>

        {/* Titre avec ellipsis si trop long */}
        {title && (
          <Text
            style={styles.homeButtonText}
            numberOfLines={1} 
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        )}
      </View>

      {/* Bouton d'annulation optionnel */}
      {cancelPress && (
        <Pressable
          onPress={cancelPress}
          style={({ pressed }) => [
            styles.homeButtonIconContainer,
            pressed && styles.buttonPressed,
          ]}
        >
          <FontAwesomeIcon
            icon={faTimes}
            size={ms(18)}
            style={styles.homeButtonIcon}
          />
        </Pressable>
      )}
    </View>
  );
};

export default PageHeader;

/**
 * Styles du composant
 * Définit l'apparence de l'en-tête et de ses éléments
 */
const styles = StyleSheet.create({
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ms(4),
    borderColor: colors.accentGray,
    borderBottomWidth: ms(1),
    backgroundColor: colors.primary,
    zIndex: 50, // Assure que l'en-tête reste au-dessus des autres éléments
  },
  homeButtonText: {
    color: colors.textColor,
    fontSize: ms(16),
    fontFamily: "Inter-SemiBold",
    flex: 1,
  },
  homeButtonIconContainer: {
    height: ms(45),
    width: ms(45),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ms(5),
  },
  homeButtonIcon: {
    color: colors.textColor,
  },
  buttonPressed: {
    backgroundColor: colors.accentGray,
  },
});
