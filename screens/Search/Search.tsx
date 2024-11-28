/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import globalStyles from "../../globals/globalStyles";
import { PageHeader, ProductItemHorizontal, SearchRow } from "../../components";
import { NavigationProp } from "@react-navigation/native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { ms } from "react-native-size-matters";
import { colors } from "../../globals/colors";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { interactions } from "../../constants/searchData";
import api from "../../axios/api";
import { getAnnonceInfo } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

enum SearchState {
  TYPING = 0,
  SUBMITTED = 1,
}

interface SearchPropsProps {
  navigation: NavigationProp<any>;
  route: any;
}

const Search: React.FC<SearchPropsProps> = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [searchState, setSearchState] = useState(SearchState.TYPING);
  const searchInputRef = useRef(null);
  const [searchListSuggestions, setSearchListSuggestions] = useState([]);
  const [suggestionTyping, setSuggestionTyping] = useState([]);
  const [inputContent, setInputContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    "Voiture Mercedes",
    "Voiture Rouge",
    "Voiture BMW",
    "Voiture Audi",
    "Voiture Tesla",
    "Voiture Sportive",
  ];

  const handleSearchChange = (text: any) => {
    const textLowerCase = text.toLowerCase();
    setInputContent(textLowerCase);

    if (searchState == SearchState.SUBMITTED) {
      setSearchState(SearchState.TYPING);
    }

    if (textLowerCase.length == 0) {
      setSuggestionTyping([]);
      return;
    }

    setSuggestionTyping(
      suggestions.filter((element) =>
        element.toLowerCase().startsWith(textLowerCase)
      )
    );
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/annonces");
        const annonces = await response.data.data;

        const annoncesRefractorized = annonces.map((annonce: any) => {
          const refractAnnonce = getAnnonceInfo(annonce);
          return refractAnnonce;
        });

        setData(annoncesRefractorized);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    searchState == SearchState.SUBMITTED && getData();

    setSearchListSuggestions(() =>
      interactions.filter(
        (interaction) =>
          interaction.interactionType == "search" && interaction.content != null
      )
    );
  }, [searchState]);

  useEffect(() => {
    if (searchState == SearchState.TYPING) {
      const focusListener = navigation.addListener("focus", () => {
        const timer = setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);

        return () => clearTimeout(timer);
      });

      return focusListener;
    }
  }, [navigation]);

  const handleChangeToSubmitted = () => {
    setSearchState(SearchState.SUBMITTED);
    Keyboard.dismiss();
  };

  const handleGoBack = () => {
    if (searchState === SearchState.SUBMITTED) {
      setInputContent("");
      if (searchInputRef.current) {
        searchInputRef.current.clear();
      }
      setSuggestionTyping([]);
      setSearchState(SearchState.TYPING);
      searchInputRef.current?.focus();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={globalStyles.pageStyle}>
      <PageHeader onPress={handleGoBack}>
        <KeyboardAvoidingView>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Faites votre recherche ici..."
            placeholderTextColor={colors.inputPlaceHolderColor}
            onChangeText={handleSearchChange}
            onSubmitEditing={() => setSearchState(SearchState.SUBMITTED)}
          />
        </KeyboardAvoidingView>
      </PageHeader>

      {searchState === SearchState.TYPING && (
        <View style={styles.suggestionContainer}>
          {/* S'il n'a pas commencé à écrire */}
          {inputContent.length === 0 &&
            searchListSuggestions.length > 0 &&
            searchListSuggestions.map((search: any) => (
              <SearchRow
                key={search.interactionId}
                content={search.content}
                onPress={handleChangeToSubmitted}
              />
            ))}

          {/* S'il a commencé à faire une suggestion */}
          {inputContent.length > 0 &&
            suggestionTyping.length > 0 &&
            suggestionTyping.map((suggestion: string, index: number) => (
              <SearchRow
                key={index}
                content={suggestion}
                onPress={handleChangeToSubmitted}
              />
            ))}

          {/* S'il a commencé à écrire et qu'il y'a aucune suggestion */}
          {(inputContent.length === 0 && searchListSuggestions.length === 0) ||
            (inputContent.length > 0 && suggestionTyping.length === 0 && (
              <Text style={styles.textNothing}>Aucun résultat trouvé</Text>
            ))}
        </View>
      )}

      {searchState === SearchState.SUBMITTED && (
        <ScrollView
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.accentTertiary} />
          ) : data.length > 0 ? (
            <>
              <View>
                <Pressable style={globalStyles.filterButton}>
                  <Text style={globalStyles.filterText}>Filtrer</Text>
                  <FontAwesomeIcon icon={faSlidersH} size={ms(14)} />
                </Pressable>
              </View>

              {data.map((item: any, index: number) => (
                <ProductItemHorizontal
                  key={index}
                  item={item}
                  utility={"view"}
                  loadCheck={true}
                />
              ))}
            </>
          ) : (
            <Text style={styles.textNothing}>Aucune annonce trouvée</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    paddingLeft: ms(10),
    borderWidth: ms(1),
    borderColor: "gray",
    backgroundColor: colors.primary,
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(4.4),
    borderRadius: ms(5),
    fontSize: ms(13),
    alignItems: "flex-start",
    justifyContent: "center",
    marginVertical: ms(10),
  },
  textNothing: {
    fontSize: ms(13),
    fontFamily: "Inter-Medium",
    color: colors.textOpacityP,
    textAlign: "center",
    marginTop: ms(20),
  },
  suggestionContainer: {
    paddingHorizontal: ms(15),
    paddingTop: ms(10),
    gap: ms(10),
  },
  resultsContainer: {
    marginTop: ms(30),
    marginHorizontal: ms(15),
    gap: ms(15),
  },
});
