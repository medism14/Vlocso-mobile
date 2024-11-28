/** @format */
import { users } from "./users";

export const recommandationsGenerale = [
  [
    {
      annonce: {
        annonceId: 1,
        title: "Ford Mustang GT 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 1,
          condition: "Neuf",
          mark: "Ford",
          model: "Mustang",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Excellente",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "disponible",
        endDate: "2024-12-15 23:59:59",
        premiumExpiration: "2024-10-30 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 2,
        title: "Honda CB 2019",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 2,
          condition: "Occasion",
          mark: "Honda",
          model: "CB",
          year: 2019,
          gearbox: "Manuel",
          fuelType: "Essence",
          klmCounter: "5 000",
          climatisation: "Non applicable",
          description:
            "Une moto fiable et économique, parfaite pour les trajets quotidiens.",
          type: "Moto",
        },
        premium: false,
        annonceState: "disponible",
        endDate: "2024-11-30 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 3,
        title: "Yamaha MT-07 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "60",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 3,
          condition: "Occasion",
          mark: "Yamaha",
          model: "MT-07",
          year: 2020,
          gearbox: "Manuel",
          fuelType: "Essence",
          klmCounter: "3 000",
          climatisation: "Non applicable",
          description:
            "Une moto sportive avec une excellente maniabilité et des performances impressionnantes.",
          type: "Moto",
        },
        premium: false,
        annonceState: "loué",
        endDate: "2025-01-10 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 4,
        title: "Tesla Model S 2022",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 2,
        price: "80 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 4,
          condition: "Neuf",
          mark: "Tesla",
          model: "Model S",
          year: 2022,
          gearbox: "Automatique",
          fuelType: "Électrique",
          klmCounter: "0",
          climatisation: "Bonne",
          description:
            "Une voiture électrique de luxe avec une autonomie exceptionnelle et des technologies de pointe.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "vendu",
        endDate: "2024-12-22 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[0],
    },
  ],
  [
    {
      annonce: {
        annonceId: 5,
        title: "BMW X5 2021",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 3,
        price: "70 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 5,
          condition: "Neuf",
          mark: "BMW",
          model: "X5",
          year: 2021,
          gearbox: "Automatique",
          fuelType: "Diesel",
          klmCounter: "0",
          climatisation: "Moyenne",
          description:
            "Un SUV de luxe avec un intérieur spacieux et des performances puissantes.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "disponible",
        endDate: "2024-11-25 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 6,
        title: "Kawasaki Ninja 2018",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "45",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 6,
          condition: "Occasion",
          mark: "Kawasaki",
          model: "Ninja",
          year: 2018,
          gearbox: "Manuel",
          fuelType: "Essence",
          klmCounter: "7 000",
          climatisation: "Non applicable",
          description:
            "Une moto sportive avec un design agressif et des performances de pointe.",
          type: "Moto",
        },
        premium: false,
        annonceState: "loué",
        endDate: "2025-01-05 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 7,
        title: "Audi A4 2020",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 5,
        price: "50 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 7,
          condition: "Neuf",
          mark: "Audi",
          model: "A4",
          year: 2020,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Mauvaise",
          description:
            "Une berline de luxe avec un intérieur raffiné et des technologies avancées.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "disponible",
        endDate: "2024-12-01 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 8,
        title: "Harley-Davidson Sportster 2017",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "55",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 8,
          condition: "Occasion",
          mark: "Harley-Davidson",
          model: "Sportster",
          year: 2017,
          gearbox: "Manuel",
          fuelType: "Essence",
          klmCounter: "8 000",
          climatisation: "Non applicable",
          description:
            "Une moto emblématique avec un style classique et des performances robustes.",
          type: "Moto",
        },
        premium: false,
        annonceState: "loué",
        endDate: "2024-12-20 23:59:59",
      },
      user: users[0],
    },
  ],
  [
    {
      annonce: {
        annonceId: 9,
        title: "Mercedes-Benz GLE 2021",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 2,
        price: "75 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 9,
          condition: "Neuf",
          mark: "Mercedes-Benz",
          model: "GLE",
          year: 2021,
          gearbox: "Automatique",
          fuelType: "Diesel",
          klmCounter: "0",
          climatisation: "Défectueuse",
          description:
            "Un SUV de luxe avec un intérieur spacieux et des technologies de pointe.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "disponible",
        endDate: "2024-11-28 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 10,
        title: "Ducati Monster 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "65",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 10,
          condition: "Occasion",
          mark: "Ducati",
          model: "Monster",
          year: 2020,
          gearbox: "Manuel",
          fuelType: "Essence",
          klmCounter: "4 000",
          climatisation: "Non applicable",
          description:
            "Une moto sportive avec un design unique et des performances exceptionnelles.",
          type: "Moto",
        },
        premium: false,
        annonceState: "loué",
        endDate: "2025-01-15 23:59:59",
      },
      user: users[0],
    },
  ],
];

export const voitures = [
  [
    {
      annonce: {
        annonceId: 11,
        title: "Ford Mustang GT 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 1,
          condition: "Neuf",
          mark: "Ford",
          model: "Mustang",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "disponible",
        endDate: "2024-12-15 23:59:59",
        premiumExpiration: "2024-10-30 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 2,
        title: "Audi A4 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 2,
          condition: "Neuf",
          mark: "Audi",
          model: "A4",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: false,
        annonceState: "disponible",
        endDate: "2024-11-30 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 3,
        title: "Mercedes-Benz Classe C 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 3,
          condition: "Neuf",
          mark: "Mercedes-Benz",
          model: "Classe C",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "disponible",
        endDate: "2025-01-10 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 4,
        title: "Tesla Model 3 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 4,
          condition: "Neuf",
          mark: "Tesla",
          model: "Model 3",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Électrique",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: false,
        annonceState: "disponible",
        endDate: "2024-12-22 23:59:59",
      },
      user: users[1],
    },
  ],
  [
    {
      annonce: {
        annonceId: 5,
        title: "Porsche 911 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 5,
          condition: "Neuf",
          mark: "Porsche",
          model: "911",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "vendu",
        endDate: "2024-11-25 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 6,
        title: "Lexus IS 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 6,
          condition: "Neuf",
          mark: "Lexus",
          model: "IS",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: false,
        annonceState: "disponible",
        endDate: "2025-01-05 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 7,
        title: "Jaguar XE 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 7,
          condition: "Neuf",
          mark: "Jaguar",
          model: "XE",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "disponible",
        endDate: "2024-12-01 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 8,
        title: "Chevrolet Camaro 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 8,
          condition: "Neuf",
          mark: "Chevrolet",
          model: "Camaro",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: false,
        annonceState: "vendu",
        endDate: "2024-12-20 23:59:59",
      },
      user: users[1],
    },
  ],
  [
    {
      annonce: {
        annonceId: 9,
        title: "Nissan Altima 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 9,
          condition: "Neuf",
          mark: "Nissan",
          model: "Altima",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: true,
        annonceState: "vendu",
        endDate: "2024-11-28 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 10,
        title: "Subaru Impreza 2024",
        images: [
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
          {
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJmf24pgbBIVvbOdDlLbG9PfRvupHZY1OFw&s",
          },
        ],
        transaction: "Vente",
        quantity: 4,
        price: "55 000",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 10,
          condition: "Neuf",
          mark: "Subaru",
          model: "Impreza",
          year: 2024,
          gearbox: "Automatique",
          fuelType: "Essence",
          klmCounter: "0",
          climatisation: "Bonne état",
          description:
            "Une voiture sportive emblématique avec un design élégant et des performances exceptionnelles.",
          type: "Voiture",
        },
        premium: false,
        annonceState: "disponible",
        endDate: "2025-01-15 23:59:59",
      },
      user: users[1],
    },
  ],
];

export const motos = [
  [
    {
      annonce: {
        annonceId: 1,
        title: "Kawasaki Ninja 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 1,
          condition: "Occasion",
          mark: "Kawasaki",
          model: "Ninja",
          year: 2020,
          gearbox: "Manuel",
          fuelType: "Essence",
          klmCounter: "5 000",
          climatisation: "Très bonne état",
          description:
            "Une moto sportive avec un design unique et des performances exceptionnelles.",
          type: "Moto", // Added vehicle type
        },
        premium: true,
        annonceState: "loué",
        endDate: "2024-12-15 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 2,
        title: "Yamaha YZF-R3 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 2,
          condition: "Occasion",
          mark: "Yamaha",
          model: "YZF-R3",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "Bonne état",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto sportive avec un design unique et des performances exceptionnelles.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: false,
        annonceState: "loué",
        expirationDate: "2024-11-30 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 3,
        title: "Suzuki GSX-R600 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 3,
          condition: "Occasion",
          mark: "Suzuki",
          model: "GSX-R600",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "État moyen",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto sportive avec un design unique et des performances exceptionnelles.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: true,
        annonceState: "loué",
        expirationDate: "2025-01-10 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 4,
        title: "KTM RC 390 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 4,
          condition: "Occasion",
          mark: "KTM",
          model: "RC 390",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "Mauvais état",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto sportive avec un design unique et des performances exceptionnelles.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: false,
        annonceState: "loué",
        expirationDate: "2024-12-22 23:59:59",
      },
      user: users[1],
    },
  ],
  [
    {
      annonce: {
        annonceId: 5,
        title: "Ducati Panigale V2 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 5,
          condition: "Occasion",
          mark: "Ducati",
          model: "Panigale V2",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "Très mauvais état",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto sportive avec un design unique et des performances exceptionnelles.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: true,
        annonceState: "disponible",
        expirationDate: "2024-11-25 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 6,
        title: "BMW S1000RR 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 6,
          condition: "Occasion",
          mark: "BMW",
          model: "S1000RR",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "Très bonne état",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto sportive avec un design unique et des performances exceptionnelles.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: false,
        annonceState: "disponible",
        expirationDate: "2024-11-25 23:59:59",
      },
      user: users[1],
    },
    {
      annonce: {
        annonceId: 7,
        title: "Triumph Street Triple 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, 20250",
        vehicle: {
          vehicleId: 7,
          condition: "Occasion",
          mark: "Triumph",
          model: "Street Triple",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "Bonne état",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto sportive avec un design unique et des performances exceptionnelles.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: true,
        annonceState: "disponible",
        expirationDate: "2024-11-25 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 8,
        title: "Harley-Davidson Sportster 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, Corse",
        vehicle: {
          vehicleId: 8,
          condition: "Occasion",
          mark: "Harley-Davidson",
          model: "Sportster",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "État moyen",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto fiable et économique, parfaite pour les trajets quotidiens.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: false,
        annonceState: "disponible",
        expirationDate: "2024-11-25 23:59:59",
      },
      user: users[1],
    },
  ],
  [
    {
      annonce: {
        annonceId: 9,
        title: "KTM 390 Duke 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, Corse",
        vehicle: {
          vehicleId: 9,
          condition: "Occasion",
          mark: "KTM",
          model: "390 Duke",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "Mauvais état",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto fiable et économique, parfaite pour les trajets quotidiens.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: true,
        annonceState: "disponible",
        expirationDate: "2024-11-25 23:59:59",
        premiumExpiration: "2024-10-30 23:59:59",
      },
      user: users[0],
    },
    {
      annonce: {
        annonceId: 10,
        title: "Honda CBR500R 2020",
        images: [
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
          {
            imageUrl:
              "https://www.moto-net.com/sites/default/files/harley-softails-2018_s.jpg",
          },
        ],
        transaction: "Location",
        quantity: 1,
        price: "50",
        city: "Corte, Corse",
        vehicle: {
          vehicleId: 10,
          condition: "Occasion",
          mark: "Honda",
          model: "CBR500R",
          year: 2020,
          gearbox: "Manuel",
          climatisation: "Très mauvais état",
          klmCounter: "5 000",
          phoneNumber: "0780853614",
          description:
            "Une moto fiable et économique, parfaite pour les trajets quotidiens.",
          fuelType: "Essence",
          type: "Moto", // Added vehicle type
        },
        premium: false,
        annonceState: "disponible",
        expirationDate: "2024-11-25 23:59:59",
        premiumExpiration: "2024-10-22 23:59:59",
      },
      user: users[1],
    },
  ],
];
