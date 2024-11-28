/** @format */

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Loading, PageHeader, ProductItemHorizontal } from "../../components";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import api from "../../axios/api";
import { useSelector } from "react-redux";
import globalStyles from "../../globals/globalStyles";
import { useDispatch } from "react-redux";
import { resetImagesLoad } from "../../redux/features/imagesLoads";

interface MyAnnouncesProps {
  navigation: any;
}

const MyAnnounces: React.FC<MyAnnouncesProps> = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [itemsGet, setItemsGet] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.auth.userLogin);
  const numberOfImagesLoaded = useSelector(
    (state: any) => state.imagesLoad.numberOfImagesLoaded
  );
  const dispatch = useDispatch();


  const getUserAnnonces = useCallback(async () => {
    try {
      const response = await api.get(`/annonces/user/${user.userId}`);
      if (response.data?.data) {
        const result = response.data.data;

        const values = result.map((annonceWithUser: any) => ({
          annonce: {
            annonceId: annonceWithUser.annonce.annonceId,
            title: annonceWithUser.annonce.title,
            images: annonceWithUser.annonce.images,
            transaction: annonceWithUser.annonce.transaction,
            vehicle: {
              vehicleId: annonceWithUser.annonce.vehicle.vehicleId,
              condition: annonceWithUser.annonce.vehicle.condition,
              description: annonceWithUser.annonce.vehicle.description,
              mark: annonceWithUser.annonce.vehicle.mark,
              model: annonceWithUser.annonce.vehicle.model,
              year: annonceWithUser.annonce.vehicle.year,
              gearbox: annonceWithUser.annonce.vehicle.gearbox,
              fuelType: annonceWithUser.annonce.vehicle.fuelType,
              klmCounter: annonceWithUser.annonce.vehicle.klmCounter,
              climatisation: annonceWithUser.annonce.vehicle.climatisation,
              type: annonceWithUser.annonce.vehicle.type,
            },
            price: annonceWithUser.annonce.price,
            city: annonceWithUser.annonce.city,
            phoneNumber: annonceWithUser.annonce.phoneNumber,
            quantity: annonceWithUser.annonce.quantity,
            annonceState: annonceWithUser.annonce.annonceState,
            endDate: annonceWithUser.annonce.endDate,
            premium: annonceWithUser.annonce.premium,
            premiumExpiration: annonceWithUser.annonce.premiumExpiration,
          },
          user: {
            userId: annonceWithUser.user.userId,
            firstName: annonceWithUser.user.firstName,
            lastName: annonceWithUser.user.lastName,
            urlImageUser: annonceWithUser.user.urlImageUser,
          },
        }));

        setItems(values.reverse());
      }
      setItemsGet(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error);
      setItemsGet(true);
    }
  }, [user?.userId]);

  useEffect(() => {
    if (user?.userId) {
      getUserAnnonces();
    }
  }, [getUserAnnonces]);

  // Mettre non au loading
  useEffect(() => {
    if (itemsGet && numberOfImagesLoaded >= items.length) {
      dispatch(resetImagesLoad());
      setLoading(false);
    }
  }, [itemsGet, numberOfImagesLoaded, items.length]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
      stickyHeaderIndices={[0]}
    >
      <PageHeader
        onPress={() => navigation.navigate("Profil")}
        title="Mes annonces"
      />

      {loading && (
        <ActivityIndicator
          color={colors.tertiary}
          size="large"
          style={{ marginTop: ms(20) }}
        />
      )}

      <View
        style={[
          styles.bodyNotCenter,
          styles.contentGap,
          loading && styles.notVisible,
        ]}
      >
        {items.length > 0 && (
          <View>
            <Pressable style={globalStyles.filterButton}>
              <Text style={globalStyles.filterText}>Filtrer</Text>
              <FontAwesomeIcon icon={faSlidersH} size={ms(14)} />
            </Pressable>
          </View>
        )}

        <View style={styles.listContainer}>
          {itemsGet && items.length > 0 ? (
            items.map((item) => (
              <ProductItemHorizontal
                utility="edit"
                item={item}
                key={item.annonce.annonceId}
                loadCheck={true}
              />
            ))
          ) : (
            <Text style={styles.noAnnouncesText}>
              Vous n'avez pas encore publié d'annonces
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default MyAnnounces;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  bodyNotCenter: {
    backgroundColor: colors.primary,
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
    flex: 1,
  },
  contentGap: {
    gap: ms(10),
    backgroundColor: colors.secondary,
  },
  listContainer: {
    gap: ms(25),
  },
  noAnnouncesText: {
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: ms(14),
    color: colors.textColor,
    marginTop: ms(20),
  },
  notVisible: {
    opacity: 0,
  },
});
