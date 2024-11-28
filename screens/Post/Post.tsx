/** @format */

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { colors } from "../../globals/colors";
import { PageHeader, OperationLogo, PostCard, Loading } from "../../components";
import { ms } from "react-native-size-matters";
import { faPlus, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import globalStyles from "../../globals/globalStyles";
import { useSelector } from "react-redux";
import ConnexionRequired from "../../components/ReusableComponents/ConnexionRequired";

/**
 * Composant Post - Écran principal pour la gestion des annonces
 * Permet à l'utilisateur de créer une nouvelle annonce ou d'en relancer une existante
 * @param {object} navigation - Objet de navigation fourni par React Navigation
 */

interface PostProps {
  navigation: any;
}

const Post: React.FC<PostProps> = ({ navigation }) => {
  const user = useSelector((state: any) => state.auth.userLogin);

  return (
    <View style={globalStyles.pageStyle}>
      {/* En-tête avec bouton de retour vers l'accueil */}
      <PageHeader onPress={() => navigation.navigate("Home")} />

      {user ? (
        <View style={globalStyles.body}>
          {/* Logo et titre de la section */}
          <OperationLogo title="Mise en ligne d'annonce" />

          {/* Section des cartes d'actions */}
          <View style={styles.cardSection}>
            {/* Carte pour créer une nouvelle annonce */}
            <PostCard
              title="Créer une nouvelle annonce"
              onPress={() => navigation.navigate("PostPage")}
              icon={<FontAwesomeIcon icon={faPlus} size={ms(15)} />}
            />
            {/* Carte pour relancer une annonce existante */}
            <PostCard
              title="Relancer une annonce"
              onPress={() => navigation.navigate("RelaunchPost")}
              icon={<FontAwesomeIcon icon={faRepeat} size={ms(15)} />}
            />
          </View>
        </View>
      ) : (
        <ConnexionRequired
          text={"Vous devez être connecté pour publier une annonce"}
        />
      )}
    </View>
  );
};

export default Post;

/**
 * Styles spécifiques au composant Post
 * Définit la mise en page et l'apparence des différentes sections
 */
const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  body: {
    justifyContent: "center",
    paddingHorizontal: ms(10),
    paddingVertical: ms(20),
    flex: 1,
  },
  cardSection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loadingLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  connexionRequiredText: {
    fontFamily: "Inter-BoldItalic",
    fontSize: ms(14),
    textAlign: "center",
  },
  connexionButton: {
    marginTop: ms(15),
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
    backgroundColor: colors.tertiary,
    color: colors.primary,
    borderRadius: ms(5),
  },
  connexionButtonInsideText: {
    fontFamily: "Inter-Medium",
    fontSize: ms(12),
    textAlign: "center",
    color: colors.primary,
  },
});
