/** @format */

import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ConversationType } from "../../types/conversations";
import PageHeader from "../../components/ReusableComponents/PageHeader";

interface ConversationProps {
  route: any;
  navigation: any;
}

const Conversation: React.FC<ConversationProps> = ({ route, navigation }) => {
  const { conversation } = route.params;
  const [message, setMessage] = useState("");
  const inputMessageRef = useRef(null);
  const [sortedMessagesByDate, setSortedMessagesByDate] = useState<any[]>([]);

  useEffect(() => {
    const groupedMessages = conversation.messages.reduce((acc, message) => {
      const date = new Date(message.created_at).toISOString().split("T")[0];

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(message);
      return acc;
    }, {} as { [key: string]: Array<any> });

    const sortedMessagesByDate = Object.entries(groupedMessages).sort(
      ([dateA], [dateB]) => {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      }
    );

    setSortedMessagesByDate(sortedMessagesByDate);
  }, []);

  const handlePostMessage = () => {};

  return (
    <View style={styles.conversationContainer}>
      <PageHeader onPress={() => navigation.goBack()}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: conversation.annonce.user.urlImageUser }}
            style={styles.userImage}
            resizeMode="cover"
          />
          <Text style={styles.userName}>
            {conversation.annonce.user.firstName} {conversation.annonce.user.lastName}
          </Text>
        </View>
      </PageHeader>

      {/* Présentation de l'annonce */}
      <View style={styles.annoncePresentation}>
        <View style={styles.annonceSection}>
          <Image
            source={{ uri: conversation.annonce.annonce.images[0].imageUrl }}
            style={styles.annonceImage}
            resizeMode="cover"
          />
          <View style={styles.annonceInfo}>
            <Text style={styles.annonceTitle} numberOfLines={1}>
              {conversation.annonce.annonce.title}
            </Text>
            <Text style={styles.annoncePrice}>
              {conversation.annonce.annonce.price}€
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.annonceViewBtn}
          onPress={() =>
            navigation.navigate("AnnounceDetails", {
              item: JSON.parse(JSON.stringify(conversation.annonce)),
            })
          }
        >
          <Text style={styles.annonceViewBtnText}>Accéder à l'annonce</Text>
        </Pressable>
      </View>

      {/* Contenus des messages */}
      <View style={styles.conversationBody}>
        <ScrollView style={styles.messagesContainer}>
          {sortedMessagesByDate.map(([date, messages]: [string, any[]]) => {
            const frenchDate = new Intl.DateTimeFormat("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(date));

            return (
              <View key={date}>
                <Text style={styles.dateText}>{frenchDate}</Text>
                {messages.map((message) => {
                  const hourAndSeconds = new Intl.DateTimeFormat("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(message.created_at));

                  if (message.sender.userId == 1) {
                    return (
                      <View
                        key={message.message_id}
                        style={styles.messageWrapper}
                      >
                        <View
                          style={[styles.messageBubble, styles.receivedMessage]}
                        >
                          <Text style={styles.messageText}>
                            {message.content}
                          </Text>
                        </View>
                        <Text style={styles.messageTimeSender}>
                          {hourAndSeconds}
                        </Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={message.message_id}
                        style={styles.messageWrapper}
                      >
                        <View
                          style={[styles.messageBubble, styles.sentMessage]}
                        >
                          <Text style={styles.messageText}>
                            {message.content}
                          </Text>
                        </View>
                        <Text style={styles.messageTimeReceiver}>
                          {hourAndSeconds}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.inputMessageContainer}>
          <TextInput
            ref={inputMessageRef}
            onChangeText={setMessage}
            style={styles.inputMessage}
            placeholder={"Ecrivez votre message ici..."}
            placeholderTextColor={colors.inputPlaceHolderColor}
          />
          <Pressable style={styles.sendMessageBtn} onPress={handlePostMessage}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              size={ms(18)}
              color={colors.textOpacityPP}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  conversationContainer: {
    backgroundColor: colors.secondary,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    shadowOpacity: ms(0.25),
    shadowRadius: ms(3.5),
    elevation: 5,
  },
  annoncePresentation: {
    padding: ms(12),
    backgroundColor: colors.primary,
    borderBottomEndRadius: ms(0),
    borderBottomStartRadius: ms(0),
    justifyContent: "flex-start",
  },
  annonceImage: {
    width: "20%",
    height: ms(50),
    alignSelf: "center",
    borderRadius: ms(10),
  },
  annonceSection: {
    flexDirection: "row",
    gap: ms(10),
  },
  annonceInfo: {
    flex: 1,
    marginRight: ms(10),
  },
  annonceViewBtn: {
    backgroundColor: colors.tertiary,
    height: ms(30),
    width: ms(140),
    borderRadius: ms(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  annonceTitle: {
    fontFamily: "Inter-Bold",
    fontSize: ms(16),
    color: colors.textColor,
  },
  annoncePrice: {
    fontFamily: "Inter-Bold",
    fontSize: ms(14),
    color: colors.accentTertiary,
  },
  annonceViewBtnText: {
    fontFamily: "Inter-Medium",
    fontSize: ms(11),
    color: colors.primary,
  },
  conversationBody: {
    flex: 1,
    position: "relative",
    marginHorizontal: ms(10),
  },
  messagesContainer: {
    flex: 1,
    marginBottom: ms(70),
  },
  dateText: {
    textAlign: "center",
    color: colors.textOpacity,
    fontSize: ms(12),
    marginVertical: ms(10),
    fontFamily: "Inter-Regular",
  },
  messageWrapper: {
    marginVertical: ms(5),
    paddingHorizontal: ms(10),
  },
  messageBubble: {
    maxWidth: "80%",
    padding: ms(10),
    borderRadius: ms(15),
  },
  receivedMessage: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
  },
  sentMessage: {
    alignSelf: "flex-start",
    backgroundColor: colors.æccentTertiaryMessage,
  },
  messageText: {
    color: colors.textColor,
    fontSize: ms(11),
    fontFamily: "Inter-Regular",
  },
  messageTimeSender: {
    fontSize: ms(9),
    color: colors.textOpacity,
    alignSelf: "flex-end",
    marginTop: ms(2),
    fontFamily: "Inter-Regular",
    marginRight: ms(5),
  },
  messageTimeReceiver: {
    fontSize: ms(9),
    color: colors.textOpacity,
    alignSelf: "flex-start",
    marginTop: ms(2),
    fontFamily: "Inter-Regular",
    marginLeft: ms(5),
  },
  inputMessageContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: ms(10),
    width: "100%",
    height: ms(50),
    borderRadius: ms(10),
    backgroundColor: colors.primary,
    borderColor: colors.accentGray,
    borderWidth: ms(2),
  },
  inputMessage: {
    height: "100%",
    flex: 1,
    fontSize: ms(13),
    fontFamily: "Inter-Medium",
    color: colors.textColor,
    backgroundColor: colors.primary,
    borderRadius: ms(10),
    paddingLeft: ms(10),
  },
  sendMessageBtn: {
    paddingHorizontal: ms(10),
    justifyContent: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  userImage: {
    width: ms(30),
    height: ms(30),
    borderRadius: ms(15),
  },
  userName: {
    fontFamily: "Inter-Bold",
    fontSize: ms(16),
    color: colors.textColor,
  },
});
