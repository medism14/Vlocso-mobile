/** @format */

import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ms } from "react-native-size-matters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import {
  faChevronDown,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "@react-native-community/datetimepicker";
import { colors } from "../../globals/colors";
import { Dropdown } from "react-native-element-dropdown";

/**
 * Interface définissant les propriétés du composant Input.
 */
interface InputProps {
  label: string;
  binding: boolean;
  placeholder: string;
  icon?: any;
  rightIcon?: any;
  rightText?: any;
  secure?: boolean;
  marginTop?: boolean;
  setValue?: any;
  type?: string;
  defaultDate?: Date;
  defaultSelect?: string;
  items?: any;
  multiline?: boolean;
  control: Control<any>;
  search?: boolean;
  name: string;
  rules?: RegisterOptions;
}

/**
 * Composant Input réutilisable
 */
const Input: React.FC<InputProps> = ({
  label,
  binding,
  placeholder,
  icon,
  rightIcon,
  rightText,
  secure = false,
  marginTop = true,
  type = "text",
  setValue,
  defaultDate,
  defaultSelect,
  items,
  multiline = false,
  control,
  search = false,
  name,
  rules = {},
}) => {
  const [displaySecure, setDisplaySecure] = useState(secure);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);
  const { height } = Dimensions.get("window");
  const maxHeight = height - ms(50);

  const toggleDatePicker = () => {
    Keyboard.dismiss();
    setShowPicker(!showPicker);
  };

  const onChangeDatePicker = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setValue(name, formattedDate);
    }
    setShowPicker(false);
  };

  useEffect(() => {
    if (defaultDate && date == new Date()) {
      setDate(new Date(defaultDate));
    }

    if (defaultSelect && !selectedValue) {
      setSelectedValue(defaultSelect);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={[
        { width: "100%" },
        multiline ? { minHeight: ms(220) } : { minHeight: ms(40) },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? ms(100) : 0}
    >
      <View style={marginTop && { marginTop: ms(17) }}>
        <Text style={styles.label}>
          {label}:{binding && <>*</>}
        </Text>
        
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <View style={{ position: "relative" }}>
                {type === "text" && (
                  <TextInput
                    style={[
                      multiline ? styles.inputTextArea : styles.input,
                      error ? styles.inputError : {},
                      rightIcon || secure ? { paddingRight: ms(30) } : {},
                    ]}
                    onChangeText={onChange}
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={displaySecure}
                    multiline={multiline}
                    numberOfLines={multiline ? 1 : undefined}
                    textAlignVertical="top"
                    placeholderTextColor={colors.accentGray}
                  />
                )}

                {type === "date" &&
                  ((Platform.OS == "ios" && !showPicker) ||
                    Platform.OS == "android") && (
                    <Pressable onPress={toggleDatePicker}>
                      <TextInput
                        style={[
                          styles.input,
                          error && styles.inputError,
                          { color: "black" },
                        ]}
                        value={
                          value
                            ? new Date(value).toLocaleDateString("fr-FR")
                            : ""
                        }
                        placeholder={placeholder}
                        secureTextEntry={displaySecure}
                        editable={false}
                        onPressIn={toggleDatePicker}
                      />
                    </Pressable>
                  )}

                {type === "select" && (
                  <Dropdown
                    ref={dropdownRef}
                    style={[
                      styles.input, 
                      error && styles.inputError,
                      { marginBottom: 0 }
                    ]}
                    containerStyle={{
                      marginTop: 0,
                      borderRadius: ms(7),
                      overflow: 'hidden'
                    }}
                    data={items}
                    labelField="label"
                    valueField="value"
                    placeholder={placeholder}
                    placeholderStyle={{
                      color: colors.accentGray,
                      fontSize: ms(13),
                    }}
                    itemTextStyle={{
                      fontSize: ms(13),
                      color: colors.textColor,
                    }}
                    selectedTextStyle={{
                      fontSize: ms(13),
                      color: "#333333",
                    }}
                    iconStyle={{
                      width: ms(22),
                      height: ms(22),
                    }}
                    value={selectedValue}
                    onChange={(item) => {
                      setSelectedValue(item.value);
                      onChange(item.value);
                    }}
                    search={search}
                    searchPlaceholder="Rechercher..."
                  />
                )}

                {showPicker && (
                  <DatePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChangeDatePicker}
                  />
                )}

                {((Platform.OS == "ios" && !showPicker) ||
                  Platform.OS == "android") &&
                  !multiline && (
                    <View style={[styles.iconContainer]}>
                      <FontAwesomeIcon
                        icon={icon}
                        size={ms(17)}
                        style={{
                          color: value
                            ? "#333333"
                            : Platform.OS === "android"
                            ? "gray"
                            : "#bfbebe",
                        }}
                      />
                    </View>
                  )}

                {secure && (
                  <Pressable
                    style={styles.viewSecureContainer}
                    onPress={() => setDisplaySecure((prev) => !prev)}
                  >
                    <FontAwesomeIcon
                      icon={displaySecure ? faEyeSlash : faEye}
                      size={ms(18)}
                      style={{ color: "#333333" }}
                    />
                  </Pressable>
                )}

                {rightIcon && (
                  <View style={styles.viewSecureContainer}>
                    <FontAwesomeIcon
                      icon={rightIcon}
                      size={ms(17)}
                      style={{ color: colors.textColor }}
                    />
                  </View>
                )}

                {rightText && (
                  <View style={[styles.viewSecureContainer, { width: ms(30) }]}>
                    <Text
                      style={{
                        fontSize: ms(14),
                        fontFamily: "Inter-Bold",
                        color: colors.textColor,
                      }}
                    >
                      {rightText}
                    </Text>
                  </View>
                )}

                {type == "date" &&
                  ((Platform.OS == "ios" && !showPicker) ||
                    Platform.OS == "android") && (
                    <Pressable
                      style={styles.viewSecureContainer}
                      onPress={toggleDatePicker}
                    >
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        size={ms(18)}
                        style={{ color: "#333333" }}
                      />
                    </Pressable>
                  )}
              </View>
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: ms(13.5),
    fontFamily: "Inter-Bold",
    marginBottom: Platform.OS === "ios" ? ms(3) : ms(0),
    color: colors.textColor,
  },
  input: {
    height: ms(40),
    borderColor: "gray",
    borderWidth: ms(1),
    padding: ms(10),
    backgroundColor: "white",
    fontSize: ms(13),
    borderRadius: ms(7),
    paddingLeft: ms(30),
  },
  inputTextArea: {
    borderColor: "gray",
    borderWidth: ms(1),
    padding: ms(10),
    backgroundColor: "white",
    fontSize: ms(13),
    borderRadius: ms(7),
    height: ms(220),
    textAlignVertical: "top",
  },
  iconContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: ms(25),
    alignItems: "flex-end",
    justifyContent: "center",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: ms(11),
    marginTop: ms(5),
  },
  viewSecureContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ms(25),
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
