/** @format */

// Import des dépendances React et React Native nécessaires
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import globalStyles from "../../globals/globalStyles";
import {
  ButtonDelete,
  ButtonEdit,
  DisplayImagesEdit,
  Input,
  PageHeader,
  StateButton,
  StateButtonWithTitle,
  ValidationButton,
  ModalImage,
  ErrorText,
  SuccessText,
} from "../../components";
import { colors } from "../../globals/colors";
import { ms } from "react-native-size-matters";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBoxes,
  faCalendarAlt,
  faCamera,
  faCity,
  faClipboardList,
  faCrown,
  faEuroSign,
  faExchangeAlt,
  faEye,
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
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import api from "../../axios/api";
import { uploadImage } from "../../lib/cloundinary";

// Définition des interfaces pour les props et le formulaire
interface AnnounceEditProps {
  route: {
    params: {
      item: {
        annonce: {
          annonceId: number;
          title: string;
          images: Array<{ imageUrl: string }>;
          transaction: string;
          vehicle: {
            vehicleId: number;
            condition: string;
            description: string;
            mark: string;
            model: string;
            year: number;
            gearbox: string;
            fuelType: string;
            klmCounter: string;
            climatisation: string;
            type: string;
          };
          price: string;
          city: string;
          phoneNumber: string;
          quantity: number;
          annonceState: string;
          endDate: string;
          premium: boolean;
          premiumExpiration: string;
        };
        user: {
          userId: number;
          firstName: string;
          lastName: string;
          urlImageUser: string;
        };
      };
    };
  };
}

// Interface définissant la structure des données du formulaire d'édition d'annonce
interface AnnounceEditData {
  title: string;
  price: string;
  type: string;
  transaction: string;
  condition: string;
  quantity: string;
  city: string;
  mark: string;
  model: string;
  year: string;
  gearbox: string;
  climatisation: string;
  klm_counter: string;
  phoneNumber: string;
  description: string;
  fuelType: string;
  images: Array<{
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

// Options disponibles pour les différents sélecteurs
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

// Composant principal pour l'édition d'une annonce
const AnnounceEdit: React.FC<AnnounceEditProps> = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation<NavigationProp<any>>();

  // Configuration du formulaire avec React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<AnnounceEditData>({
    defaultValues: {
      title: item.annonce.title,
      price: item.annonce.price.toString(),
      type: item.annonce.vehicle.type,
      transaction: item.annonce.transaction,
      condition: item.annonce.vehicle.condition,
      quantity: item.annonce.quantity?.toString(),
      city: item.annonce.city,
      mark: item.annonce.vehicle.mark,
      model: item.annonce.vehicle.model,
      year: item.annonce.vehicle.year?.toString(),
      gearbox: item.annonce.vehicle.gearbox,
      climatisation: item.annonce.vehicle.climatisation,
      klm_counter: item.annonce.vehicle.klmCounter?.toString(),
      phoneNumber: item.annonce.phoneNumber,
      description: item.annonce.vehicle.description,
      fuelType: item.annonce.vehicle.fuelType,
      images: item.annonce.images,
    },
  });

  // États locaux pour gérer les différents aspects de l'interface
  const [successMessage, setSuccessMessage] = useState("");
  const [images, setImages] = useState(item.annonce.images);
  const [expirationDate, setExpirationDate] = useState("");
  const [premiumExpirationDate, setPremiumExpirationDate] = useState("");
  const [imageError, setImageError] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    state: false,
    type: [],
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [manipIndex, setManipIndex] = useState(null);
  const [error, setError] = useState("");

  const [successImage, setSuccessImage] = useState("");
  const [errorImage, setErrorImage] = useState("");

  // Gestion de la soumission du formulaire
  const onSubmit = async (data: AnnounceEditData) => {
    try {
      // Préparation des données pour la mise à jour de l'annonce
      const annonceUpdateDTO = {
        annonce: {
          annonceId: item.annonce.annonceId,
          title: data.title,
          price: data.price,
          quantity: parseInt(data.quantity || "0"),
          transaction: data.transaction,
          city: data.city,
          phoneNumber: data.phoneNumber,
        },
        vehicle: {
          type: data.type,
          mark: data.mark,
          model: data.model,
          year: parseInt(data.year || "0"),
          gearbox: data.gearbox,
          climatisation: data.climatisation,
          condition: data.condition,
          fuelType: data.fuelType,
          klmCounter: parseInt(data.klm_counter || "0"),
          description: data.description,
        },
        images: images.map((image) => image.imageUrl),
      };

      // Logique d'envoi des données au serveur
      const response = await api.put(
        `/annonces/${item.annonce.annonceId}`,
        annonceUpdateDTO
      );

      if (response.status === 200) {
        setSuccessMessage("Modification réussie !");
        handleTimeOutSuccess();
      } else {
        setError("Une erreur est survenue lors de la mise à jour de l'annonce");
        handleTimeOutError();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      setError("Une erreur est survenue lors de la mise à jour de l'annonce");
      handleTimeOutError();
    }
  };

  // Fonctions de gestion des images
  const handleTimeOutError = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  // Fonctions de gestion des images
  const handleTimeOutSuccess = () => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  // Fonctions de gestion des images
  const handleTimeOutErrorImage = () => {
    setTimeout(() => {
      setErrorImage("");
    }, 4000);
  };

  // Fonctions de gestion des images
  const handleTimeOutSuccessImage = () => {
    setTimeout(() => {
      setSuccessImage("");
    }, 4000);
  };

  const handleAddImage = async () => {
    try {
      setImageLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Upload de l'image sur Cloudinary
        const uploadedImageUrl = await uploadImage(result.assets[0].uri);

        const newImages = [
          ...images,
          {
            imageId: Date.now(),
            imageUrl: uploadedImageUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        setImages(newImages);

        // Mise à jour via l'API
        const annonceUpdateDTO = {
          annonce: {
            annonceId: item.annonce.annonceId,
            title: getValues("title"),
            price: getValues("price"),
            quantity: parseInt(getValues("quantity") || "0"),
            transaction: getValues("transaction"),
            city: getValues("city"),
            phoneNumber: getValues("phoneNumber"),
          },
          vehicle: {
            type: getValues("type"),
            mark: getValues("mark"),
            model: getValues("model"),
            year: parseInt(getValues("year") || "0"),
            gearbox: getValues("gearbox"),
            climatisation: getValues("climatisation"),
            condition: getValues("condition"),
            fuelType: getValues("fuelType"),
            klmCounter: parseInt(getValues("klm_counter") || "0"),
            description: getValues("description"),
          },
          images: newImages.map((image) => image.imageUrl),
        };

        const response = await api.put(
          `/annonces/${item.annonce.annonceId}`,
          annonceUpdateDTO
        );

        if (response.status !== 200) {
          setErrorImage("Erreur lors de la mise à jour");
          handleTimeOutErrorImage();
          return;
        }

        setSuccessImage("Image ajoutée avec succès !");
        handleTimeOutSuccessImage();
      }
    } catch (error) {
      setErrorImage("Une erreur est survenue lors de l'ajout de l'image");
      handleTimeOutErrorImage();
    } finally {
      setModalVisible({
        state: false,
        type: [],
      });
      setImageLoading(false);
    }
  };

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
        // Upload de l'image sur Cloudinary
        const uploadedImageUrl = await uploadImage(result.assets[0].uri);

        const newImages = [...images];
        newImages[manipIndex] = {
          imageUrl: uploadedImageUrl,
        };
        setImages(newImages);

        // Mise à jour via l'API
        const annonceUpdateDTO = {
          annonce: {
            annonceId: item.annonce.annonceId,
            title: getValues("title"),
            price: getValues("price"),
            quantity: parseInt(getValues("quantity") || "0"),
            transaction: getValues("transaction"),
            city: getValues("city"),
            phoneNumber: getValues("phoneNumber"),
          },
          vehicle: {
            type: getValues("type"),
            mark: getValues("mark"),
            model: getValues("model"),
            year: parseInt(getValues("year") || "0"),
            gearbox: getValues("gearbox"),
            climatisation: getValues("climatisation"),
            condition: getValues("condition"),
            fuelType: getValues("fuelType"),
            klmCounter: parseInt(getValues("klm_counter") || "0"),
            description: getValues("description"),
          },
          images: newImages.map((image) => image.imageUrl),
        };

        const response = await api.put(
          `/annonces/${item.annonce.annonceId}`,
          annonceUpdateDTO
        );

        if (response.status !== 200) {
          setErrorImage("Erreur lors de la mise à jour");
          handleTimeOutErrorImage();
          return;
        }

        setSuccessImage("Image modifiée avec succès !");
        handleTimeOutSuccessImage();
        setManipIndex(null);
      }
    } catch (error) {
      setErrorImage(
        "Une erreur est survenue lors de la modification de l'image"
      );
      handleTimeOutErrorImage();
    } finally {
      setModalVisible({
        state: false,
        type: [],
      });
      setImageLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    setModalVisible({
      state: false,
      type: [],
    });
    try {
      if (images.length <= 1) {
        setImageError(true);
        setTimeout(() => {
          setImageError(false);
        }, 3000);
        return;
      }

      const newImages = images.filter((_, index) => index !== manipIndex);
      setImages(newImages);

      // Mise à jour via l'API
      const annonceUpdateDTO = {
        annonce: {
          annonceId: item.annonce.annonceId,
          title: getValues("title"),
          price: getValues("price"),
          quantity: parseInt(getValues("quantity") || "0"),
          transaction: getValues("transaction"),
          city: getValues("city"),
          phoneNumber: getValues("phoneNumber"),
        },
        vehicle: {
          type: getValues("type"),
          mark: getValues("mark"),
          model: getValues("model"),
          year: parseInt(getValues("year") || "0"),
          gearbox: getValues("gearbox"),
          climatisation: getValues("climatisation"),
          condition: getValues("condition"),
          fuelType: getValues("fuelType"),
          klmCounter: parseInt(getValues("klm_counter") || "0"),
          description: getValues("description"),
        },
        images: newImages.map((image) => image.imageUrl),
      };

      const response = await api.put(
        `/annonces/${item.annonce.annonceId}`,
        annonceUpdateDTO
      );

      if (response.status !== 200) {
        setErrorImage("Erreur lors de la mise à jour");
        handleTimeOutErrorImage();
        return;
      }

      setSuccessImage("Image supprimée avec succès !");
      handleTimeOutSuccessImage();
      setManipIndex(null);
    } catch (error) {
      setErrorImage(
        "Une erreur est survenue lors de la suppression de l'image"
      );
      handleTimeOutErrorImage();
    }
  };
  // Effet pour mettre à jour les dates d'expiration périodiquement
  useEffect(() => {
    if (item.annonce.annonceState !== "INACTIVE") {
      formatDateTime(item.annonce.endDate, "expirationDate");
      if (item.annonce.premium) {
        formatDateTime(item.annonce.premiumExpiration, "premiumExpirationDate");
      }

      const id = setInterval(() => {
        formatDateTime(item.annonce.endDate, "expirationDate");
        if (item.annonce.premium) {
          formatDateTime(
            item.annonce.premiumExpiration,
            "premiumExpirationDate"
          );
        }
      }, 6000);

      return () => clearInterval(id);
    }
  }, []);

  // Fonction utilitaire pour formater les dates d'expiration
  const formatDateTime = (expirationDate: string, origin: string) => {
    const expirationD = new Date(expirationDate);
    const actualDate = new Date();

    const diffMs = expirationD.getTime() - actualDate.getTime();

    const jours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const heures = Math.ceil(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const formattedTime = `${jours} ${
      jours > 1 ? "jours" : "jour"
    } et ${heures} ${heures > 1 ? "heures" : "heure"}`;

    if (origin === "expirationDate") {
      setExpirationDate(formattedTime);
    } else if (origin === "premiumExpirationDate") {
      setPremiumExpirationDate(formattedTime);
    }
  };

  // Rendu du composant avec une ScrollView comme conteneur principal
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <PageHeader
        onPress={() => navigation.goBack()}
        title={item.annonce.title}
      />

      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddImage={handleAddImage}
        handleModifyImage={handleModifyImage}
        handleRemoveImage={handleRemoveImage}
        imageLoading={imageLoading}
      />

      <View style={[globalStyles.body, { backgroundColor: colors.secondary }]}>
        <Text
          style={{
            fontSize: ms(20),
            fontFamily: "Inter-ExtraBold",
            color: colors.textColor,
          }}
        >
          Modification de l'annonce
        </Text>

        {/* Section récapitulative de l'annonce */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recapitulatif</Text>

          <DisplayImagesEdit allSpace={70} images={item.annonce.images} />

          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {item.annonce.title}
          </Text>

          <Text style={styles.subTitle}>
            Type de véhicule:{" "}
            <Text style={styles.subTitleContent}>
              {item.annonce.vehicle.type}
            </Text>
          </Text>
          <Text style={styles.subTitle}>
            Etat du véhicule:{" "}
            <Text style={styles.subTitleContent}>
              {item.annonce.vehicle.condition}
            </Text>
          </Text>
          <Text style={styles.subTitle}>
            Sorte de transaction:{" "}
            <Text style={styles.subTitleContent}>
              {item.annonce.transaction}
            </Text>
          </Text>
          <Text style={styles.subTitle}>
            Prix:{" "}
            <Text style={styles.subTitleContent}>{item.annonce.price}</Text>
          </Text>
          <Text style={styles.subTitle}>
            Type de carburant:{" "}
            <Text style={styles.subTitleContent}>
              {item.annonce.vehicle.fuelType}
            </Text>
          </Text>
          <Text style={styles.subTitle}>
            Boite de transmission:{" "}
            <Text style={styles.subTitleContent}>
              {item.annonce.vehicle.gearbox}
            </Text>
          </Text>
          {item.annonce.transaction == "Vente" && (
            <Text style={styles.subTitle}>
              Quantité:{" "}
              <Text style={styles.subTitleContent}>
                {item.annonce.quantity}
              </Text>
            </Text>
          )}
          <Text style={styles.subTitle}>
            Lieu de vente:{" "}
            <Text style={styles.subTitleContent}>{item.annonce.city}</Text>
          </Text>
        </View>

        {/* Section état de l'annonce avec gestion premium/standard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Etat de l'annonce</Text>

          {item.annonce.premium && (
            <>
              <View style={styles.premiumAnnonce}>
                <Text style={styles.premiumAnnonceText}>
                  Votre annonce est en premium
                </Text>
                <FontAwesomeIcon
                  icon={faCrown}
                  size={ms(20)}
                  color={colors.accentTertiary}
                />
              </View>

              <Text style={styles.premiumAnnonceExpirateDate}>
                Temps restant: {premiumExpirationDate}
              </Text>
            </>
          )}

          {item.annonce.annonceState == "loué" && (
            <>
              <Text style={styles.annonceStateInfo}>
                Ce véhicule a été loué
              </Text>
              <Text style={styles.annonceStateInfoSubTitle}>
                Et n'est pas visible par les autres utilisateurs
              </Text>
            </>
          )}

          {item.annonce.annonceState !== "loué" && (
            <StateButtonWithTitle
              title={`Marquer votre article comme ${
                item.annonce.transaction == "Vente" ? "vendu" : "loué"
              }`}
              marginTop={ms(0)}
              onPress={() => console.log("test")}
              color={colors.tertiary}
            />
          )}

          {item.annonce.annonceState !== "loué" && (
            <StateButtonWithTitle
              title="Relancer l'annonce"
              marginTop={ms(25)}
              onPress={() => console.log("test")}
              color={colors.tertiary}
            />
          )}

          {item.annonce.annonceState == "loué" && (
            <StateButtonWithTitle
              title="Remettre l'annonce en location"
              marginTop={ms(0)}
              onPress={() => console.log("test")}
              color={colors.tertiary}
            />
          )}

          {item.annonce.annonceState !== "loué" && (
            <StateButtonWithTitle
              title="Retirer l'annonce"
              marginTop={ms(25)}
              onPress={() => console.log("test")}
              color={colors.accentRed}
            />
          )}

          {item.annonce.annonceState !== "loué" && (
            <StateButton
              color={colors.tertiary}
              fontSize={ms(14)}
              paddingVertical={ms(10)}
              paddingHorizontal={ms(35)}
              marginTop={ms(30)}
              onPress={() => navigation.navigate("AnnounceDetails", { item })}
              icon={
                <FontAwesomeIcon
                  icon={faEye}
                  size={ms(15)}
                  color={colors.tertiary}
                />
              }
              content="Voir le rendu de votre annonce"
              width={"full"}
              fontFamily={"Inter-ExtraBold"}
            />
          )}

          {!item.annonce.premium && item.annonce.annonceState !== "loué" && (
            <StateButton
              color={colors.tertiary}
              fontSize={ms(14)}
              paddingVertical={ms(10)}
              paddingHorizontal={ms(35)}
              marginTop={ms(15)}
              onPress={() => console.log("test")}
              icon={
                <FontAwesomeIcon
                  icon={faCrown}
                  size={ms(15)}
                  color={colors.tertiary}
                />
              }
              content="Mettre cette annonce en premium"
              width={"full"}
              fontFamily={"Inter-ExtraBold"}
            />
          )}

          {item.annonce.annonceState !== "loué" && (
            <View style={styles.expirationDate}>
              <Text style={styles.expirationDateContent}>
                Votre annonce s'expire dans: {expirationDate}
              </Text>
            </View>
          )}
        </View>

        {/* Section formulaire d'édition des informations */}
        {item.annonce.annonceState !== "loué" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations</Text>

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
              placeholder={"Ex: (50000)"}
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
              rules={{
                required: "La marque est requise",
                minLength: {
                  value: 2,
                  message: "Une marque doit avoir minimum 2 caractères",
                },
              }}
            />

            <Input
              label={"Modèle"}
              binding={true}
              placeholder={"Ex: (Mustang GT)"}
              icon={faClipboardList}
              control={control}
              name="model"
              rules={{
                required: "Le modèle est requis",
                minLength: {
                  value: 2,
                  message: "Un modèle doit avoir minimum 2 caractères",
                },
              }}
            />

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
              items={fuelTypeItems}
              defaultSelect={getValues("fuelType")}
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
              items={typeGearBoxItems}
              defaultSelect={getValues("gearbox")}
              rules={{
                required: "Le type de boîte est requis",
                minLength: {
                  value: 2,
                  message: "Le type de boîte doit avoir minimum 2 caractères",
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
              defaultSelect={String(getValues("climatisation"))}
              rules={{
                required: "La climatisation est requise",
                minLength: {
                  value: 2,
                  message: "La climatisation doit avoir minimum 2 caractères",
                },
              }}
            />

            <Input
              label={"Kilométrage"}
              binding={false}
              placeholder={"Ex: (10000)"}
              icon={faRoad}
              control={control}
              rightText={"KM"}
              name="klm_counter"
              rules={{
                pattern: {
                  value: /^(?!.*  )[0-9 ]+$/,
                  message: "Vous devez mettre uniquement des chiffres et un espace à la fois",
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

            <Input
              label={"Description"}
              binding={false}
              placeholder={"Ajoutez une description à votre annonce"}
              control={control}
              name="description"
              multiline={true}
            />

            <ValidationButton
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              text={"Modifier"}
              errors={errors}
              messageError={
                "Modification non réussie, veuillez corriger les erreurs ci-dessus."
              }
            />
            {successMessage && <SuccessText>{successMessage}</SuccessText>}
            {error && <ErrorText>{error}</ErrorText>}
          </View>
        )}

        {/* Section de gestion des images */}
        {item.annonce.annonceState !== "loué" && (
          <View style={[styles.section]}>
            <Text style={styles.imageSectionTitle}>
              Ajoutez une nouvelle images en cliquant sur le bouton ci-dessous
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
                Il faut au moins une image dans l'annonce
              </Text>
            )}

            {errorImage && <ErrorText>{errorImage}</ErrorText>}
            {successImage && <SuccessText>{successImage}</SuccessText>}

            {/* Affichage des images avec options d'édition */}
            {images.length > 0 && (
              <View style={styles.imagesContainer}>
                {images.map((image, index) => (
                  <View key={index} style={styles.imageCard}>
                    <Image
                      source={
                        image.imageUrl
                          ? { uri: image.imageUrl }
                          : require("../../assets/Audi.png")
                      }
                      style={{
                        width: "60%",
                        height: ms(120),
                        borderRadius: ms(20),
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
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AnnounceEdit;

// Styles pour le composant
const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.primary,
    paddingVertical: ms(20),
    paddingHorizontal: ms(20),
    borderRadius: ms(10),
    marginTop: ms(20),
    position: "relative",
  },
  expirationDate: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: ms(17),
    fontFamily: "Inter-Bold",
    marginTop: ms(20),
    color: colors.textColor,
  },
  subTitle: {
    marginTop: ms(5),
    fontSize: ms(15),
    fontFamily: "Inter-Bold",
    color: colors.textColor,
  },
  subTitleContent: {
    marginTop: ms(5),
    fontSize: ms(15),
    fontFamily: "Inter-Medium",
    color: colors.textColor,
  },
  sectionTitle: {
    fontSize: ms(19),
    fontFamily: "Inter-Bold",
    marginBottom: ms(30),
    color: colors.textColor,
  },
  annonceStateInfo: {
    fontSize: ms(18),
    fontFamily: "Inter-SemiBold",
    textDecorationColor: colors.textColor,
    textDecorationLine: "underline",
    textAlign: "center",
    color: colors.textColor,
  },
  annonceStateInfoSubTitle: {
    marginBottom: ms(20),
    fontSize: ms(12),
    fontFamily: "Inter-Italic",
    color: colors.textOpacity,
    textAlign: "center",
    marginTop: ms(3),
  },
  successMessage: {
    color: colors.accentGreen,
    fontSize: ms(13),
    fontFamily: "Inter-Medium",
    marginTop: ms(10),
    textAlign: "center",
  },
  premiumAnnonce: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(5),
    alignSelf: "center",
  },
  premiumAnnonceText: {
    color: colors.accentTertiary,
    fontSize: ms(18),
    fontFamily: "Inter-Bold",
  },
  premiumAnnonceExpirateDate: {
    marginBottom: ms(20),
    fontFamily: "Inter-Italic",
    fontSize: ms(12),
    color: colors.textOpacityP,
    textAlign: "center",
  },
  expirationDateContent: {
    marginTop: ms(15),
    fontSize: ms(11),
    fontFamily: "Inter-LightItalic",
    color: colors.textColor,
  },
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
    color: colors.textColor,
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
  imagesContainer: {
    alignItems: "center",
    gap: ms(30),
    marginTop: ms(20),
    marginBottom: ms(30),
  },
  imageCard: {
    backgroundColor: colors.secondary,
    borderRadius: ms(15),
    paddingVertical: ms(20),
    width: "100%",
    alignItems: "center",
  },
  errorImage: {
    color: "red",
    textAlign: "center",
    fontSize: ms(15),
    fontFamily: "Inter-Medium",
    marginTop: ms(20),
    marginBottom: ms(10),
  },
});
