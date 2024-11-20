/** @format */

import { Modal, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../globals/colors";
import { ms } from "react-native-size-matters";

interface ModalUploadImageProps {
  modalVisible: any;
  setModalVisible: any;
  handleAddImage?: any;
  handleModifyImage?: any;
  handleRemoveImage?: any;
  source?: any;
  imageLoading: any;
}

const ModalUploadImage: React.FC<ModalUploadImageProps> = ({
  modalVisible,
  setModalVisible,
  handleAddImage,
  handleModifyImage,
  handleRemoveImage,
  source,
  imageLoading,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible.state}
      onRequestClose={() =>
        setModalVisible({
          state: false,
          type: [],
        })
      }
    >
      <View
        style={styles.modalOverlay}
        onTouchEnd={() =>
          setModalVisible({
            state: false,
            type: [],
          })
        }
      >
        <View
          style={styles.modalBody}
          onTouchEnd={(event) => event.stopPropagation()}
        >
          <Pressable
            style={{
              backgroundColor: colors.textColor,
              borderRadius: ms(2),
              alignSelf: "flex-end",
            }}
            onPress={() => {
              setModalVisible({
                state: false,
                type: [],
              });
            }}
          >
            <FontAwesomeIcon icon={faTimes} size={ms(24)} color="white" />
          </Pressable>

          {imageLoading && (
            <View
              style={{ marginTop: ms(20), gap: ms(10), alignItems: "center" }}
            >
              <Image
                source={require("../../assets/charging.gif")}
                style={{ width: ms(300), height: ms(100) }}
              />
            </View>
          )}

          {!imageLoading && (
            <View style={{ marginTop: ms(20), gap: ms(10) }}>
              {modalVisible.type?.includes("add") && handleAddImage && (
                <Pressable
                  style={[styles.addButtonModal, styles.buttonModal]}
                  onPress={() => handleAddImage()}
                >
                  <Text style={styles.addButtonModalText}>
                    Importer une image depuis l'appareil
                  </Text>
                </Pressable>
              )}

              {modalVisible.type?.includes("update") && handleModifyImage && (
                <Pressable
                  style={[styles.addButtonModal, styles.buttonModal]}
                  onPress={() => handleModifyImage()}
                >
                  <Text style={styles.addButtonModalText}>
                    Modifier l'image depuis l'appareil
                  </Text>
                </Pressable>
              )}

              {modalVisible.type?.includes("remove") && handleRemoveImage && (
                <Pressable
                  style={[styles.removeButtonModal, styles.buttonModal]}
                  onPress={() => handleRemoveImage()}
                >
                  <Text style={styles.removeButtonModalText}>Retirer</Text>
                </Pressable>
              )}

              {modalVisible.type?.includes("deleteConfirmation") &&
                handleRemoveImage && (
                  <View>
                    <Text style={styles.confirmationText}>
                      Vous êtes sûr de vouloir la retirer ?
                    </Text>{" "}
                    <Pressable
                      style={[styles.removeButtonModal, styles.buttonModal]}
                      onPress={() => handleRemoveImage()}
                    >
                      <Text style={styles.removeButtonModalText}>
                        Oui, confirmer
                      </Text>
                    </Pressable>
                  </View>
                )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalUploadImage;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalBody: {
    backgroundColor: "white",
    paddingVertical: ms(15),
    paddingHorizontal: ms(20),
    borderRadius: ms(7),
    width: "80%",
  },
  buttonModal: {
    padding: ms(12),
    borderWidth: ms(3),
    borderRadius: ms(10),
    alignItems: "center",
  },
  addButtonModal: {
    borderColor: colors.tertiary,
  },
  addButtonModalText: {
    color: colors.tertiary,
    fontSize: ms(14),
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  removeButtonModal: {
    borderColor: colors.accentRed,
  },
  removeButtonModalText: {
    color: colors.accentRed,
    fontSize: ms(14),
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  confirmationText: {
    fontSize: ms(16),
    color: colors.textColor,
    textAlign: "center",
    marginVertical: ms(10),
    fontFamily: "Inter-Medium",
  },
});
