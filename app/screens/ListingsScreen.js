import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
// import * as Sharing from "expo-sharing";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import categoriesApi from "../api/categories";
// import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import SearchBox from "../components/SearchBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  const allData = getListingsApi.data;
  const [refreshing, setRefreshing] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const getCategoriesApi = useApi(categoriesApi.getCategories);

  const categories = getCategoriesApi.data;

  const filteredData = selectedCategory
    ? allData.filter((listing) => listing.categoryId === selectedCategory)
    : allData;

  const handleToggleSelection = (item) => {
    setSelectedCategory(item.value);
  };

  const handleShowAll = () => setSelectedCategory("");

  const handleRefresh = () => getListingsApi.request();

  const handleRetry = () => {
    getListingsApi.request();

    getCategoriesApi.request();
  };

  useEffect(() => {
    getListingsApi.request();
    getCategoriesApi.request();
  }, []);

  const renderCategory = ({ item }) => {
    const backgroundColor =
      item.value === selectedCategory ? colors.white : colors.background;
    const color =
      item.value === selectedCategory ? colors.background : colors.white;

    return (
      <TouchableWithoutFeedback>
        <Text
          onPress={() => handleToggleSelection(item)}
          style={[styles.catItem, { backgroundColor }, { color }]}
        >
          {item.label}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return (
        <Card
          title={item.title}
          subTitle={item.price}
          imageUrl={item.images[0].url}
          onPress={() => console.log("item selected")}
          thumbnailUrl={item.images[0].thumbnailUrl}
        />
      );
    }

    if (
      item.title
        .toLowerCase()
        .includes(searchPhrase.toLowerCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Card
          title={item.title}
          subTitle={item.price}
          imageUrl={item.images[0].url}
          onPress={() => console.log("item selected")}
          thumbnailUrl={item.images[0].thumbnailUrl}
        />
      );
    }
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <View style={styles.categoryGroup}>
        <Text onPress={handleShowAll} style={styles.catItemAll}>
          All
        </Text>
        <FlatList
          data={categories}
          keyExtractor={(category, index) => category.value.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
          horizontal={true}
        />
      </View>
      <Screen style={styles.screen}>
        <View style={styles.searchnrefresh}>
          <SearchBox
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />
          <MaterialCommunityIcons
            name="refresh"
            color={colors.gold}
            onPress={handleRefresh}
            size={25}
            style={styles.refresh}
          />
        </View>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={handleRetry} />
          </>
        )}

        <FlashList
          data={filteredData}
          keyExtractor={(listing) => listing._id}
          estimatedItemSize={240}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getListingsApi.request();
          }}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  catItem: {
    borderRadius: 12,
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  catItemAll: {
    backgroundColor: colors.background,
    color: colors.white,
    borderRadius: 12,
    marginRight: 8,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  categoryGroup: {
    backgroundColor: colors.gold,
    flexDirection: "row",
    paddingLeft: 10,
    paddingVertical: 2,
    width: "100%",
  },
  refresh: {
    paddingLeft: 10,
  },
  screen: {
    padding: 5,
    paddingTop: 2,
    backgroundColor: colors.dark,
  },
  searchnrefresh: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ListingsScreen;
