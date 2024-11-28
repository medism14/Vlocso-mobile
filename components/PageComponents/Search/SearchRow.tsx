/** @format */

import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../../globals/colors";

interface SearchRowProps {
  content: string;
  onPress: () => void;
}

const SearchRow: React.FC<SearchRowProps> = ({ content, onPress }) => {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.searchedText} numberOfLines={1}>{content}</Text>
    </Pressable>
  );
};

export default SearchRow;

const styles = StyleSheet.create({
  row: {
    width: "100%",
    height: ms(50),
    paddingLeft: ms(15),
    alignItems: "flex-start",
    justifyContent: "center",
    borderBottomWidth: ms(1),
    borderBottomColor: colors.accentGray,
  },
  searchedText: {
    fontSize: ms(13),
    fontFamily: "Inter-Medium",
    color: colors.textColor,
  },
});
