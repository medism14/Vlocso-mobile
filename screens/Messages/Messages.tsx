/** @format */

import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../globals/globalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { Conversation, MessageRow, PageHeader } from "../../components";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import { conversations } from "../../constants/conversationsAndMessages";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

interface MessagesProps {
  navigation: any;
}

enum MessagerieState {
  ConversationsList = 0,
  Conversation = 1,
}

const Messages: React.FC<MessagesProps> = ({ navigation }) => {
  const [messagerieState, setMessagerieState] = useState(
    MessagerieState.ConversationsList
  );
  const [conversation, setConversation] = useState<any>(null);

  const handleNavigateConversation = (conversation: any) => {
    setConversation(conversation);
    setMessagerieState(MessagerieState.Conversation);
  };

  const handleGoBack = () => {
    if (messagerieState === MessagerieState.ConversationsList) {
      navigation.goBack();
    } else {
      setMessagerieState(MessagerieState.ConversationsList);
    }
  };

  return (
    <View style={styles.pageStyle}>
      <PageHeader onPress={() => handleGoBack()}>
        {messagerieState === MessagerieState.Conversation && conversation && (
          <View style={styles.userInfo}>
            <Image
              source={{ uri: conversation.annonce.user.urlImageUser }}
              style={styles.userImage}
              resizeMode="cover"
            />
            <Text style={styles.userName}>
              {conversation.annonce.user.firstName}{" "}
              {conversation.annonce.user.lastName}
            </Text>
          </View>
        )}
      </PageHeader>
      {messagerieState === MessagerieState.ConversationsList && (
        <>
          <View style={styles.title}>
            <FontAwesomeIcon size={ms(26)} icon={faComments} />
            <Text style={styles.titleText}>Mes discussions</Text>
          </View>

          <View style={styles.conversationDisplay}>
            <ScrollView style={styles.conversationDisplayBody}>
              {conversations.map((conversation: any, index: number) => (
                <MessageRow
                  key={index}
                  conversation={conversation}
                  onPress={() => handleNavigateConversation(conversation)}
                />
              ))}
            </ScrollView>
          </View>
        </>
      )}

      {messagerieState === MessagerieState.Conversation && conversation && (
        <Conversation conversation={conversation} navigation={navigation} />
      )}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  pageTitle: {
    fontFamily: "Inter-Bold",
    fontSize: ms(22),
    color: colors.textColor,
  },
  title: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    gap: ms(10),
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: ms(2),
    borderBottomColor: colors.accentGray,
    paddingTop: ms(15),
    paddingBottom: ms(15),
  },
  titleText: {
    fontSize: ms(24),
    color: colors.textColor,
    fontFamily: "Inter-ExtraBold",
  },
  conversationDisplay: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingBottom: ms(10),
    paddingHorizontal: ms(10),
    borderWidth: ms(1),
    borderColor: colors.accentGray,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  conversationDisplayBody: {
    gap: ms(10),
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(5),
  },
  userImage: {
    width: ms(38),
    height: ms(38),
    borderRadius: ms(17),
  },
  userName: {
    fontFamily: "Inter-Bold",
    fontSize: ms(11.5),
    color: colors.textColor,
  },
});
