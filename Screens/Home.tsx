import React, { useState, useEffect } from "react";
import { Card } from "react-native-paper";
import { Text, View, FlatList, ActivityIndicator } from "react-native";

const Home = ({ navigation }: any) => {
  let page = 0;

  const [newsData, setNewsData] = useState<any>([]);
  const [pageUpdate, setPageUpdate] = useState(1);
  useEffect(() => {
    getData(0);

    setInterval(() => {
      page = page + 1;
      getData(page);
    }, 10000);
  }, []);

  const getData = async (page: any) => {
    let url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;
    const res = await fetch(url);
    const responseJson = await res.json();
    if (page <= responseJson.nbPages) {
      setNewsData((newsData: any) => [...responseJson.hits, ...newsData]);
    }

    console.log("page no", page);
  };

  console.log("newsdata", newsData);

  const getData1 = async (pageno: any) => {
    let url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageno}`;
    const res = await fetch(url);
    const responseJson = await res.json();
    if (page <= responseJson.nbPages) {
      setNewsData((newsData: any) => [...responseJson.hits, ...newsData]);
      setPageUpdate(pageno + 1);
    }

    console.log("page no in getdata1", pageno);
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ flex: 1, alignItems: "center", paddingBottom: 10 }}>
        <Card
          onPress={() => navigation.navigate("Info", { rawJson: item })}
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 15,
            margin: 10,
            width: "95%",
          }}
        >
          <Text>
            <Text style={{ fontWeight: "bold" }}>Title :</Text> {item.title}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>URL :</Text> {item.url}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Created_At :</Text>{" "}
            {item.created_at}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Author :</Text> {item.author}
          </Text>
        </Card>
      </View>
    );
  };

  const Render_Footer = () => {
    return (
      <View style={{ marginBottom: 20 }}>
        <ActivityIndicator
          size="small"
          color="blue"
          style={{ height: 50, width: "50" }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={newsData}
        renderItem={renderItem}
        keyExtractor={(index, item) => item.toString()}
        onEndReached={() => getData1(pageUpdate)}
        onEndReachedThreshold={0.03}
        ListFooterComponent={Render_Footer}
      />
    </View>
  );
};
export default Home;
