/** @format */

/**
 * Composant ButtonEdit - Bouton d'édition circulaire avec icône de crayon
 * 
 * Ce composant réutilisable crée un bouton circulaire avec une bordure et une icône de crayon,
 * typiquement utilisé pour déclencher des actions d'édition dans l'interface.
 */

import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import { colors } from '../../globals/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

/**
 * Interface définissant les props du composant
 * @param onPress - Fonction appelée lors du clic sur le bouton
 * @param style - Styles additionnels optionnels à appliquer au conteneur
 */
interface ButtonEditProps {
    onPress: () => void,
    style?: any,
} 

/**
 * Affiche un bouton d'édition circulaire avec une icône de crayon
 */
const ButtonEdit: React.FC<ButtonEditProps> = ({ onPress, style }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <FontAwesomeIcon icon={faPencil} size={ms(16)} color={colors.textColor} />
    </Pressable>
  )
}

export default ButtonEdit

/**
 * Styles du composant
 * Définit l'apparence du bouton avec une forme circulaire,
 * une bordure fine et un centrage parfait de l'icône
 */
const styles = StyleSheet.create({
    container: {
        width: ms(35),
        height: ms(35),
        borderRadius: ms(11),
        borderColor: colors.textColor,
        borderWidth: ms(1),
        justifyContent: "center",
        alignItems: "center",
    }
})