/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../globals/colors";
import { ms } from "react-native-size-matters";
import { PageHeader, Input, ValidationButton, ErrorText, SuccessText } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import api from "../../axios/api";

/**
 * Interface définissant les props du composant ProfilPassword
 * @property {any} navigation - Objet de navigation React Navigation
 */
interface ProfilPasswordProps {
  navigation: any;
}

/**
 * Interface définissant la structure des données du formulaire
 * @property {string} password - Nouveau mot de passe
 * @property {string} passwordConfirmation - Confirmation du nouveau mot de passe
 */
interface ProfilPasswordData {
  password: string;
  passwordConfirmation: string;
}

/**
 * Composant permettant à l'utilisateur de modifier son mot de passe
 * Utilise react-hook-form pour la gestion du formulaire et la validation
 */
const ProfilPassword: React.FC<ProfilPasswordProps> = ({ navigation }) => {
  // Récupération des informations de l'utilisateur depuis le store Redux
  const user = useSelector((state: any) => state.auth.userLogin);
  
  // Configuration du formulaire avec react-hook-form
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfilPasswordData>();
  
  // Surveillance de la valeur du champ password pour la validation
  const password = watch("password");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /**
   * Gère la soumission du formulaire
   * Envoie une requête PUT pour mettre à jour le mot de passe
   * Affiche un message de succès ou d'erreur
   */
  const onSubmit = async (data: ProfilPasswordData) => {
    try {
      const response = await api.put("/users/" + user.userId, { password: data.password });
      setSuccess("Les informations ont bien été modifiés");
      // Efface le message de succès après 4 secondes
      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch {
      setError("Une erreur est survenue veuillez réessayez plus tard");
      // Efface le message d'erreur après 4 secondes
      setTimeout(() => {
        setError("");
      }, 4000);
    }
    reset();
  };

  /**
   * Réinitialise le formulaire quand l'utilisateur change
   */
  useEffect(() => {
    reset({
      password: "",
      passwordConfirmation: "",
    });
  }, [user]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      stickyHeaderIndices={[0]}
    >
      <PageHeader
        onPress={() => navigation.goBack()}
        color="gray"
      />
      <View style={styles.pageStyle}>
        <Text style={styles.pageTitle}>Mot de passe</Text>
        <View style={styles.forms}>
          {/* Champ de saisie du nouveau mot de passe avec validation */}
          <Input
            label={"Mot de passe"}
            binding={true}
            placeholder={"Ex: (Yasmine123)"}
            icon={faKey}
            secure={true}
            control={control}
            name="password"
            rules={{
              required: "Le mot de passe est réquis",
              minLength: {
                value: 5,
                message: "Le mot de passe doit au moins contenir 5 caractère",
              },
            }}
          />

          {/* Champ de confirmation du mot de passe avec validation croisée */}
          <Input
            label={"Confirmation du mot de passe"}
            binding={true}
            placeholder={"Ex: (Yasmine123)"}
            icon={faKey}
            secure={true}
            control={control}
            name="passwordConfirmation"
            rules={{
              required: "Le mot de passe est réquis",
              minLength: {
                value: 5,
                message: "Le mot de passe doit au moins contenir 5 caractère",
              },
              validate: (value) =>
                value === password || "Les mots de passe ne correspondent pas",
            }}
          />

          {/* Bouton de validation avec gestion des erreurs */}
          <ValidationButton
            text={"Sauvegarder"}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            messageError={"Veuillez corriger les erreurs ci-dessus"}
          />
          {error && <ErrorText>{error}</ErrorText>}
          {success && <SuccessText>{success}</SuccessText>}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilPassword;

/**
 * Styles du composant
 * Définit la mise en page et l'apparence des éléments
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
  }
});
