/** @format */

/**
 * Imports des composants et utilitaires nécessaires de React Native et autres dépendances
 */
import { StyleSheet, Text, Pressable, Image } from "react-native";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";

/**
 * Interface définissant les props du composant ValidationButton
 * @param handleSubmit - Fonction de gestion de la soumission du formulaire
 * @param onSubmit - Callback exécuté lors de la soumission
 * @param text - Texte à afficher sur le bouton
 * @param disabled - État désactivé du bouton (optionnel)
 * @param errors - Objet contenant les erreurs de validation (optionnel)
 * @param messageError - Message d'erreur personnalisé à afficher (optionnel)
 */
interface ValidationButtonProps {
  handleSubmit: any;
  onSubmit: any;
  text: string;
  disabled?: boolean;
  errors?: any;
  loading?: boolean;
  messageError?: any;
}

/**
 * Composant de bouton de validation réutilisable avec gestion des erreurs
 * Inclut une animation de scale au press et un état désactivé
 */
const ValidationButton: React.FC<ValidationButtonProps> = ({
  handleSubmit,
  onSubmit,
  text,
  disabled = false,
  errors,
  loading = false,
  messageError = "Impossible de continuer, corriger les erreurs ci-dessus",
}) => {

  return (
    <>
      {/* Bouton principal avec animation et gestion de l'état désactivé */}
      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          pressed && { transform: [{ scale: 0.95 }] },
          disabled && styles.disabledButton,
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={disabled}
      >
        {loading ? (
          <Image
            source={require("../../assets/charging6.gif")}
            style={styles.loadingImage}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.submitButtonText}>{loading ? "Chargement..." : text}</Text>
        )}
      </Pressable>

      {/* Affichage conditionnel du message d'erreur */}
      {Object.keys(errors).length > 0 && (
        <Text style={styles.errorText}>{messageError}</Text>
      )}
    </>
  );
};

export default ValidationButton;

/**
 * Styles du composant
 * Utilise react-native-size-matters (ms) pour la cohérence des dimensions
 * sur différentes tailles d'écran
 */
const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.tertiary,
    height: ms(45),
    borderRadius: ms(5),
    marginTop: ms(22),
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "white",
    fontSize: ms(14),
    fontFamily: "Inter-Bold",
  },
  loadingImage: {
    width: "100%",
    height: "70%",
  },
  errorText: {
    color: colors.accentRed,
    fontSize: ms(13),
    fontFamily: "Inter-Medium",
    marginTop: ms(10),
    textAlign: "center",
  },
});
