/** @format */

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  ButtonWithoutBg,
  DetailInformation,
  DisplayImagesDetails,
  PageHeader,
  ProductItemVertical,
} from "../../components";
import globalStyles from "../../globals/globalStyles";
import { colors } from "../../globals/colors";
import { ms } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { voitures, motos } from "../../constants/data";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface AnnounceDetailsProps {
  navigation: any;
  route: any;
}

interface AnnonceItem {
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
      klmCounter: number;
      climatisation: string;
      type: string;
    };
    price: number;
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
}

/**
 * Composant AnnounceDetails - Affiche les détails d'une annonce de véhicule
 * Gère l'affichage des informations détaillées, les images et les annonces similaires
 */
const AnnounceDetails: React.FC<AnnounceDetailsProps> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;
  const user = useSelector((state: any) => state.auth.userLogin);

  // États pour gérer l'affichage et la navigation
  const [headerTitle, setHeaderTitle] = useState(item.annonce.title);
  const [actualItem, setActualItem] = useState<AnnonceItem>(item);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [articleSimilaire, setArticleSimilaire] = useState(
    actualItem.annonce.vehicle.type === "Voiture" ? voitures : motos
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Pour la vue de numéro de téléphone
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  /**
   * Gère le changement de titre dans le header lors du défilement
   * Affiche le titre de l'annonce quand l'utilisateur scrolle vers le bas
   */
  // const handleScroll = (event: any) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   setHeaderTitle(offsetY > 10 ? actualItem.annonce.title : "");
  // };

  const widthProductContainer = Dimensions.get("window").width - ms(30);

  // Configuration pour la détection des éléments visibles dans la FlatList
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  /**
   * Callback pour mettre à jour l'index actuel lors du défilement des articles similaires
   */
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }, []);

  /**
   * Effect pour gérer l'authentification et le chargement des données
   * Redirige vers l'authentification si l'utilisateur n'est pas connecté
   */
  useEffect(() => {
    if (!user) {
      navigation.navigate("AuthStack");
    }

    if (!firstLoading) {
      setHeaderTitle(actualItem.annonce.title);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setFirstLoading(false);
    }
  }, [actualItem]);

  /**
   * Gère la navigation entre les articles similaires
   * Permet de faire défiler la liste horizontalement
   */
  const handleScrollItem = (direction: string) => {
    const newIndex = direction === "back" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < articleSimilaire.length) {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      }
    }
  };

  /**
   * Composant pour les boutons de navigation entre les articles similaires
   */
  const renderNavigationButton = (direction: "back" | "next") => (
    <Pressable
      onPress={() => handleScrollItem(direction)}
      style={({ pressed }) => [
        styles.presImgPressButton,
        pressed && globalStyles.buttonAnimation,
      ]}
      accessibilityLabel={direction === "back" ? "Précédent" : "Suivant"}
      accessibilityRole="button"
    >
      <FontAwesomeIcon
        icon={direction === "back" ? faChevronLeft : faChevronRight}
        size={Dimensions.get("window").width > 500 ? ms(15) : ms(12)}
      />
    </Pressable>
  );

  // Affichage du loader pendant le chargement
  if (loading) {
    return (
      <View style={styles.chargingContainer}>
        <Image
          source={require("../../assets/charging4.gif")}
          style={{ width: wp("100%"), height: hp("100%") }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      // onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <PageHeader onPress={() => navigation.goBack()} title={headerTitle} />
      <View style={styles.pageStyle}>
        {/* Section d'affichage des images */}
        <DisplayImagesDetails images={actualItem.annonce.images} />

        {/* Section principale contenant les informations de l'annonce */}
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={1}>
            {actualItem.annonce.title}
          </Text>
          <Text style={styles.transaction}>
            {actualItem.annonce.transaction}
          </Text>
          <Text style={styles.description}>
            {actualItem.annonce.vehicle.description}
          </Text>
          <Text style={styles.price}>{actualItem.annonce.price}€</Text>

          {/* Section profil vendeur et boutons d'action */}
          <View style={styles.userPartContainer}>
            <View style={styles.userInfoContainer}>
              {actualItem.user.urlImageUser && (
                <Image
                  source={{ uri: actualItem.user.urlImageUser }}
                  style={styles.userInfoImage}
                  resizeMode="stretch"
                />
              )}
              <Text style={styles.userInfoName}>
                {actualItem.user.firstName} {actualItem.user.lastName}
              </Text>
            </View>

            {/* Boutons d'interaction avec le vendeur */}
            <View style={{ gap: ms(10), marginTop: ms(10) }}>
              <ButtonWithoutBg
                content="Envoyer un message"
                color={colors.tertiary}
                onPress={() => console.log("Taped")}
              />

              <ButtonWithoutBg
                content={
                  showPhoneNumber
                    ? actualItem.annonce.phoneNumber
                    : "Afficher son numéro"
                }
                color={showPhoneNumber ? colors.primary : colors.tertiary}
                backgroundColor={showPhoneNumber ? colors.tertiary : colors.primary}
                onPress={() => setShowPhoneNumber(!showPhoneNumber)}
              />
            </View>
          </View>

          {/* Informations sur la localisation */}
          <View style={styles.cityContainer}>
            <Text style={styles.beforeCityText}>Lieu de vente:</Text>
            <Text style={styles.city}>{actualItem.annonce.city}</Text>
          </View>

          <View style={styles.line} />

          {/* Caractéristiques détaillées du véhicule */}
          <View style={styles.infoSuppContainer}>
            <DetailInformation
              title="Kilométrage"
              content={actualItem.annonce.vehicle.klmCounter}
            />
            <DetailInformation
              title="Modèle"
              content={actualItem.annonce.vehicle.model}
            />
            <DetailInformation
              title="Condition"
              content={actualItem.annonce.vehicle.condition}
            />
            <DetailInformation
              title="Carburant"
              content={actualItem.annonce.vehicle.fuelType}
            />
            <DetailInformation
              title="Année"
              content={actualItem.annonce.vehicle.year}
            />
            <DetailInformation
              title="Type de boîte"
              content={actualItem.annonce.vehicle.gearbox}
            />
            <DetailInformation
              title="Climatisation"
              content={actualItem.annonce.vehicle.climatisation}
            />
          </View>

          {/* Section des articles similaires avec navigation */}
          <View>
            <View style={styles.sameArticleHeader}>
              <Text style={styles.sameArticleTitle}>Articles similaire</Text>
              <View style={{ flexDirection: "row" }}>
                {renderNavigationButton("back")}
                {renderNavigationButton("next")}
              </View>
            </View>

            <View style={styles.sameArticleContent}>
              <FlatList
                ref={flatListRef}
                data={articleSimilaire}
                renderItem={({ item }) => (
                  <View
                    style={[
                      styles.productContainer,
                      { width: widthProductContainer },
                    ]}
                  >
                    <ProductItemVertical
                      onPress={() => setActualItem(item[0])}
                      allSpace={30}
                      item={item[0]}
                    />
                    <ProductItemVertical
                      onPress={() => setActualItem(item[1])}
                      allSpace={30}
                      item={item[1]}
                    />
                  </View>
                )}
                pagingEnabled
                horizontal
                viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnnounceDetails;

// Styles pour le composant
const styles = StyleSheet.create({
  pageStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  body: {
    paddingHorizontal: ms(15),
    paddingBottom: ms(40),
  },
  userPartContainer: {
    alignItems: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    gap: ms(5),
    alignItems: "center",
  },
  userInfoImage: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(80),
  },
  userInfoName: {
    fontSize: ms(14),
    fontFamily: "Inter-Medium",
    color: colors.textColor,
  },
  title: {
    fontSize: ms(22),
    fontFamily: "Inter-ExtraBold",
    color: colors.textColor,
  },
  transaction: {
    fontSize: ms(18),
    fontFamily: "Inter-SemiBold",
    color: colors.textColor,
    marginBottom: ms(7),
  },
  description: {
    fontSize: ms(12.5),
    fontFamily: "Inter-Regular",
    color: colors.textOpacity,
  },
  price: {
    fontSize: ms(25),
    fontFamily: "Inter-ExtraBold",
    color: colors.accentTertiary,
    marginVertical: ms(15),
    textAlign: "center",
  },
  cityContainer: {
    flexDirection: "row",
    gap: ms(3),
    marginTop: ms(30),
    alignItems: "center",
  },
  beforeCityText: {
    fontSize: ms(14),
    fontFamily: "Inter-Bold",
    color: colors.textColor,
  },
  city: {
    fontSize: ms(14),
    fontFamily: "Inter-Medium",
    color: colors.textColor,
  },
  line: {
    marginVertical: ms(30),
    borderColor: colors.textOpacityP,
    borderWidth: ms(0.5),
    alignSelf: "center",
    width: "90%",
  },
  infoSuppContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  presImgButtonNextBack: {
    flexDirection: "row",
  },
  presImgPressButton: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(3),
    backgroundColor: colors.secondary,
    borderRadius: ms(3),
    borderWidth: ms(1),
  },
  sameArticleHeader: {
    borderBottomColor: colors.textColor,
    borderBottomWidth: ms(2),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: ms(5),
    marginTop: ms(15),
  },
  sameArticleTitle: {
    fontSize: ms(17),
    fontFamily: "Inter-Bold",
    color: colors.textColor,
  },
  sameArticleContent: {
    marginTop: ms(15),
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chargingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
