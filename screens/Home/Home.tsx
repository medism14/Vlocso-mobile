/** @format */

/**
 * Composant principal de la page d'accueil
 * Affiche les différentes sections de l'application:
 * - En-tête avec barre de recherche
 * - Slider d'images de présentation
 * - Liste des marques disponibles
 * - Sections de recommandations (générales, voitures, motos)
 * - Bouton pour poster une nouvelle annonce
 */

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import globalStyles from "../../globals/globalStyles";
import React, { useEffect } from "react";
import {
  AllMarques,
  Header,
  ImgPresSlider,
  SectionProduct,
} from "../../components";
import { ms } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCar,
  faGlobe,
  faMotorcycle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../globals/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import { recommandationsGenerale, voitures, motos } from "../../constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import {
  setReinitialiseUserProvider,
  setUserLogin,
} from "../../redux/features/authSlice";
import apiUserCheck from "../../axios/apiUserCheck";
import { getBasicUserInfo } from "../../utils";

/**
 * Composant Home - Page d'accueil principale de l'application
 * @param props - Les props du composant
 * @param props.navigation - L'objet de navigation fourni par React Navigation
 */
const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userProvider = useSelector((state: any) => state.auth.userProvider);
  const user = useSelector((state: any) => state.auth.userLogin);

  // Hook pour récupérer les utilisateurs au chargement (actuellement désactivé)
  useEffect(() => {
    const ifUserConnected = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("@accessToken");

        if (accessToken) {
          const response = await apiUserCheck.get(
            `/users/by-token/${accessToken}`
          );
          const user = await response.data.data;
          dispatch(setUserLogin(getBasicUserInfo(user)));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'utilisateur:",
          error
        );
      }
    };

    user && ifUserConnected();

    if (userProvider) {
      setReinitialiseUserProvider(userProvider);
    }
  }, [dispatch, userProvider]);

  return (
    <View style={globalStyles.pageStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Container principal avec padding horizontal */}
        <View style={{ paddingHorizontal: ms(20) }}>
          <Header />
          <ImgPresSlider />
          <AllMarques />

          {/* Section des recommandations générales */}
          <SectionProduct
            icon={
              <FontAwesomeIcon
                icon={faGlobe}
                color={colors.textColor}
                size={Dimensions.get("window").width > 500 ? ms(22) : ms(18)}
              />
            }
            title={"Récommandation Generale"}
            elements={recommandationsGenerale}
          />

          {/* Section des recommandations voitures */}
          <SectionProduct
            icon={
              <FontAwesomeIcon
                icon={faCar}
                color={colors.textColor}
                size={Dimensions.get("window").width > 500 ? ms(30) : ms(20)}
              />
            }
            title={"Récommandation Voitures"}
            elements={voitures}
          />

          {/* Section des recommandations motos */}
          <SectionProduct
            icon={
              <FontAwesomeIcon
                icon={faMotorcycle}
                color={colors.textColor}
                size={Dimensions.get("window").width > 500 ? ms(33) : ms(25)}
              />
            }
            title={"Récommandation Motos"}
            elements={motos}
          />

          {/* Section CTA pour poster une nouvelle annonce */}
          <View style={styles.bottomPostContainer}>
            <LinearGradient
              colors={["#F0F0F0", "#E0E0E0"]}
              style={styles.bottomPostGradient}
            >
              <Text style={styles.bottomPostText}>
                Vendez ou louez dès maintenant
              </Text>

              <Pressable style={styles.bottomPostButton} onPress={() => navigation.navigate("Post")}>
                <Text style={styles.bottomPostButtonText}>
                  Déposer une annonce
                </Text>
                <FontAwesomeIcon icon={faPlus} size={ms(17)} color="#FFFFFF" />
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

/**
 * Styles du composant
 * Définit l'apparence du conteneur de post et du bouton CTA
 * Inclut des styles spécifiques à la plateforme pour les ombres
 */
const styles = StyleSheet.create({
  bottomPostContainer: {
    backgroundColor: colors.secondary,
    marginTop: ms(0),
    marginBottom: ms(30),
    width: "90%",
    alignSelf: "center",
    borderRadius: ms(15),
    borderWidth: ms(1),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: ms(0), height: ms(0) },
        shadowOpacity: ms(0.3),
        shadowRadius: ms(8),
      },
      android: {
        elevation: ms(4),
      },
    }),
  },
  bottomPostGradient: {
    borderRadius: ms(15),
    padding: ms(20),
    alignItems: "center",
  },
  bottomPostText: {
    fontFamily: "Inter-ExtraBold",
    fontSize: ms(16),
    color: "#333",
    marginBottom: ms(15),
    textAlign: "center",
  },
  bottomPostButton: {
    backgroundColor: "#2C3E50",
    borderRadius: ms(6),
    paddingVertical: ms(10),
    paddingHorizontal: ms(22),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomPostButtonText: {
    color: colors.primary,
    fontFamily: "Inter-SemiBold",
    fontSize: ms(14),
    marginRight: ms(8),
  },
});
