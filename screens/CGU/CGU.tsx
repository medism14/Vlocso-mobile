/** @format */

import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

const CGU: React.FC<{ route: any }> = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Conditions Générales d'Utilisation</Text>
          <Text style={styles.paragraph}>
            // Votre texte des CGU ici
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CGU;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
});