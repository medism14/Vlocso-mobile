/** @format */

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../../globals/colors";
import { annonceWithUserInterface } from "../../../types/annonce";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface MessageRowProps {
  conversation: {
    conversation_id: number;
    annonce: annonceWithUserInterface;
    buyer: any;
    created_at: Date;
    messages: Array<{
      message_id: number;
      content: string;
      read_time: Date | null;
      sender: any;
      receiver: any;
      created_at: Date;
      updated_at: Date;
    }>;
  };
  onPress: (conversation: any) => void;
}

const MessageRow: React.FC<MessageRowProps> = ({ conversation, onPress }) => {
  const lastMessage =
    conversation.messages.length > 0
      ? conversation.messages.reduce((latest, message) => {
          return new Date(message.created_at) > new Date(latest.created_at)
            ? message
            : latest;
        })
      : { content: "Aucun message", created_at: new Date() };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.annonceImg}>
        <Image
          source={{ uri: conversation.annonce.annonce.images[0]?.imageUrl }}
          style={{ width: "100%", height: "100%", borderRadius: ms(10) }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.convInfo}>
        <View>
          <Text style={styles.annonceTitle} numberOfLines={1}>
            {conversation.annonce.annonce.title}
          </Text>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName} numberOfLines={1}>
              Mohamed Ismael
            </Text>
            <View style={styles.notif}>
              <Text style={styles.notifNumber}>2</Text>
            </View>
          </View>
          <Text style={styles.messageText} numberOfLines={1}>
            {lastMessage.content}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.date} numberOfLines={1}>
            {new Date(lastMessage.created_at).toLocaleDateString()}
          </Text>
          <Pressable style={styles.deleteBtn}>
            <FontAwesomeIcon
              icon={faTrashCan}
              size={ms(13)}
              color={colors.accentRed}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default MessageRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: ms(10),
    backgroundColor: colors.primary,
    borderRadius: ms(7),
    marginBottom: ms(10),
    height: ms(100),
  },
  messageText: {
    fontSize: ms(11),
    color: colors.textOpacity,
    fontFamily: "Inter-Regular",
  },
  annonceImg: {
    height: "100%",
    flex: 0.3,
  },
  convInfo: {
    paddingLeft: ms(10),
    flex: 0.7,
    height: "100%",
    gap: ms(5),
    alignSelf: "center",
    position: "relative",
    justifyContent: "space-between",
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: ms(2),
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: {
    borderColor: colors.accentRed,
    borderWidth: ms(1),
    padding: ms(3),
    borderRadius: ms(5),
  },
  annonceTitle: {
    fontWeight: "bold",
    fontSize: ms(14),
    color: colors.textColor,
    fontFamily: "Inter-Bold",
  },
  userName: {
    fontSize: ms(12),
    color: colors.textColor,
    fontFamily: "Inter-SemiBold",
  },
  date: {
    fontSize: ms(10),
    color: colors.textOpacity,
    fontFamily: "Inter-Medium",
  },
  notif: {
    backgroundColor: colors.accentTertiary,
    width: ms(20),
    padding: ms(2),
    borderRadius: ms(10),
    alignItems: "center",
    justifyContent: "center",
  },
  notifNumber: {
    color: colors.primary,
    fontSize: ms(10),
    fontFamily: "Inter-SemiBold",
  },
});
