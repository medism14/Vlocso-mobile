// Importation des composants et hooks nécessaires
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { useSelector } from "react-redux";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// Interface définissant la structure du state global
interface RootState {
  global: {
    display: boolean;
  };
}

/**
 * Composant TabBar personnalisé pour la navigation inférieure
 * Gère l'affichage et les interactions avec la barre de navigation
 */
const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  // Récupération de l'état d'affichage depuis le store Redux
  const display = useSelector((state: RootState) => state.global.display);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          borderTopWidth: ms(2),
          paddingVertical: ms(10),
          borderColor: colors.textOpacityPP,
          backgroundColor: colors.primary,
          height: ms(50),
          alignItems: "center",
        },
        // Masque la TabBar si display est false
        !display && { display: 'none' }
      ]}
    >
      {/* Mapping des routes pour créer les onglets */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        
        // Détermination du label à afficher pour l'onglet
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        /**
         * Gestion du tap sur un onglet
         * Émet un événement de navigation et change d'onglet si nécessaire
         */
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Gestion du appui long sur un onglet
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Configuration de l'icône avec les couleurs appropriées selon l'état focus
        const Icon = options.tabBarIcon
          ? options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? colors.accentTertiary : colors.textColor,
              size: ms(17),
            })
          : null;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBar}
          >
            {Icon}
            <Text
              style={[
                { color: isFocused ? colors.accentTertiary : colors.textColor },
                { fontSize: ms(10) },
              ]}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Styles pour le composant TabBar
const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ms(5),
  },
});

export default TabBar;