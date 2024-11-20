/** @format */

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";

/**
 * Composant ConnexionRequired - Ecran pour obliger la connexion
 * Permet d'afficher des informations pour dire que la connexion est obligatoire
 * @param text - Contenu du texte pour une indication précise à l'utilisateur
 */
const ConnexionRequired = ({ text }: { text: string }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.loadingLayout}>
      <Image
        style={{ width: ms(200), height: ms(200) }}
        source={{
          uri: "https://res.cloudinary.com/dq87iplbt/image/upload/v1731682042/xcnc9it9hq0a5zemnnbj.gif",
        }}
      />
      <Text style={styles.connexionRequiredText}>
        {text}
      </Text>
      <Pressable
        onPress={() => navigation.navigate("AuthStack")}
        style={styles.connexionButton}
      >
        <Text style={styles.connexionButtonInsideText}>
          Cliquez ici pour vous connecter
        </Text>
      </Pressable>
    </View>
  );
};

export default ConnexionRequired;

const styles = StyleSheet.create({
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
