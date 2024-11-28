/** @format */

import { StyleSheet } from "react-native";
import { moderateScale as ms } from "react-native-size-matters";
import { colors } from "./colors";

export default StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  filterButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: ms(5),
    paddingHorizontal: ms(20),
    borderRadius: ms(10),
    flexDirection: "row",
    gap: ms(10),
    borderWidth: ms(1),
    borderColor: colors.textColor,
  },
  filterText: {
    fontSize: ms(13),
    fontFamily: "Inter-SemiBold",
    color: colors.textColor,
  },
  bodySecondary: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    paddingHorizontal: ms(15),
    paddingVertical: ms(40),
    flex: 1,
  },
  body: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    paddingHorizontal: ms(15),
    paddingVertical: ms(40),
    flex: 1,
  },
  bodyNotCenterSecondary: {
    backgroundColor: colors.secondary,
    paddingHorizontal: ms(15),
    paddingVertical: ms(25),
    flex: 1,
  },
  bodyNotCenter: {
    backgroundColor: colors.primary,
    paddingHorizontal: ms(15),
    paddingVertical: ms(25),
    flex: 1,
  },
  activeDot: {
    backgroundColor: colors.tertiary,
  },
  inactiveDot: {
    backgroundColor: colors.primary,
  },
  dot: {
    width: ms(10),
    height: ms(10),
    borderRadius: ms(5),
    marginHorizontal: ms(5),
    borderWidth: ms(2),
    borderColor: colors.tertiary,
  },
  pagination: {
    alignSelf: "center",
    flexDirection: "row",
    gap: ms(1),
  },
  buttonAnimation: {
    transform: [{ scale: 0.95 }],
  },
});
