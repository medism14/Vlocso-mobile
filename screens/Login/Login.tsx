/** @format */

/**
 * Composant de connexion permettant l'authentification des utilisateurs
 * Gère à la fois la connexion classique (email/mot de passe) et l'authentification via providers
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { ms } from "react-native-size-matters";
import {
  Input,
  OperationLogo,
  SecondaryBody,
  PageHeader,
  ValidationButton,
  ProviderAuth,
  ErrorText,
} from "../../components";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { colors } from "../../globals/colors";
import { useSelector } from "react-redux";
import globalStyles from "../../globals/globalStyles";
import api from "../../axios/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  setReinitialiseUserProvider,
  setUserLogin,
} from "../../redux/features/authSlice";
import { getBasicUserInfo } from "../../utils";

interface LoginProps {
  navigation: any;
}

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  // Configuration du formulaire avec react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  /**
   * Gère la soumission du formulaire de connexion
   * Authentifie l'utilisateur et stocke les tokens de session
   */
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setButtonDisabled(true);
    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 200) {
        const { data: userData } = await response.data;
        const { user, tokens } = userData;
        const { accessToken, refreshToken } = tokens;

        // Stockage des tokens d'authentification
        await Promise.all([
          AsyncStorage.setItem("@accessToken", accessToken),
          AsyncStorage.setItem("@refreshToken", refreshToken),
        ]);
        dispatch(setUserLogin(getBasicUserInfo(user)));
        resetToHome();
      }
    } catch (error) {
      // Gestion des différents cas d'erreur
      if (!error.response) {
        setLoginError("Erreur de connexion au serveur");
        timeoutLoginError();
        return;
      }

      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        setLoginError(
          "Les informations d'identification fournies sont incorrectes. Merci de vérifier vos identifiants."
        );
        timeoutLoginError();
      } else {
        setLoginError("Une erreur est survenue, veuillez réessayer. ");
        timeoutLoginError();
        resetFormAfterTime();
      }
    }
    setButtonDisabled(false);
  };

  /**
   * Utilitaires pour la gestion des erreurs et la réinitialisation du formulaire
   */
  const resetFormAfterTime = () => {
    setTimeout(() => {
      reset();
    }, 50);
  };

  const timeoutLoginError = (seconds: number = 4000) => {
    setTimeout(() => {
      setLoginError("");
    }, seconds);
  };

  const resetToHome = () => {
    navigation.reset({
      routes: [{ name: "BottomBar" }],
    });
  };

  // État de l'authentification provider depuis Redux
  const userProvider = useSelector((state: any) => state.auth.userProvider);

  /**
   * Effet pour gérer l'authentification via provider
   * Vérifie l'existence de l'utilisateur et gère la redirection appropriée
   */
  useEffect(() => {
    if (userProvider && userProvider.source == "login") {
      const checkUserState = async () => {
        setButtonDisabled(true);
        try {
          const body = {
            email: userProvider.email,
          };
          const response = await api.post("/auth/login/provider", body);

          const { data, message } = await response.data;
          const { user, tokens } = data;
          const { accessToken, refreshToken } = tokens;

          // Stockage des tokens et mise à jour du state
          await Promise.all([
            AsyncStorage.setItem("@accessToken", accessToken),
            AsyncStorage.setItem("@refreshToken", refreshToken),
          ]);
          dispatch(setUserLogin(getBasicUserInfo(user)));
          dispatch(setReinitialiseUserProvider());
          resetToHome();
        } catch (error) {
          if (!error.response) {
            return;
          }

          const errorMessage =
            error.response.data.message ||
            "Une erreur est survenue, veuillez réessayer.";

          // Gestion des différents cas d'erreur pour l'authentification provider
          switch (error.response.status) {
            case 404:
              navigation.navigate("Register");
              break;
            case 400:
              setLoginError(errorMessage);
              timeoutLoginError();
              break;
            default:
              setLoginError(errorMessage);
              timeoutLoginError();
          }
        } finally {
          setButtonDisabled(false);
        }
      };

      checkUserState();
    }
  }, [userProvider, navigation, dispatch]);

  // Nettoyage des erreurs lors du démontage du composant
  useEffect(() => {
    return () => {
      setLoginError("");
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      {/* En-tête avec bouton retour */}
      <PageHeader onPress={resetToHome} cancelPress={resetToHome} />

      <View style={[globalStyles.body, { position: "relative" }]}>
        {/* Logo et titre de la page */}
        <OperationLogo title="Authentification" />

        {/* Formulaire d'authentification */}
        <SecondaryBody>
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

          {/* Lien vers la récupération de mot de passe */}
          <Pressable
            style={{ marginTop: ms(3) }}
            onPress={() => navigation.navigate("PasswordRecovery")}
          >
            <Text style={styles.forgetPassword}>Mot de passe oublié</Text>
          </Pressable>

          {/* Bouton de connexion et affichage des erreurs */}
          <ValidationButton
            text={"S'authentifier"}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            messageError={"Veuillez corriger les erreurs ci-dessus"}
            disabled={buttonDisabled}
            loading={buttonDisabled}
          />
          {loginError && <ErrorText>{loginError}</ErrorText>}

          {/* Authentification via providers */}
          <ProviderAuth source="login" />

          {/* Lien vers l'inscription */}
          <Pressable
            style={styles.changeAuth}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.changeAuthText}>
              Inscrivez-vous gratuitement
            </Text>
          </Pressable>
        </SecondaryBody>
      </View>
    </ScrollView>
  );
};

export default Login;

// Styles pour le composant Login
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: ms(15),
  },
  input: {
    backgroundColor: "white",
    padding: ms(10),
    borderRadius: ms(5),
    borderWidth: ms(1),
  },
  errorText: {
    color: "red",
    fontSize: ms(12),
    marginTop: ms(5),
  },
  button: {
    backgroundColor: "#007AFF",
    padding: ms(10),
    borderRadius: ms(5),
    marginTop: ms(10),
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: ms(16),
    fontWeight: "bold",
  },
  forgetPassword: {
    fontSize: ms(11),
    fontFamily: "Inter-Medium",
    color: colors.textColor,
  },
  changeAuth: {
    borderWidth: ms(1),
    borderColor: colors.tertiary,
    borderRadius: ms(5),
    backgroundColor: colors.primary,
    marginTop: ms(30),
    alignItems: "center",
    padding: ms(11),
  },
  changeAuthText: {
    color: colors.textColor,
    fontSize: ms(14),
    fontFamily: "Inter-Bold",
  },
});
