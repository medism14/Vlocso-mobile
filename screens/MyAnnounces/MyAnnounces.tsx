/** @format */

/**
 * Imports des composants et utilitaires nécessaires
 * - Composants React Native pour l'interface utilisateur
 * - Composants personnalisés pour la structure de la page
 * - Utilitaires pour le style et la mise en page
 */
import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Loading, PageHeader, ProductItemHorizontal } from "../../components";
import globalStyles from "../../globals/globalStyles";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import api from "../../axios/api";
import { useSelector } from "react-redux";

/**
 * Interface définissant les props du composant MyAnnounces
 * @property navigation - Objet de navigation fourni par React Navigation
 */
interface MyAnnouncesProps {
  navigation: any;
}

/**
 * Composant MyAnnounces - Affiche la liste des annonces de l'utilisateur
 * Permet de visualiser et filtrer les annonces publiées
 */
const MyAnnounces: React.FC<MyAnnouncesProps> = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.auth.userLogin);

  useEffect(() => {
    const getUserAnnonces = async () => {
      try {
        const response = await api.get(`/annonces/user/${user.userId}`);
        if (response.data && response.data.data) {
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

          setItems(values);
        } else if (!response.data.data) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      }
    };

    if (user && user.userId) {
      getUserAnnonces();
    }
  }, [user]);

  useEffect(() => {
    if (items.length > 0) {
      setItems((prev) => prev.reverse());
      setLoading(false);
    }
  }, [items]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      stickyHeaderIndices={[0]} // Garde l'en-tête fixe pendant le défilement
    >
      {/* En-tête de la page avec navigation vers le profil */}
      <PageHeader
        onPress={() => navigation.navigate("Profil")}
        title="Mes annonces"
      />

      {loading ? (
        <Loading />
      ) : (
        <View
          style={[
            styles.bodyNotCenter,
            { gap: ms(10), backgroundColor: colors.secondary },
          ]}
        >
          {/* Section du bouton de filtrage */}
          {items.length > 0 && (
            <View>
              <Pressable style={styles.filterButton}>
                <Text
                  style={{
                    fontSize: ms(13),
                    fontFamily: "Inter-SemiBold",
                    color: colors.textColor,
                  }}
                >
                  Filtrer
                </Text>
                <FontAwesomeIcon icon={faSlidersH} size={ms(14)} />
              </Pressable>
            </View>
          )}

          {/* Liste des annonces */}
          <View style={{ gap: ms(25) }}>
            {items.length > 0 ? (
              items.map((item: any) => (
                <ProductItemHorizontal
                  item={item}
                  key={item.annonce.annonceId}
                />
              ))
            ) : (
              <Text style={styles.noAnnouncesText}>
                Vous n'avez pas encore publié d'annonces
              </Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default MyAnnounces;

/**
 * Styles du composant
 * Définit l'apparence du bouton de filtrage et des textes
 */
const styles = StyleSheet.create({
  bodyNotCenter: {
    backgroundColor: colors.primary,
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
    flex: 1,
  },
  filterButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: ms(5),
    paddingHorizontal: ms(20),
    borderRadius: ms(10),
    flexDirection: "row",
    gap: ms(10),
    borderWidth: ms(1),
    borderColor: colors.textColor,
  },
  noAnnouncesText: {
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: ms(14),
    color: colors.textColor,
    marginTop: ms(20),
  },
});
