/** @format */

import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faSearch,
  faPlusCircle,
  faComments,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
  AnnounceDetails,
  AnnounceEdit,
  Home,
  Login,
  Messages,
  MyAnnounces,
  PasswordChange,
  PasswordRecovery,
  Post,
  PremiumSubscription,
  Profil,
  ProfilInformations,
  ProfilPassword,
  Register,
  RelaunchPost,
  Search,
  Conversation,
} from "../screens";

import { TabBar } from "../components";
import { useSelector } from "react-redux";
import PostPage from "../screens/PostPage/PostPage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomBar: React.FC = () => {
  const user = useSelector((state: any) => state.auth.userLogin);

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "HomeStack",
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          title: "SearchStack",
          tabBarLabel: "Recherche",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faSearch} color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PostStack"
        component={PostStack}
        options={{
          title: "PostStack",
          tabBarLabel: "Poster",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faPlusCircle} color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MessagesStack"
        component={MessagesStack}
        options={{
          title: "MessagesStack",
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faComments} color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      {!user ? (
        <Tab.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            title: "AuthStack",
            tabBarLabel: "Profil",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      ) : (
        <Tab.Screen
          name="ProfilStack"
          component={ProfilStack}
          options={{
            title: "ProfilStack",
            tabBarLabel: "Profil",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SearchStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: "Search", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const PostStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Post"
        component={Post}
        options={{ title: "Post", headerShown: false }}
      />

      <Stack.Screen
        name="PostPage"
        component={PostPage}
        options={{ title: "PostPage", headerShown: false }}
      />

      <Stack.Screen
        name="RelaunchPost"
        component={RelaunchPost}
        options={{ title: "RelaunchPost", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MessagesStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ title: "Messages", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfilStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{ title: "Profil", headerShown: false }}
      />

      <Stack.Screen
        name="ProfilInformations"
        component={ProfilInformations}
        options={{ title: "ProfilInformations", headerShown: false }}
      />

      <Stack.Screen
        name="ProfilPassword"
        component={ProfilPassword}
        options={{ title: "ProfilPassword", headerShown: false }}
      />

      <Stack.Screen
        name="MyAnnounces"
        component={MyAnnounces}
        options={{ title: "MyAnnounces", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ title: "Login", headerShown: false }}
    />

    <Stack.Screen
      name="Register"
      component={Register}
      options={{ title: "Register", headerShown: false }}
    />

    <Stack.Screen
      name="PasswordChange"
      component={PasswordChange}
      options={{ title: "PasswordChange", headerShown: false }}
    />

    <Stack.Screen
      name="PasswordRecovery"
      component={PasswordRecovery}
      options={{ title: "PasswordRecovery", headerShown: false }}
    />
  </Stack.Navigator>
);

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomBar"
          component={BottomBar}
          options={{ title: "BottomBar", headerShown: false }}
        />

        <Stack.Screen
          name="AnnounceDetails"
          component={AnnounceDetails}
          options={{ title: "AnnounceDetails", headerShown: false }}
        />

        <Stack.Screen
          name="AnnounceEdit"
          component={AnnounceEdit}
          options={{ title: "AnnounceEdit", headerShown: false }}
        />

        <Stack.Screen
          name="PremiumSubscription"
          component={PremiumSubscription}
          options={{ title: "PremiumSubscription", headerShown: false }}
        />

        <Stack.Screen
          name="Conversation"
          component={Conversation}
          options={{ title: "Conversation", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
