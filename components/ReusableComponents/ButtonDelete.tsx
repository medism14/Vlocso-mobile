// Importation des composants et utilitaires nécessaires
import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters' // Utilitaire pour le dimensionnement adaptatif
import { colors } from '../../globals/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

// Interface définissant les props du composant
interface ButtonDeleteProps {
    onPress: () => void, // Fonction appelée lors du clic
    style?: any, // Styles optionnels pour personnaliser l'apparence
} 

/**
 * Composant ButtonDelete - Bouton de suppression réutilisable
 * Affiche une icône de poubelle dans un conteneur pressable avec une bordure rouge
 */
const ButtonDelete: React.FC<ButtonDeleteProps> = ({ onPress, style }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <FontAwesomeIcon icon={faTrashCan} size={ms(16)} color={colors.accentRed} />
    </Pressable>
  )
}

export default ButtonDelete

// Styles du composant
const styles = StyleSheet.create({
    container: {
        width: ms(35),
        height: ms(35),
        borderRadius: ms(11),
        borderColor: colors.accentRed,
        borderWidth: ms(1),
        justifyContent: "center",
        alignItems: "center",
    }
})