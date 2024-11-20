/** @format */

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
import {
  faEnvelope,
  faKey,
  faUser,
  faCakeCandles,
  faCity,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { colors } from "../../globals/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  setReinitialiseUserProvider,
  setUserLogin,
} from "../../redux/features/authSlice";
import globalStyles from "../../globals/globalStyles";
import api from "../../axios/api";
import { getBasicUserInfo } from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RegisterProps {
  navigation: any;
}

interface RegisterFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  phoneNumber: string;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // Récupération de l'utilisateur et de son fournisseur
  const userProvider = useSelector((state: any) => state.auth.userProvider);
  const dispatch = useDispatch();
  const [registerError, setRegisterError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [step, setStep] = useState(1);
  const totalStep = 2;

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setButtonDisabled(true);
    if (totalStep == step) {
      // Si connexion par userProvider
      if (userProvider) {
        const body = {
          providerName: userProvider.providerName,
          accountProviderId: userProvider.accountProviderId,
          email: userProvider.email,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          city: data.city,
          phoneNumber: data.phoneNumber,
          urlImageUser: userProvider.urlImageUser,
          emailVerified: userProvider.emailVerified,
        };
        try {
          const response = await api.post("/auth/register/provider", body);
          const { data, message } = await response.data;
          const { user, tokens } = data;
          const { accessToken, refreshToken } = tokens;
          await Promise.all([
            AsyncStorage.setItem("@accessToken", accessToken),
            AsyncStorage.setItem("@refreshToken", refreshToken),
          ]);
          dispatch(setUserLogin(getBasicUserInfo(user)));
          resetToHome();
          dispatch(setReinitialiseUserProvider());
        } catch (error) {
          if (error.response.status == 500) {
            setRegisterError(
              "Une erreur est survenue lors de l'enregistrement, veuillez réessayez"
            );
            timeoutRegisterError();
          } else {
            setRegisterError(
              "Une erreur est survenue lors de l'enregistrement, veuillez réessayez"
            );
            timeoutRegisterError();
          }
        }
      } else {
        try {
          const formData = {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            city: data.city,
            phoneNumber: data.phoneNumber,
          };

          const response = await api.post("/auth/register", formData);

          const { data: userData, message } = await response.data;
          const { user, tokens } = userData;
          const { accessToken, refreshToken } = tokens;

          const userInfo = getBasicUserInfo(user);

          await AsyncStorage.setItem("@accessToken", accessToken);
          await AsyncStorage.setItem("@refreshToken", refreshToken);
          dispatch(setUserLogin(userInfo));
          resetToHome();
        } catch (error) {
          if (error.response.status == 409) {
            setRegisterError(
              "Cette adresse est déjà utilisée, veuillez fournir une autre adresse."
            );
            timeoutRegisterError();
          } else {
            console.error(error);
          }
        }
      }
    } else {
      try {
        const response = await api.get(`/users/by-email/${data.email}`);
        if (response.status == 200) {
          setRegisterError(
            "Cette adresse est déjà utilisée, veuillez fournir une autre adresse."
          );
          timeoutRegisterError();
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setStep((prev) => prev + 1);
        } else {
          setRegisterError(
            "Une erreur est survenue, veuillez réessayer plus tard."
          );
          timeoutRegisterError();
        }
        resetFormAfterTime();
      }
    }
    setButtonDisabled(false);
  };

  const resetFormAfterTime = () => {
    setTimeout(() => {
      reset({}, { keepValues: true });
    }, 50);
  };

  const timeoutRegisterError = (seconds: number = 4000) => {
    setTimeout(() => {
      setRegisterError("");
    }, seconds);
  };

  const resetToHome = () => {
    if (userProvider) {
      dispatch(setReinitialiseUserProvider());
    }

    navigation.reset({
      routes: [{ name: "BottomBar" }],
    });
  };

  const goToPreviousStep = () => {
    dispatch(setReinitialiseUserProvider());
    reset({}, { keepValues: true });
    if (step == 1) {
      resetToHome();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const userProviderRegister = () => {
    setStep(2);
    setTimeout(() => {
      setValue("firstName", userProvider.firstName);
      setValue("lastName", userProvider.lastName);
    }, 50);
  };

  useEffect(() => {
    const checkUserProviderState = async () => {
      try {
        const response = await api.post(`/auth/login/provider`, {
          email: userProvider.email,
        });

        const { data, message } = response.data;
        const { user, tokens } = data;
        const { accessToken, refreshToken } = tokens;

        await Promise.all([
          AsyncStorage.setItem("@accessToken", accessToken),
          AsyncStorage.setItem("@refreshToken", refreshToken),
        ]);
        dispatch(setUserLogin(getBasicUserInfo(user)));
        resetToHome();
      } catch (error) {
        if (error.response.status == 404) {
          userProviderRegister();
        } else if (error.response.status == 400) {
          setRegisterError(
            "Un compte avec cette adresse existe déjà, veuillez réessayez avec un autre compte."
          );
          timeoutRegisterError();
        } else {
          setRegisterError("Une erreur est survenue, veuillez réessayez.");
          timeoutRegisterError();
        }
      }
    };

    if (userProvider && userProvider.source == "Login") {
      userProviderRegister();
    } else if (userProvider) {
      checkUserProviderState();
    }
  }, [userProvider]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <PageHeader onPress={goToPreviousStep} cancelPress={resetToHome} />

      {/* Back button */}
      <View style={globalStyles.body}>
        {/* Title et Image */}
        <OperationLogo title="Inscription" />

        {/* Corps pour l'authentification */}
        <SecondaryBody step={step} totalStep={totalStep}>
          {step == 1 && (
            <>
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
                    message:
                      "Le mot de passe doit au moins contenir 5 caractère",
                  },
                }}
              />

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
                    message:
                      "Le mot de passe doit au moins contenir 5 caractère",
                  },
                  validate: (value) =>
                    value === password ||
                    "Les mots de passe ne correspondent pas",
                }}
              />
            </>
          )}

          {step == 2 && (
            <>
              <Input
                label={"Prenom"}
                binding={true}
                placeholder={"Ex: (Chaker)"}
                icon={faUser}
                marginTop={false}
                control={control}
                name="firstName"
                rules={{
                  required: "Le prénom est réquis",
                  minLength: {
                    value: 2,
                    message: "Un prénom doit au moins avoir deux caractères",
                  },
                }}
              />

              <Input
                label={"Nom"}
                binding={true}
                placeholder={"Ex: (Yaakoub)"}
                icon={faUser}
                control={control}
                name="lastName"
                rules={{
                  required: "Le nom est réquis",
                  minLength: {
                    value: 2,
                    message: "Un nom doit au moins avoir deux caractères",
                  },
                }}
              />

              <Input
                label={"Date de naissance"}
                binding={true}
                placeholder={"Ex: (20/01/2001)"}
                icon={faCakeCandles}
                control={control}
                setValue={setValue}
                name="birthDate"
                type="date"
                rules={{
                  required: "La date de naissance est réquise",
                  validate: (value) => {
                    const birthDate = new Date(value);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();

                    if (
                      monthDiff < 0 ||
                      (monthDiff === 0 && today.getDate() < birthDate.getDate())
                    ) {
                      age--;
                    }

                    return age >= 18 || "Vous devez avoir au moins 18 ans";
                  },
                }}
              />

              <Input
                label={"Ville actuel"}
                binding={true}
                placeholder={"Ex: (Corte, 20250)"}
                icon={faCity}
                control={control}
                name="city"
                rules={{
                  required: "La ville est réquise",
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ\s-]+,\s?\d{5}$/,
                    message:
                      "Veuillez respecter le format d'une ville et d'un code postal français (Ex: Corte, 20250)",
                  },
                }}
              />

              <Input
                label={"Numéro de téléphone"}
                binding={true}
                placeholder={"Ex: (0780853613)"}
                icon={faPhone}
                control={control}
                name="phoneNumber"
                rules={{
                  required: "Le numéro de téléphone est réquis",
                  pattern: {
                    value: /^0[1-9]\d{8}$/,
                    message:
                      "Veuillez respecter le format d'un numéro de téléphone",
                  },
                }}
              />
            </>
          )}

          <ValidationButton
            text={step == 1 ? "Continuer" : "S'inscrire"}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            messageError={"Veuillez corriger les erreurs ci-dessus"}
            disabled={buttonDisabled}
            loading={buttonDisabled}
          />
          {registerError && <ErrorText>{registerError}</ErrorText>}

          {step === 1 && (
            <>
              <ProviderAuth source="register" />
              <Pressable
                style={styles.changeAuth}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.changeAuthText}>
                  Connectez-vous facilement
                </Text>
              </Pressable>
            </>
          )}
        </SecondaryBody>
      </View>
    </ScrollView>
  );
};

export default Register;

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
