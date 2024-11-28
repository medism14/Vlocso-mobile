/** @format */

import { annonceWithUserInterface } from "./types/annonce";

/**
 * Extrait les informations de base d'un utilisateur à partir d'un objet utilisateur complet.
 * Cette fonction est utilisée pour créer un objet allégé contenant uniquement
 * les données essentielles de l'utilisateur, notamment pour la gestion de l'authentification
 * et l'affichage des informations de profil.
 *
 * @param user - L'objet utilisateur source contenant toutes les données
 * @returns Un objet contenant uniquement les propriétés de base de l'utilisateur
 */
export const getBasicUserInfo = (user: any) => {
  return {
    userId: user.userId, // Identifiant unique de l'utilisateur
    email: user.email, // Adresse email principale
    firstName: user.firstName, // Prénom
    lastName: user.lastName, // Nom de famille
    birthDate: user.birthDate, // Date de naissance
    city: user.city, // Ville de résidence
    phoneNumber: user.phoneNumber, // Numéro de téléphone
    urlImageUser: user.urlImageUser, // URL de la photo de profil
  };
};

/**
 * Extrait les informations d'une annonce à partir d'un objet contenant l'annonce et l'utilisateur.
 * Cette fonction est utilisée pour créer un objet contenant uniquement les données essentielles
 * de l'annonce, notamment pour l'affichage des détails de l'annonce.
 *
 * @param annonceWithUser - L'objet contenant l'annonce et les informations de l'utilisateur
 * @returns Un objet contenant uniquement les propriétés essentielles de l'annonce
 */
export const getAnnonceInfo = (annonce: any) => {
  return {
    annonce: {
      annonceId: annonce.annonce.annonceId,
      title: annonce.annonce.title,
      images: annonce.annonce.images,
      transaction: annonce.annonce.transaction,
      vehicle: {
        vehicleId: annonce.annonce.vehicle.vehicleId,
        condition: annonce.annonce.vehicle.condition,
        description: annonce.annonce.vehicle.description,
        mark: annonce.annonce.vehicle.mark,
        model: annonce.annonce.vehicle.model,
        year: annonce.annonce.vehicle.year,
        gearbox: annonce.annonce.vehicle.gearbox,
        fuelType: annonce.annonce.vehicle.fuelType,
        klmCounter: annonce.annonce.vehicle.klmCounter,
        climatisation: annonce.annonce.vehicle.climatisation,
        type: annonce.annonce.vehicle.type,
      },
      price: annonce.annonce.price,
      city: annonce.annonce.city,
      phoneNumber: annonce.annonce.phoneNumber,
      quantity: annonce.annonce.quantity,
      annonceState: annonce.annonce.annonceState,
      endDate: annonce.annonce.endDate,
      premium: annonce.annonce.premium,
      premiumExpiration: annonce.annonce.premiumExpiration,
    },
    user: {
      userId: annonce.user.userId,
      firstName: annonce.user.firstName,
      lastName: annonce.user.lastName,
      urlImageUser: annonce.user.urlImageUser,
    },
  };
};
