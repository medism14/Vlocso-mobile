/** @format */

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  PageHeader,
  Input,
  OperationLogo,
  SecondaryBody,
  ValidationButton,
} from "../../components";
import { ms } from "react-native-size-matters";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";

/**
 * Props d'interface pour le composant PasswordRecovery
 * @interface PasswordRecoveryProps
 */
interface PasswordRecoveryProps {
  navigation: any;
}

/**
 * Structure des données du formulaire de récupération de mot de passe
 * @interface PasswordRecoveryFormData
 */
interface PasswordRecoveryFormData {
  email: string;
}

/**
 * Composant de récupération de mot de passe
 * Permet aux utilisateurs de réinitialiser leur mot de passe via leur email
 */
const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({ navigation }) => {
  // Initialisation du formulaire avec react-hook-form
  const { control, handleSubmit, reset } = useForm();

  /**
   * Gère la soumission du formulaire
   * @param data - Données du formulaire (email)
   */
  const onSubmit: SubmitHandler<PasswordRecoveryFormData> = (data) => {
    console.log(data);
    // Reset du formulaire après un court délai pour éviter les soumissions multiples
    setTimeout(() => {
      reset();
    }, 50);
  };

  return (
    <View style={styles.container}>
      {/* Navigation vers la page de connexion */}
      <PageHeader
        title="Revenir à la page de connexion"
        onPress={() => navigation.goBack()}
      />

      {/* Logo et éléments visuels */}
      <OperationLogo />

      <SecondaryBody>
        {/* Champ de saisie email avec validation */}
        <Input
          label="Email"
          binding={true}
          placeholder="Ex: (kaoutar@gmail.com)"
          icon={faEnvelope}
          control={control}
          name="email"
          marginTop={false}
          rules={{
            required: "L'émail est requis",
            pattern: {
              value: /\S+@\S+\.\S+$/,
              message: "Votre email n'a pas le bon format",
            },
          }}
        />

        {/* Bouton de validation et soumission du formulaire */}
        <ValidationButton
          text={"S'authentifier"}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        
        {/* Navigation vers la page de changement de mot de passe */}
        <Pressable onPress={() => navigation.navigate("PasswordChange")}>
          <Text>Go to passwordchange</Text>
        </Pressable>
      </SecondaryBody>
    </View>
  );
};

export default PasswordRecovery;

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
