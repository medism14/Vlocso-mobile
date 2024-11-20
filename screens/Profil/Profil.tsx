/** @format */

/**
 * Composant Profil - Gère l'affichage et les fonctionnalités du profil utilisateur
 * Permet la gestion de l'image de profil, l'accès aux différentes sections et la déconnexion
 */

import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { NavigationProp } from "@react-navigation/native";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBullhorn,
  faCamera,
  faCrown,
  faHistory,
  faInfoCircle,
  faLock,
  faMoneyBillWave,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  ErrorText,
  SectionProfil,
  SuccessText,
  ModalImage,
} from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { setUserLogin } from "../../redux/features/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../lib/cloundinary";
import api from "../../axios/api";

interface ProfileProps {
  navigation: NavigationProp<any>;
}

const Profil: React.FC<ProfileProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  // État pour gérer l'image de profil et sa modification
  const [image, setImage] = useState<any>({
    uri: "https://res.cloudinary.com/dq87iplbt/image/upload/v1731409312/aoaz03fbb0agugzn6cwe.png",
  });
  const [modalVisible, setModalVisible] = useState({
    state: false,
    type: [],
  });
  const [imageMessage, setImageMessage] = useState<{
    type: string;
    message: string;
  }>();

  const user = useSelector((state: any) => state.auth.userLogin);
  const [imageLoading, setImageLoading] = useState(false);

  /**
   * Gère la modification de l'image de profil
   * Permet de sélectionner une image depuis la galerie et de la télécharger
   */
  const handleModifyImage = async () => {
    try {
      setImageLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      if (!result.canceled) {
        const imageUrl = await uploadImage(result.assets[0].uri);

        // Mise à jour de l'image dans la base de données
        await api.put(`/users/${user.userId}`, {
          urlImageUser: imageUrl,
        });

        // Mise à jour du state global
        const updatedUser = {
          ...user,
          urlImageUser: imageUrl,
        };
        dispatch(setUserLogin(updatedUser));

        setImageMessage({
          type: "success",
          message: "Votre image a bien été mise à jour",
        });
        handleTimeoutMessage();
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'image:", error);
      setImageMessage({
        type: "error",
        message: "Une erreur est survenue lors de la modification de l'image",
      });
      handleTimeoutMessage();
    } finally {
      setModalVisible({
        state: false,
        type: [],
      });
      setImageLoading(false);
    }
  };

  /**
   * Gère la suppression de l'image de profil
   * Réinitialise l'image par défaut
   */
  const handleRemoveImage = async () => {
    try {
      setImageLoading(true);
      await api.put(`/users/${user.userId}`, {
        urlImageUser: "remove",
      });

      const updatedUser = {
        ...user,
        urlImageUser: null,
      };
      dispatch(setUserLogin(updatedUser));

      setImage({
        uri: "https://res.cloudinary.com/dq87iplbt/image/upload/v1731409312/aoaz03fbb0agugzn6cwe.png",
      });

      setImageMessage({
        type: "success",
        message: "Votre image a bien été supprimée",
      });
      handleTimeoutMessage();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image:", error);
      setImageMessage({
        type: "error",
        message: "Une erreur est survenue lors de la suppression de l'image",
      });
      handleTimeoutMessage();
    } finally {
      setModalVisible({
        state: false,
        type: []
      });
      setImageLoading(false);
    }
  };

  /**
   * Gère la déconnexion de l'utilisateur
   * Invalide le token et redirige vers la page d'accueil
   */
  const handleDeconnexionUser = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("@refreshToken");
      await api.post("/auth/logout", { refreshToken });
      
      dispatch(setUserLogin(null));
      await AsyncStorage.removeItem("@accessToken");
      await AsyncStorage.removeItem("@refreshToken");
      navigation.reset({
        routes: [{ name: "BottomBar" }],
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion de l'utilisateurqsdf:", error);
    }
  };

  /**
   * Gère l'affichage temporaire des messages de succès/erreur
   */
  const handleTimeoutMessage = async () => {
    setTimeout(() => {
      setImageMessage({
        type: "",
        message: "",
      });
    }, 4000);
  };

  // Charge l'image de profil de l'utilisateur au chargement
  useEffect(() => {
    if (user.urlImageUser) {
      setImage({ uri: user.urlImageUser });
    }
  }, [user]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleModifyImage={handleModifyImage}
        handleRemoveImage={handleRemoveImage}
        imageLoading={imageLoading}
      />

      <View style={[styles.container]}>
        {/* Section informations utilisateur */}
        <View style={styles.userInfo}>
          <Pressable
            onPress={() =>
              setModalVisible({
                state: true,
                type: ["update", "remove"],
              })
            }
            style={styles.userImage}
          >
            <Image source={image} style={styles.userInfoImage} />

            <Pressable
              onPress={() =>
                setModalVisible({
                  state: true,
                  type: ["update", "remove"],
                })
              }
              style={styles.cameraContainer}
            >
              <FontAwesomeIcon icon={faCamera} size={ms(18)} color={"white"} />
            </Pressable>
          </Pressable>

          {imageMessage?.type == "success" && (
            <SuccessText>{imageMessage.message}</SuccessText>
          )}

          {imageMessage?.type == "error" && (
            <ErrorText>{imageMessage.message}</ErrorText>
          )}

          <Text style={styles.userInfoName}>
            {user.firstName} {user.lastName}
          </Text>

          {user.urlImageUser == null && (
            <Text style={styles.userInfoText}>
              Ajoutez une photo de profil pour augmenter la confiance d'autres
              utilisateurs
            </Text>
          )}
        </View>

        {/* Section des fonctionnalités liées aux annonces */}
        <View style={styles.sectionContainer}>
          <SectionProfil
            onPress={() => navigation.navigate("MyAnnounces")}
            icon={<FontAwesomeIcon icon={faBullhorn} size={ms(18)} />}
            title={"Mes annonces"}
          />
          <SectionProfil
            icon={<FontAwesomeIcon icon={faHistory} size={ms(18)} />}
            title={"Mon historique"}
          />
          <SectionProfil
            icon={<FontAwesomeIcon icon={faMoneyBillWave} size={ms(18)} />}
            title={"Mes achats"}
          />
          <SectionProfil
            icon={<FontAwesomeIcon icon={faCrown} size={ms(18)} />}
            title={"Mise en premium"}
          />
        </View>

        {/* Section des paramètres du compte */}
        <View style={styles.sectionContainer}>
          <SectionProfil
            onPress={() => navigation.navigate("ProfilInformations")}
            icon={<FontAwesomeIcon icon={faInfoCircle} size={ms(18)} />}
            title={"Informations personnel"}
          />
          <SectionProfil
            onPress={() => navigation.navigate("ProfilPassword")}
            icon={<FontAwesomeIcon icon={faLock} size={ms(18)} />}
            title={"Mot de passe"}
          />
          <SectionProfil
            icon={<FontAwesomeIcon icon={faSignOutAlt} size={ms(18)} />}
            title={"Deconnexion"}
            onPress={handleDeconnexionUser}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profil;

// Styles pour le composant Profil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: ms(10),
    paddingBottom: ms(20),
  },
  userInfo: {
    alignItems: "center",
    marginTop: ms(20),
    gap: ms(8),
  },
  userInfoImage: {
    width: wp(40),
    borderRadius: wp(20),
    height: undefined,
    aspectRatio: 1,
  },
  userInfoName: {
    fontSize: ms(20),
    fontFamily: "Inter-Bold",
    color: colors.textColor,
  },
  userInfoText: {
    fontSize: ms(12),
    fontFamily: "Inter-Italic",
    color: colors.textColor,
    textAlign: "center",
  },
  sectionContainer: {
    backgroundColor: "white",
    paddingVertical: ms(20),
    marginTop: ms(20),
    paddingHorizontal: ms(30),
    borderRadius: ms(10),
    gap: ms(25),
  },
  cameraContainer: {
    backgroundColor: colors.textColor,
    paddingVertical: ms(4),
    paddingHorizontal: ms(6),
    borderRadius: ms(5),
    position: "absolute",
    bottom: wp(20) / 8,
    right: wp(20) / 8,
  },
  userImage: {
    borderRadius: wp(20),
    width: wp(40),
    height: wp(40),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.textColor,
        shadowOffset: { width: ms(0), height: ms(0) },
        shadowOpacity: ms(0.5),
        shadowRadius: ms(5),
      },
      android: {
        elevation: ms(5),
      },
    }),
  },
});
