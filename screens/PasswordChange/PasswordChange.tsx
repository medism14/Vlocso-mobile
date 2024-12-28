/** @format */

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import {
  PageHeader,
  Input,
  OperationLogo,
  SecondaryBody,
  ValidationButton,
} from "../../components";
import { faKey } from "@fortawesome/free-solid-svg-icons";

/**
 * Props de l'écran de changement de mot de passe
 */
interface PasswordChangeProps {
  navigation: any;
}

/**
 * Structure des données du formulaire de changement de mot de passe
 */
interface PasswordChangeFormData {
  password: string;
  passwordConfirmation: string;
}

/**
 * Composant permettant à l'utilisateur de changer son mot de passe
 * Gère la saisie et la validation du nouveau mot de passe
 */
const PasswordChange: React.FC<PasswordChangeProps> = ({ navigation }) => {
  // Initialisation du formulaire avec react-hook-form
  const { control, handleSubmit, reset, watch } = useForm<PasswordChangeFormData>();

  // Surveillance du champ password pour la validation de la confirmation
  const password = watch("password");

  /**
   * Gestion de la soumission du formulaire
   * Réinitialise le formulaire après soumission
   */
  const onSubmit: SubmitHandler<PasswordChangeFormData> = (data) => {
    console.log(data);
    setTimeout(() => {
      reset();
    }, 50);
  };

  return (
    <View style={styles.container}>
      {/* Navigation vers la page précédente */}
      <PageHeader
        title="Revenir à la page de connexion"
        onPress={() => navigation.goBack()}
      />

      {/* Logo et éléments visuels */}
      <OperationLogo />

      <SecondaryBody>
        {/* Champ de saisie du nouveau mot de passe */}
        <Input
          label={"Mot de passe"}
          binding={true}
          placeholder={"Ex: (Yasmine123)"}
          marginTop={false}
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

        {/* Champ de confirmation du mot de passe avec validation de correspondance */}
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

        {/* Bouton de validation du formulaire */}
        <ValidationButton
          text={"S'authentifier"}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </SecondaryBody>
    </View>
  );
};

export default PasswordChange;

/**
 * Styles du composant
 * Définit la mise en page principale avec un fond blanc et un espacement horizontal
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: ms(20),
  },
});