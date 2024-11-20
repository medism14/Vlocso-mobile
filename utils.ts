/** @format */

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
    userId: user.userId,         // Identifiant unique de l'utilisateur
    email: user.email,          // Adresse email principale
    firstName: user.firstName,   // Prénom
    lastName: user.lastName,     // Nom de famille
    birthDate: user.birthDate,   // Date de naissance
    city: user.city,            // Ville de résidence
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
export const getAnnonceInfo = (annonceWithUser: any) => {
  return {
    annonceId: annonceWithUser.annonce.annonceId, // Identifiant unique de l'annonce
    title: annonceWithUser.annonce.title,         // Titre de l'annonce
    images: annonceWithUser.annonce.images,       // Images de l'annonce
    transaction: annonceWithUser.annonce.transaction, // Type de transaction
    vehicle: {
      vehicleId: annonceWithUser.annonce.vehicle.vehicleId, // Identifiant du véhicule
      condition: annonceWithUser.annonce.vehicle.condition, // État du véhicule
      description: annonceWithUser.annonce.vehicle.description, // Description du véhicule
      mark: annonceWithUser.annonce.vehicle.mark,           // Marque du véhicule
      model: annonceWithUser.annonce.vehicle.model,         // Modèle du véhicule
      year: annonceWithUser.annonce.vehicle.year,           // Année du véhicule
      gearbox: annonceWithUser.annonce.vehicle.gearbox,     // Type de boîte de vitesses
      fuelType: annonceWithUser.annonce.vehicle.fuelType,   // Type de carburant
      klmCounter: annonceWithUser.annonce.vehicle.klmCounter, // Kilométrage
      climatisation: annonceWithUser.annonce.vehicle.climatisation, // Climatisation
      type: annonceWithUser.annonce.vehicle.type,           // Type de véhicule
    },
    price: annonceWithUser.annonce.price,                 // Prix de l'annonce
    city: annonceWithUser.annonce.city,                   // Ville de l'annonce
    phoneNumber: annonceWithUser.annonce.phoneNumber,     // Numéro de téléphone
    quantity: annonceWithUser.annonce.quantity,           // Quantité
    annonceState: annonceWithUser.annonce.annonceState,   // État de l'annonce
    endDate: annonceWithUser.annonce.endDate,             // Date de fin de l'annonce
    premium: annonceWithUser.annonce.premium,             // Statut premium
    premiumExpiration: annonceWithUser.annonce.premiumExpiration, // Date d'expiration du premium
  };
}
