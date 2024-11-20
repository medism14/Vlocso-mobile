/** @format */

import axios from "axios";
import crypto from "crypto";

const cloudName = process.env.CLOUDINARY_NAME;
const uploadPreset = process.env.UPLOAD_PRESET;

const uploadImage = async (imageUri: string) => {
  try {
    const formData = new FormData();
    const filename = imageUri.split("/").pop();

    // Vérifier que le filename existe
    if (!filename) {
      throw new Error("Nom de fichier invalide");
    }

    // Créer le fichier pour l'upload
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image/jpeg`;

    formData.append("file", {
      uri: imageUri,
      name: filename,
      type,
    } as any);

    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image:", error);
    throw error;
  }
};

// const deleteImage = async (imageUrl: string) => {
//   try {
//     const urlParts = imageUrl.split("/");
//     const publicId = urlParts[urlParts.length - 1].split(".")[0];
//     const timestamp = Math.round(new Date().getTime() / 1000);

//     console.log("Public ID à supprimer:", publicId);

//     const formData = new FormData();
//     formData.append("public_id", publicId);
//     formData.append("api_key", apiKey);
//     formData.append("timestamp", timestamp.toString());

//     // Créer la signature sans crypto en utilisant une simple concaténation
//     const signatureStr = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
//     const signature = Array.from(signatureStr)
//       .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
//       .join('');

//     formData.append("signature", signature);

//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log("Réponse de Cloudinary:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Erreur lors de la suppression:",
//       error.response?.data || error
//     );
//     throw error;
//   }
// };

export { uploadImage };
