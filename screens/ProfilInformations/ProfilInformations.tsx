/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../globals/colors";
import { ms } from "react-native-size-matters";
import {
  PageHeader,
  Input,
  ValidationButton,
  ErrorText,
  SuccessText,
} from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  faEnvelope,
  faUser,
  faMapMarkerAlt,
  faPhone,
  faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../axios/api";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../redux/features/authSlice";
import { getBasicUserInfo } from "../../utils";

/**
 * Interface définissant les props du composant ProfilInformations
 * @property navigation - Objet de navigation fourni par React Navigation
 */
interface ProfilInformationsProps {
  navigation: any;
}

/**
 * Interface définissant la structure des données du formulaire de profil
 */
interface ProfilInformationsData {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  phoneNumber: string;
}

/**
 * Composant permettant l'affichage et la modification des informations personnelles de l'utilisateur
 */
const ProfilInformations: React.FC<ProfilInformationsProps> = ({
  navigation,
}) => {
  // Récupération des informations utilisateur depuis le store Redux
  const user = useSelector((state: any) => state.auth.userLogin);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Initialisation du formulaire avec react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfilInformationsData>();
  const dispatch = useDispatch();

  /**
   * Gère la soumission du formulaire de modification des informations
   * Envoie les données au serveur et met à jour le store Redux
   */
  const onSubmit = async (data: ProfilInformationsData) => {
    setBtnDisabled(true);
    try {
      const response = await api.put("/users/" + user.userId, data);
      const { data: modifiedUser, message } = response.data;
      dispatch(setUserLogin(getBasicUserInfo(modifiedUser)));

      // Affiche un message de succès temporaire
      setSuccess(message);
      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch {
      // Gestion des erreurs avec affichage temporaire
      setError("Une erreur est survenue veuillez réessayez plus tard");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
    setBtnDisabled(false);
  };

  /**
   * Initialise le formulaire avec les données actuelles de l'utilisateur
   * Se déclenche à chaque modification des données utilisateur
   */
  useEffect(() => {
    reset({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      city: user.city,
      phoneNumber: user.phoneNumber,
    });
  }, [user]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      stickyHeaderIndices={[0]}
    >
      <PageHeader onPress={() => navigation.goBack()} />
      <View style={styles.pageStyle}>
        <Text style={styles.pageTitle}>Informations Personnel</Text>
        <View style={styles.forms}>
          {/* Champ email avec validation */}
          <Input
            label={"Email"}
            binding={true}
            placeholder={"Ex: (kaoutar@gmail.com)"}
            icon={faEnvelope}
            control={control}
            name="email"
            marginTop={false}
            rules={{
              required: "L'émail est requis",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Votre email n'a pas le bon format",
              },
            }}
          />

          {/* Champs pour le prénom avec validation */}
          <Input
            label={"Prénom"}
            binding={true}
            placeholder={"Ex: (Kaoutar)"}
            icon={faUser}
            control={control}
            name="firstName"
            rules={{
              required: "Le prénom est requis",
              minLength: {
                value: 2,
                message: "Un prénom doit au moins avoir deux caractères",
              },
            }}
          />

          {/* Champs pour le nom avec validation */}
          <Input
            label={"Nom"}
            binding={true}
            placeholder={"Ex: (Dupont)"}
            icon={faUser}
            control={control}
            name="lastName"
            rules={{
              required: "Le nom est requis",
              minLength: {
                value: 2,
                message: "Un nom doit au moins avoir deux caractères",
              },
            }}
          />

          {/* Champs pour la date de naissance avec validation */}
          <Input
            label={"Date de naissance"}
            binding={true}
            placeholder={"Ex: (20/01/2001)"}
            icon={faCakeCandles}
            control={control}
            setValue={setValue}
            name="birthDate"
            type="date"
            defaultDate={user.birthDate}
            rules={{
              required: "La date de naissance est réquis",
            }}
          />

          {/* Champs pour la ville avec validation du format ville + code postal */}
          <Input
            label={"Ville"}
            binding={true}
            placeholder={"Ex: (Paris)"}
            icon={faMapMarkerAlt}
            control={control}
            name="city"
            rules={{
              required: "La ville est requise",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s-]+,\s?\d{5}$/,
                message:
                  "Veuillez respecter le format d'une ville et d'un code postal français (Ex: Corte, 20250)",
              },
            }}
          />

          {/* Champs pour le numéro de téléphone avec validation du format */}
          <Input
            label={"Numéro de téléphone"}
            binding={true}
            placeholder={"Ex: (0123456789)"}
            icon={faPhone}
            control={control}
            name="phoneNumber"
            rules={{
              required: "Le numéro de téléphone est requis",
              pattern: {
                value: /^0[1-9]\d{8}$/,
                message:
                  "Veuillez respecter le format d'un numéro de téléphone",
              },
            }}
          />

          {/* Bouton de validation du formulaire */}
          <ValidationButton
            text={"Sauvegarder"}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            messageError={"Veuillez corriger les erreurs ci-dessus"}
            disabled={btnDisabled}
            loading={btnDisabled}
          />
          {error && <ErrorText>{error}</ErrorText>}
          {success && <SuccessText>{success}</SuccessText>}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilInformations;

/**
 * Styles du composant
 */
const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    paddingHorizontal: ms(15),
  },
  forms: {
    backgroundColor: colors.primary,
    paddingHorizontal: ms(20),
    paddingVertical: ms(30),
    borderRadius: ms(10),
  },
  pageTitle: {
    fontSize: ms(25),
    fontFamily: "Inter-ExtraBold",
    marginBottom: ms(15),
    alignSelf: "center",
  },
});
