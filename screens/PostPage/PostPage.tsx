/** @format */

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useForm } from "react-hook-form";
import {
  PageHeader,
  ButtonDelete,
  ButtonEdit,
  Input,
  OperationLogo,
  SecondaryBody,
  ValidationButton,
  ValidationSection,
  ErrorText,
  ModalImage,
} from "../../components";
import {
  faBoxes,
  faCalendarAlt,
  faCamera,
  faCity,
  faClipboardList,
  faEuroSign,
  faExchangeAlt,
  faGasPump,
  faGears,
  faHeading,
  faLayerGroup,
  faMoneyBill,
  faPhone,
  faPlus,
  faRoad,
  faTachometerAlt,
  faTags,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { ms } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../globals/colors";
import globalStyles from "../../globals/globalStyles";
import { carBrandsAndModels } from "../../constants/carBrandsAndModels";
import { motoBrandsAndModels } from "../../constants/motoBrandsAndModels";
import { useSelector } from "react-redux";
import api from "../../axios/api";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../lib/cloundinary";
import { annonceWithUserInterface } from "../../types/annonce";
import { getAnnonceInfo } from "../../utils";
import { CommonActions } from "@react-navigation/native";

// Types définissant les props et la structure des données du formulaire
interface PostPageProps {
  navigation: any;
  route: any;
}

interface PostPageData {
  annonceId?: string; // Correspond au champ Annonce.id
  title: string; // Correspond au champ Annonce.title
  price: string; // Correspond au champ Annonce.price
  type: string; // Correspond au champ Vehicle.type
  transaction: string; // Correspond au champ Annonce.transaction
  condition: string; // Correspond au champ Vehicle.condition
  quantity: string; // Correspond au champ Annonce.quantity
  city: string; // Correspond au champ Annonce.city
  phoneNumber: string; // Correspond au champ Annonce.phone_number
  mark: string; // Correspond au champ Vehicle.mark
  model: string; // Correspond au champ Vehicle.model
  year: string; // Correspond au champ Vehicle.year
  gearbox: string; // Correspond au champ Vehicle.gearbox
  climatisation: string; // Correspond au champ Vehicle.climatisation
  klm_counter: string; // Correspond au champ Vehicle.klmCounter
  description: string; // Correspond au champ Vehicle.description
  fuelType: string; // Correspond au champ Vehicle.fuelType
  images: string[]; // Images
}

// Options de sélection pour les différents champs du formulaire
const typeVehiculeItems = [
  { label: "Voiture", value: "Voiture" },
  { label: "Moto", value: "Moto" },
];

const transactionItems = [
  { label: "Vente", value: "Vente" },
  { label: "Location", value: "Location" },
];

const conditionItems = [
  { label: "Neuf", value: "Neuf" },
  { label: "Occasion", value: "Occasion" },
  { label: "Peu Endommagé", value: "Peu Endommagé" },
];

const typeGearBoxItems = [
  { label: "Manuel", value: "Manuel" },
  { label: "Automatique", value: "Automatique" },
  { label: "Semi-Automatique", value: "Semi-Automatique" },
];

const climatisationItems = [
  { label: "Très bonne état", value: "Très bonne état" },
  { label: "Bonne état", value: "Bonne état" },
  { label: "Moyenne état", value: "Moyenne état" },
  { label: "Mauvaise état", value: "Mauvaise état" },
  { label: "Non fonctionnel", value: "Non fonctionnel" },
];

const fuelTypeItems = [
  { label: "Essence", value: "Essence" },
  { label: "Diesel", value: "Diesel" },
  { label: "Électrique", value: "Électrique" },
  { label: "Hybride", value: "Hybride" },
];

const colorItems = [
  { label: "Rouge", value: "Rouge" },
  { label: "Bleu", value: "Bleu" },
  { label: "Vert", value: "Vert" },
  { label: "Noir", value: "Noir" },
  { label: "Blanc", value: "Blanc" },
  { label: "Gris", value: "Gris" },
  { label: "Jaune", value: "Jaune" },
  { label: "Orange", value: "Orange" },
  { label: "Violet", value: "Violet" },
  { label: "Rose", value: "Rose" },
];

const categoryItemsCars = [
  { label: "Sport", value: "Sport" },
  { label: "SUV", value: "SUV" },
  { label: "Berline", value: "Berline" },
  { label: "Coupé", value: "Coupé" },
  { label: "Hatchback", value: "Hatchback" },
  { label: "Break", value: "Break" },
  { label: "Pick-up", value: "Pick-up" },
  { label: "Monospace", value: "Monospace" },
  { label: "Crossover", value: "Crossover" },
  { label: "Roadster", value: "Roadster" },
  { label: "Utilitaire", value: "Utilitaire" },
];

const categoryItemsMotos = [
  { label: "Sport", value: "Sport" },
  { label: "Cruiser", value: "Cruiser" },
  { label: "Touring", value: "Touring" },
  { label: "Standard", value: "Standard" },
  { label: "Dual-Sport", value: "Dual-Sport" },
  { label: "Adventure", value: "Adventure" },
  { label: "Chopper", value: "Chopper" },
  { label: "Cafe Racer", value: "Cafe Racer" },
  { label: "Electric", value: "Electric" },
  { label: "Scooter", value: "Scooter" },
];

const PostPage: React.FC<PostPageProps> = ({ navigation, route }) => {
  // État pour gérer les étapes du formulaire et les données
  let item: annonceWithUserInterface | null = null;

  if (route.params) {
    item = route.params.item;
  }

  const [step, setStep] = useState(1);
  const totalStep = 4;
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<PostPageData>({
    defaultValues: item
      ? {
          title: item.annonce.title,
          price: item.annonce.price.toString(),
          type: item.annonce.vehicle.type,
          transaction: item.annonce.transaction,
          condition: item.annonce.vehicle.condition,
          quantity: item.annonce.quantity?.toString() || "1",
          city: item.annonce.city,
          phoneNumber: item.annonce.phoneNumber,
          mark: item.annonce.vehicle.mark,
          model: item.annonce.vehicle.model,
          year: item.annonce.vehicle.year.toString(),
          gearbox: item.annonce.vehicle.gearbox,
          climatisation: item.annonce.vehicle.climatisation,
          klm_counter: item.annonce.vehicle.klmCounter?.toString() || "0",
          description: item.annonce.vehicle.description || "",
          fuelType: item.annonce.vehicle.fuelType,
        }
      : {},
  });

  // États pour la gestion des images et des marques/modèles
  const [images, setImages] = useState(item?.annonce.images || []);
  const [imageError, setImageError] = useState(false);
  const [brandsItem, setBrandsItem] = useState<
    { label: string; value: string }[]
  >([]);
  const [brandsAllData, setBrandsAllData] = useState<any[]>([]);
  const [models, setModels] = useState<{ label: string; value: string }[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  const [registeredAnnonceId, setRegisteredAnnonceID] = useState(null);

  // UseStates pour la gestion d'images
  const [modalVisible, setModalVisible] = useState({
    state: false,
    type: [],
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [manipIndex, setManipIndex] = useState(null);

  const user = useSelector((state: any) => state.auth.userLogin);

  // Surveillance des champs clés pour la logique conditionnelle
  const transaction = watch("transaction");
  const condition = watch("condition");
  const type = watch("type");
  const mark = watch("mark");

  // Helpers pour formater les données des marques et modèles
  const getBrandLabels = (brandsAndModels: any[]) => {
    return brandsAndModels.map((brandData: any) => ({
      label: brandData.brand,
      value: brandData.brand,
    }));
  };

  // Initialisation des marques/modèles si item existe
  useEffect(() => {
    if (item?.annonce.vehicle.type) {
      const brands =
        item.annonce.vehicle.type === "Voiture"
          ? carBrandsAndModels
          : motoBrandsAndModels;
      setBrandsItem(getBrandLabels(brands));
      setBrandsAllData(brands);
      if (item.annonce.vehicle.mark) {
        setModels(getModelLabels(item.annonce.vehicle.mark));
      }
    }
  }, [item]);

  const getModelLabels = (brandName: string) => {
    const brand = brandsAllData.find((b: any) => b.brand === brandName);
    return brand
      ? brand.models.map((model: string) => ({ label: model, value: model }))
      : [];
  };

  // Gestion de la soumission du formulaire par étape
  const onSubmit = async (data: PostPageData) => {
    setButtonDisabled(true);
    if (step == totalStep) {
      if (images.length == 0) {
        setImageError(true);
      } else {
        const uploadedImages = await handleUploadImages();

        // Preparer le formulaire
        const formToSend = {
          annonce: {
            userId: user.userId,
            title: data.title,
            price: data.price,
            transaction: data.transaction,
            quantity: parseInt(data.quantity),
            city: data.city,
            phoneNumber: data.phoneNumber,
          },
          vehicle: {
            type: data.type,
            mark: data.mark,
            model: data.model,
            year: parseInt(data.year),
            gearbox: data.gearbox,
            climatisation: data.climatisation,
            condition: data.condition,
            fuelType: data.fuelType,
            klm_counter: data.klm_counter,
            description: data.description,
          },
          images: uploadedImages,
        };

        try {
          let response: any;
          if (item) {
            // Mise à jour d'une annonce existante
            response = await api.put(
              `/annonces/${item.annonce.annonceId}`,
              formToSend
            );
          } else {
            // Création d'une nouvelle annonce
            response = await api.post("/annonces", formToSend);
          }

          const annonceId = await response.data.data.annonce.annonceId;
          setRegisteredAnnonceID(annonceId);
          setStep(step + 1);
        } catch (error) {
          if (!error.response) {
            setError("Une erreur est survenue, veuillez réessayez");
            handleTimeOutError();
          } else {
            setError(
              error.response.data.message ||
                "Une erreur est survenue lors de la création de l'annonce"
            );
            handleTimeOutError();
          }
        }
      }
    } else {
      // Logique spécifique pour chaque étape
      switch (step) {
        case 1:
          if (transaction !== "Vente" || condition !== "Neuf") {
            setValue("quantity", "1");
          }

          // Configuration des marques selon le type de véhicule
          if (type === "Voiture") {
            setBrandsItem(getBrandLabels(carBrandsAndModels));
            setBrandsAllData(carBrandsAndModels);
          } else if (type === "Moto") {
            setBrandsItem(getBrandLabels(motoBrandsAndModels));
            setBrandsAllData(motoBrandsAndModels);
          }
          break;
        case 2:
          // Valeurs par défaut pour les champs optionnels
          if (!data.klm_counter) {
            setValue("klm_counter", "0");
          }
          if (!data.phoneNumber) {
            setValue("phoneNumber", "");
          }
          break;
        case 3:
          if (!data.description) {
            setValue("description", "");
          }
          break;
      }

      // Incrémentation de l'étape
      setStep(step + 1);

      // Restauration des erreurs
      setTimeout(() => {
        reset({}, { keepValues: true });
      }, 50);
    }
    setButtonDisabled(false);
  };

  const handleUploadImages = async () => {
    try {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const result = await uploadImage(image.imageUrl);
          return result;
        })
      );

      return uploadedImages;
    } catch (error) {
      setError("Erreur lors de l'upload de l'image, veuillez réessayer");
      console.error(error);
      handleTimeOutError();
    }
  };

  // Navigation
  const goToHome = () => {
    navigation.reset({
      routes: [{ name: "BottomBar" }],
    });
  };

  const goToPreviousStep = () => {
    if (step == 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  // Gestion des images
  const handleAddImage = async () => {
    try {
      setImageLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // Vérification si l'upload est correct
      if (!result.canceled) {
        setImages((prevImages) => [
          ...prevImages,
          { imageUrl: result.assets[0].uri },
        ]);
      }
    } catch (error) {
      setError("Erreur lors de l'upload de l'image, veuillez réessayer");
      handleTimeOutError();
    } finally {
      // Fermer le modal
      setModalVisible({
        state: false,
        type: [],
      });
      setImageLoading(false);
    }
  };

  // Effacer l'erreur après un certain temps (4s)
  const handleTimeOutError = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  // Revenir dans la page d'accueil
  const resetToHome = () => {
    navigation.reset({
      routes: [{ name: "BottomBar" }],
    });
  };

  const handleLookAnnonce = async () => {
    try {
      const registeredAnnonceId = 18;
      const response = await api.get(`/annonces/${registeredAnnonceId}`);

      const annonceWithUser = await response.data.data;
      const item = getAnnonceInfo(annonceWithUser);

      if (item) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "AnnounceDetails", params: { item } }],
          })
        );
      }
    } catch (error) {
      setError(
        "Erreur lors de la récupération de l'annonce, veuillez réessayer"
      );
      handleTimeOutError();
    }
  };

  const handleModifyImage = async () => {
    try {
      setImageLoading(true);
      // Récupération de l'image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // Vérification si l'upload est correct
      if (!result.canceled) {
        setImages((prev) => prev.filter((_, index) => index !== manipIndex));
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages.splice(manipIndex, 0, { imageUrl: result.assets[0].uri });
          return newImages;
        });
        setManipIndex(null);
      }
    } catch (error) {
      setError(
        "Une erreur est survenue lors de la modification de l'image, veuillez réessayer"
      );
      handleTimeOutError();
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImages((prev) => prev.filter((_, index) => index !== manipIndex));
  };

  // Effets secondaires pour la gestion des images et des modèles
  useEffect(() => {
    if (images.length >= 1) {
      setImageError(false);
    }
  }, [imageError, images.length]);

  useEffect(() => {
    if (step == 2 && mark) {
      setModels(getModelLabels(mark));
      setValue("model", undefined);
    }
  }, [mark]);

  // Gestion des erreurs de quantité selon le type de transaction
  useEffect(() => {
    if (
      (transaction && condition && transaction !== "Vente") ||
      (condition !== "Neuf" && errors.quantity)
    ) {
      clearErrors("quantity");
    }
  }, [transaction, condition, errors]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <PageHeader onPress={goToPreviousStep} cancelPress={goToHome} />

      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddImage={handleAddImage}
        handleModifyImage={handleModifyImage}
        handleRemoveImage={handleRemoveImage}
        imageLoading={imageLoading}
      />

      <View style={globalStyles.body}>
        {step != 5 && (
          <>
            <OperationLogo
              title={item ? "Modification d'annonce" : "Création d'annonce"}
            />
            <SecondaryBody step={step} totalStep={totalStep}>
              {/* Étape 1: Informations de base */}
              {step == 1 && (
                <>
                  <Input
                    label={"Titre de votre annonce"}
                    binding={true}
                    placeholder={"Ex: (Rolls Royce Phantom)"}
                    icon={faHeading}
                    control={control}
                    name="title"
                    marginTop={false}
                    rules={{
                      required: "Le titre est requis",
                      minLength: {
                        value: 5,
                        message: "Un titre doit avoir minimum 5 caractères",
                      },
                      maxLength: {
                        value: 40,
                        message: "Un titre doit avoir maximum 40 caractères",
                      },
                    }}
                  />

                  <Input
                    label={"Prix"}
                    binding={true}
                    placeholder={"Ex: (50 000)"}
                    icon={faMoneyBill}
                    rightIcon={faEuroSign}
                    control={control}
                    name="price"
                    rules={{
                      required: "Le prix est requis",
                      pattern: {
                        value: /^(?!.*  )[0-9 ]+$/,
                        message:
                          "Vous devez mettre uniquement des chiffres et un espace à la fois",
                      },
                      minLength: {
                        value: 2,
                        message: "Le prix doit avoir minimum 2 chiffres",
                      },
                    }}
                  />

                  <Input
                    label={"Type de véhicule"}
                    binding={true}
                    placeholder={"Ex: (Voitures)"}
                    icon={faLayerGroup}
                    items={typeVehiculeItems}
                    type={"select"}
                    defaultSelect={getValues("type")}
                    control={control}
                    name="type"
                    rules={{
                      required: "Le type de véhicule est requis",
                    }}
                  />

                  <Input
                    label={"Type de transaction"}
                    binding={true}
                    placeholder={"Ex: (Location)"}
                    icon={faExchangeAlt}
                    items={transactionItems}
                    type={"select"}
                    defaultSelect={getValues("transaction")}
                    control={control}
                    name="transaction"
                    rules={{
                      required: "Le type de transaction est requis",
                    }}
                  />

                  <Input
                    label={"Condition du véhicule"}
                    binding={true}
                    placeholder={"Ex: (Neuf)"}
                    icon={faTachometerAlt}
                    items={conditionItems}
                    type={"select"}
                    defaultSelect={getValues("condition")}
                    control={control}
                    name="condition"
                    rules={{
                      required: "La condition du véhicule est requise",
                    }}
                  />

                  {transaction == "Vente" && condition == "Neuf" && (
                    <Input
                      label={"Quantité"}
                      binding={true}
                      placeholder={"Ex: (1)"}
                      icon={faBoxes}
                      control={control}
                      name="quantity"
                      rules={{
                        required: "La quantité est requise",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Vous devez mettre uniquement des chiffres",
                        },
                      }}
                    />
                  )}
                </>
              )}

              {/* Étape 2: Détails techniques */}
              {step == 2 && (
                <>
                  <Input
                    label={"Ville"}
                    binding={true}
                    placeholder={"Ex: (Corte, 20250)"}
                    icon={faCity}
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

                  <Input
                    label={"Marque"}
                    binding={true}
                    placeholder={"Ex: (Ford)"}
                    icon={faTags}
                    control={control}
                    name="mark"
                    type="select"
                    defaultSelect={getValues("mark")}
                    items={brandsItem}
                    search={true}
                    rules={{
                      required: "La marque est requise",
                      minLength: {
                        value: 2,
                        message: "Une marque doit avoir minimum 2 caractères",
                      },
                    }}
                  />

                  {models && (
                    <Input
                      label={"Modèle"}
                      binding={true}
                      placeholder={"Ex: (Mustang)"}
                      icon={faClipboardList}
                      control={control}
                      name="model"
                      type="select"
                      defaultSelect={getValues("model")}
                      items={models}
                      search={true}
                      rules={{
                        required: "Le modèle est requis",
                        minLength: {
                          value: 2,
                          message: "Un modèle doit avoir minimum 2 caractères",
                        },
                      }}
                    />
                  )}

                  <Input
                    label={"Année"}
                    binding={true}
                    placeholder={"Ex: (2024)"}
                    icon={faCalendarAlt}
                    control={control}
                    name="year"
                    rules={{
                      required: "L'année est requise",
                      pattern: {
                        value: /^(19|20)\d{2}$/,
                        message: "Veuillez entrer une année valide",
                      },
                    }}
                  />

                  <Input
                    label={"Type de carburant"}
                    binding={true}
                    placeholder={"Ex: (Essence)"}
                    icon={faGasPump}
                    control={control}
                    name="fuelType"
                    type="select"
                    defaultSelect={getValues("fuelType")}
                    items={fuelTypeItems}
                    rules={{
                      required: "Le type de carburant est requis",
                    }}
                  />

                  <Input
                    label={"Type de boîte"}
                    binding={true}
                    placeholder={"Ex: (Manuel)"}
                    icon={faGears}
                    control={control}
                    name="gearbox"
                    type="select"
                    defaultSelect={getValues("gearbox")}
                    items={typeGearBoxItems}
                    rules={{
                      required: "Le type de boîte est requis",
                      minLength: {
                        value: 2,
                        message:
                          "Le type de boîte doit avoir minimum 2 caractères",
                      },
                    }}
                  />

                  <Input
                    label={"Climatisation"}
                    binding={true}
                    placeholder={"Ex: (Très bonne état)"}
                    icon={faWind}
                    control={control}
                    name="climatisation"
                    type="select"
                    items={climatisationItems}
                    defaultSelect={getValues("climatisation")}
                    rules={{
                      required: "La climatisation est requise",
                      minLength: {
                        value: 2,
                        message:
                          "La climatisation doit avoir minimum 2 caractères",
                      },
                    }}
                  />

                  <Input
                    label={"Kilométrage"}
                    binding={false}
                    placeholder={"Ex: (10 000)"}
                    icon={faRoad}
                    control={control}
                    rightText={"KM"}
                    name="klm_counter"
                    rules={{
                      pattern: {
                        value: /^(?!.*  )[0-9 ]+$/,
                        message:
                          "Vous devez mettre uniquement des chiffres et un espace à la fois",
                      },
                    }}
                  />

                  <Input
                    label={"Numéro de téléphone à contacter"}
                    binding={false}
                    placeholder={"Ex: (0780853613)"}
                    icon={faPhone}
                    control={control}
                    name="phoneNumber"
                    rules={{
                      pattern: {
                        value: /^0[1-9]\d{8}$/,
                        message:
                          "Veuillez respecter le format d'un numéro de téléphone",
                      },
                    }}
                  />
                </>
              )}

              {/* Étape 3: Description */}
              {step == 3 && (
                <Input
                  label={"Description"}
                  binding={false}
                  placeholder={"Ajoutez une description à votre annonce"}
                  control={control}
                  name="description"
                  multiline={true}
                />
              )}

              {/* Étape 4: Gestion des images */}
              {step == 4 && (
                <>
                  <Text style={styles.imageSectionTitle}>
                    Ajoutez une nouvelle images en cliquant sur le bouton
                    ci-dessous
                  </Text>
                  <Text style={styles.imageSectionSubTitle}>
                    PS: La première image est celle qui doit donner le plus
                    d'impression
                  </Text>

                  <Pressable
                    style={styles.imageIconContainer}
                    onPress={() =>
                      setModalVisible({
                        state: true,
                        type: ["add"],
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faCamera} size={ms(50)} />
                    <FontAwesomeIcon
                      icon={faPlus}
                      size={ms(20)}
                      style={styles.plusIcon}
                    />
                  </Pressable>

                  <Text style={styles.numberImage}>{images.length}/10</Text>

                  {imageError && (
                    <Text style={styles.errorImage}>
                      Veuillez ajouter au moins une image
                    </Text>
                  )}

                  {/* Affichage des images */}
                  {images.length >= 1 && (
                    <View style={styles.imagesContainer}>
                      {images.map((image, index) => (
                        <View key={index} style={styles.imageCard}>
                          <Image
                            source={{ uri: image.imageUrl }}
                            style={{
                              width: "50%",
                              height: ms(120),
                              borderRadius: ms(15),
                              overflow: "hidden",
                            }}
                            resizeMode="stretch"
                          />

                          <ButtonEdit
                            onPress={() => {
                              setModalVisible({
                                state: true,
                                type: ["update"],
                              });

                              setManipIndex(index);
                            }}
                            style={{
                              position: "absolute",
                              bottom: ms(8),
                              left: ms(8),
                            }}
                          />

                          <ButtonDelete
                            onPress={() => {
                              setModalVisible({
                                state: true,
                                type: ["remove"],
                              });

                              setManipIndex(index);
                            }}
                            style={{
                              position: "absolute",
                              bottom: ms(8),
                              right: ms(8),
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </>
              )}

              <ValidationButton
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                text={step == totalStep ? "Poster" : "Continuer"}
                errors={errors}
                disabled={buttonDisabled}
                loading={buttonDisabled}
              />
              {error && <ErrorText>{error}</ErrorText>}
            </SecondaryBody>
          </>
        )}

        {step == 5 && (
          <ValidationSection
            onBackHome={resetToHome}
            onLookAnnonce={handleLookAnnonce}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PostPage;

// Styles pour la mise en page et l'apparence des composants
const styles = StyleSheet.create({
  imageSectionTitle: {
    fontSize: ms(16),
    textDecorationLine: "underline",
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginTop: ms(20),
    color: colors.textColor,
  },
  imageSectionSubTitle: {
    fontSize: ms(12),
    fontFamily: "Inter-Italic",
    textAlign: "center",
    marginTop: ms(10),
  },
  imageIconContainer: {
    marginTop: ms(10),
    alignSelf: "center",
    backgroundColor: colors.primary,
    width: ms(100),
    height: ms(100),
    borderRadius: ms(50),
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.textColor,
    borderWidth: ms(2),
  },
  plusIcon: {
    position: "absolute",
    top: ms(13),
    right: ms(13),
  },
  numberImage: {
    fontSize: ms(16),
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginTop: ms(20),
    color: colors.textColor,
  },
  errorImage: {
    color: "red",
    textAlign: "center",
    fontSize: ms(15),
    fontFamily: "Inter-Medium",
    marginTop: ms(20),
    marginBottom: ms(10),
  },
  imagesContainer: {
    alignItems: "center",
    gap: ms(30),
    marginTop: ms(20),
    marginBottom: ms(30),
  },
  imageCard: {
    backgroundColor: colors.primary,
    borderRadius: ms(15),
    paddingVertical: ms(20),
    width: "100%",
    alignItems: "center",
  },
});
