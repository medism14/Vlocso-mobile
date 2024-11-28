export interface annonceWithUserInterface {
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
}


 // Start of Selection
export enum annonceState {
    ACTIVE = "actif",
    RENTED = "loué",
    SOLD = "vendu",
    EXPIRED = "expiré",
}