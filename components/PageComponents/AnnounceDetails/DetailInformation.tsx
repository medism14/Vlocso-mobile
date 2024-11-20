/**
 * Composant DetailInformation - Affiche un bloc d'information avec titre et contenu
 * 
 * Ce composant réutilisable permet d'afficher une information structurée
 * avec un titre mis en évidence et son contenu associé. Il est conçu pour
 * être utilisé dans une grille ou une liste de détails.
 */

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters';
import { colors } from '../../../globals/colors';

/**
 * Interface définissant les props du composant
 * @param title - Le titre de l'information à afficher
 * @param content - Le contenu détaillé de l'information
 */
interface DetailInformationProps {
    title: string;
    content: any;
}

/**
 * Affiche un bloc d'information avec un style cohérent
 * Le titre est affiché en police semi-bold et le contenu en italique
 */
const DetailInformation: React.FC<DetailInformationProps> = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  )
}

export default DetailInformation

/**
 * Styles du composant
 * Définit une largeur fixe de 32% pour permettre une disposition en grille
 * et utilise des polices distinctes pour différencier titre et contenu
 */
const styles = StyleSheet.create({
    container: {
        width: "32%",
        marginBottom: ms(20),
        justifyContent: "center"
    },
    title: {
        fontFamily: "Inter-SemiBoldItalic",
        fontSize: ms(17),
        color: colors.tertiary,
        textAlign: "center"
    },
    content: {
        fontFamily: "Inter-SemiBoldItalic",
        fontSize: ms(12),
        color: colors.accentTertiary,
        textAlign: "center"
    }
})