/** @format */

import { users } from "./users";
import { voitures } from "./data";

export const conversations = [
  {
    conversation_id: 1,
    annonce: voitures[0][0],
    buyer: users[1],
    created_at: new Date("2023-10-01T10:00:00Z"),
    messages: [
      {
        message_id: 1,
        content: "Bonjour, l'annonce est-elle toujours disponible ?",
        read_time: null,
        sender: users[1],
        receiver: users[0],
        created_at: new Date("2023-10-01T10:05:00Z"),
        updated_at: new Date("2023-10-01T10:05:00Z"),
      },
      {
        message_id: 2,
        content: "Oui, elle est toujours disponible. Avez-vous des questions ?",
        read_time: null,
        sender: users[0],
        receiver: users[1],
        created_at: new Date("2023-10-01T10:10:00Z"),
        updated_at: new Date("2023-10-01T10:10:00Z"),
      },
      {
        message_id: 3,
        content: "Quel est le prix final ?",
        read_time: null,
        sender: users[1],
        receiver: users[0],
        created_at: new Date("2023-10-01T10:15:00Z"),
        updated_at: new Date("2023-10-01T10:15:00Z"),
      },
      {
        message_id: 4,
        content: "Le prix est de 5000€. Êtes-vous intéressé ?",
        read_time: null,
        sender: users[0],
        receiver: users[1],
        created_at: new Date("2023-10-01T10:20:00Z"),
        updated_at: new Date("2023-10-01T10:20:00Z"),
      },
      {
        message_id: 5,
        content: "Oui, je suis intéressé. Quand puis-je venir le voir ?",
        read_time: null,
        sender: users[1],
        receiver: users[0],
        created_at: new Date("2023-10-01T10:25:00Z"),
        updated_at: new Date("2023-10-01T10:25:00Z"),
      },
      {
        message_id: 6,
        content: "Vous pouvez venir demain à 14h.",
        read_time: null,
        sender: users[0],
        receiver: users[1],
        created_at: new Date("2023-10-01T10:30:00Z"),
        updated_at: new Date("2023-10-01T10:30:00Z"),
      },
      {
        message_id: 7,
        content: "Parfait, à demain !",
        read_time: null,
        sender: users[1],
        receiver: users[0],
        created_at: new Date("2023-10-01T10:35:00Z"),
        updated_at: new Date("2023-10-01T10:35:00Z"),
      },
      {
        message_id: 8,
        content: "Bonjour, je suis là.",
        read_time: null,
        sender: users[1],
        receiver: users[0],
        created_at: new Date("2023-10-02T14:00:00Z"),
        updated_at: new Date("2023-10-02T14:00:00Z"),
      },
      {
        message_id: 9,
        content: "Bonjour ! Je vous attends.",
        read_time: null,
        sender: users[0],
        receiver: users[1],
        created_at: new Date("2023-10-02T14:05:00Z"),
        updated_at: new Date("2023-10-02T14:05:00Z"),
      },
      {
        message_id: 10,
        content: "Merci, je suis en route.",
        read_time: null,
        sender: users[1],
        receiver: users[0],
        created_at: new Date("2023-10-02T14:10:00Z"),
        updated_at: new Date("2023-10-02T14:10:00Z"),
      },
      {
        message_id: 11,
        content: "Est-ce que vous avez besoin d'autres informations ?",
        read_time: null,
        sender: users[0],
        receiver: users[1],
        created_at: new Date("2023-10-02T14:15:00Z"),
        updated_at: new Date("2023-10-02T14:15:00Z"),
      },
      {
        message_id: 12,
        content: "Non, tout est clair, merci !",
        read_time: null,
        sender: users[1],
        receiver: users[0],
        created_at: new Date("2023-10-02T14:20:00Z"),
        updated_at: new Date("2023-10-02T14:20:00Z"),
      },
      {
        message_id: 13,
        content: "Super, à tout à l'heure alors !",
        read_time: null,
        sender: users[0],
        receiver: users[1],
        created_at: new Date("2023-10-02T14:25:00Z"),
        updated_at: new Date("2023-10-02T14:25:00Z"),
      },
      {
        message_id: 14,
        content: "À bientôt !",
        read_time: null,
        sender: users[1],
        receiver: users[0],
        created_at: new Date("2023-10-02T14:30:00Z"),
        updated_at: new Date("2023-10-02T14:30:00Z"),
      },
    ],
  },
  {
    conversation_id: 2,
    annonce: voitures[0][1],
    buyer_id: users[1],
    created_at: new Date("2023-10-02T11:30:00Z"),
    messages: [
      {
        message_id: 11,
        content:
          "Bonjour, j'aimerais savoir si l'annonce est toujours d'actualité.",
        read_time: null,
        sender: users[1], // Alice Johnson
        receiver: users[0],
        created_at: new Date("2023-10-02T15:00:00Z"),
        updated_at: new Date("2023-10-02T15:00:00Z"),
      },
      {
        message_id: 12,
        content:
          "Oui, elle est toujours disponible. Que souhaitez-vous savoir ?",
        read_time: null,
        sender: users[0],
        receiver: users[1], // Alice Johnson
        created_at: new Date("2023-10-02T15:05:00Z"),
        updated_at: new Date("2023-10-02T15:05:00Z"),
      },
      {
        message_id: 13,
        content: "Est-ce que je peux venir la voir demain ?",
        read_time: null,
        sender: users[1], // Alice Johnson
        receiver: users[0],
        created_at: new Date("2023-10-02T15:10:00Z"),
        updated_at: new Date("2023-10-02T15:10:00Z"),
      },
      {
        message_id: 14,
        content: "Bien sûr, à quelle heure ?",
        read_time: null,
        sender: users[0],
        receiver: users[1], // Alice Johnson
        created_at: new Date("2023-10-02T15:15:00Z"),
        updated_at: new Date("2023-10-02T15:15:00Z"),
      },
      {
        message_id: 15,
        content: "Je peux venir à 16h.",
        read_time: null,
        sender: users[1], // Alice Johnson
        receiver: users[0],
        created_at: new Date("2023-10-02T15:20:00Z"),
        updated_at: new Date("2023-10-02T15:20:00Z"),
      },
      {
        message_id: 16,
        content: "Parfait, à 16h alors !",
        read_time: null,
        sender: users[0],
        receiver: users[1], // Alice Johnson
        created_at: new Date("2023-10-02T15:25:00Z"),
        updated_at: new Date("2023-10-02T15:25:00Z"),
      },
      {
        message_id: 17,
        content: "Est-ce que vous avez besoin d'autres informations avant de venir ?",
        read_time: null,
        sender: users[0],
        receiver: users[1], // Alice Johnson
        created_at: new Date("2023-10-02T15:30:00Z"),
        updated_at: new Date("2023-10-02T15:30:00Z"),
      },
      {
        message_id: 18,
        content: "Non, tout est clair, merci !",
        read_time: null,
        sender: users[1], // Alice Johnson
        receiver: users[0],
        created_at: new Date("2023-10-02T15:35:00Z"),
        updated_at: new Date("2023-10-02T15:35:00Z"),
      },
      {
        message_id: 19,
        content: "D'accord, à tout à l'heure alors !",
        read_time: null,
        sender: users[0],
        receiver: users[1], // Alice Johnson
        created_at: new Date("2023-10-02T15:40:00Z"),
        updated_at: new Date("2023-10-02T15:40:00Z"),
      },
      {
        message_id: 20,
        content: "À bientôt !",
        read_time: null,
        sender: users[1], // Alice Johnson
        receiver: users[0],
        created_at: new Date("2023-10-02T15:45:00Z"),
        updated_at: new Date("2023-10-02T15:45:00Z"),
      },
    ],
  },
];