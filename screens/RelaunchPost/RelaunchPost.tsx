/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  OperationLogo,
  PageHeader,
  SecondaryBody,
  ValidationButton,
} from "../../components";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { voitures } from "../../constants/data";
import { ms } from "react-native-size-matters";
import globalStyles from "../../globals/globalStyles";
import { colors } from "../../globals/colors";

interface FormContent {
  annonce: string;
}

interface RelaunchPostProps {
  navigation: any;
}

// Options de sélection pour les différents champs du formulaire
const myAnnouncesItems = voitures[0].map((voiture) => ({
  label: voiture.annonce.title,
  value: voiture.annonce.annonceId,
}));

const RelaunchPost: React.FC<RelaunchPostProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormContent>({
    defaultValues: {
      annonce: "",
    },
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const data = voitures[0];

  const onSubmit = async (data: FormContent) => {
    const actualAnnonce = voitures[0].filter(
      (voiture) => voiture.annonce.annonceId == parseInt(data.annonce)
    )[0];

    // console.log(actualAnnonce.annonce);

    navigation.navigate("PostPage", { item: actualAnnonce });
  };

  const resetToHome = () => {
    navigation.reset({
      routes: [{ name: "BottomBar" }],
    });
  };

  return (
    <View style={globalStyles.pageStyle}>
      <PageHeader
        onPress={() => navigation.goBack()}
        cancelPress={resetToHome}
      />

      <View style={styles.container}>
        <OperationLogo title={"Relancer une annonce"} />
        <SecondaryBody>
          <Input
            label={"Selectionner une annonce"}
            binding={true}
            placeholder={`Ex: (${myAnnouncesItems[0].label})`}
            icon={faBullhorn}
            items={myAnnouncesItems}
            type={"select"}
            defaultSelect={getValues("annonce")}
            control={control}
            marginTop={false}
            name="annonce"
            rules={{
              required: "Le type de transaction est requis",
            }}
          />

          <ValidationButton
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            text={"Choisir"}
            errors={errors}
            disabled={buttonDisabled}
            loading={buttonDisabled}
          />
        </SecondaryBody>
      </View>
    </View>
  );
};

export default RelaunchPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(15),
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: "100%",
    backgroundColor: colors.secondary,
  },
});
