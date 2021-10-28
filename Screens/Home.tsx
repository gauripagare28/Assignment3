import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
const Home = ({ navigation }: any) => {
  const [searchData, setSearchData] = useState<any>("");
  const [page, setPage] = useState<any>(0);
  const [newsData, setNewsData] = useState<any>([]);
  const [endReached, setEndReached] = useState<any>(true);
  const [filterData, setFilterData] = useState<any>([]);
  const [flag, setFlag] = useState<any>(true);

  useEffect(() => {
    getData();
    setInterval(() => {
      console.log("called", Date());
      getData();
    }, 1000);
  }, []);

  const getData = () => {
    let url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;
    console.log(page);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("response ", setNewsData(responseJson));
        // setNewsData([...newsData, ...responseJson.hits]);
        if(page==0)
        {
            console.log("before",page)

            setNewsData([...newsData,...responseJson.hits])
            setPage(page+1)
            console.log("response for page 0",responseJson.hits)
            console.log("for page 0",newsData)
            console.log("after",page)
        }

        else
        {
            console.log("before for other page ",page)

            setNewsData([...newsData,...responseJson.hits]);
            console.log("for other page",newsData)
            setPage(page+1)
            console.log("after for other page",page)

        }
      });
  };

  // const updateData = () => {
  //   const pageUpdate: number = page + 1;
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //   return fetch(
  //     `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageUpdate}`
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setNewsData([...newsData, ...responseJson.hits]);
  //     });
  // };

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ flex: 1, alignItems: "center", paddingBottom: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Info", { rawJson: item })}
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 15,
            margin: 10,
            width: 350,
          }}
        >
          <Text>Title : {item.title}</Text>
          <Text>URL : {item.url}</Text>
          <Text>Created_At : {item.created_at}</Text>
          <Text>Author : {item.author}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const searchFilter = (text: any) => {
    setEndReached(false);
    const sfilter = newsData.filter((ele: any) => {
      return (
        ele.author.toLowerCase().includes(text.toLowerCase()) ||
        ele.title.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilterData(sfilter);
  };

  const searchByDate = () => {
    setFlag(false);
    const sdate = newsData;
    sdate.sort((a: any, b: any) => (a.created_at > b.created_at ? 1 : -1));
    setNewsData(sdate);
  };

  const searchByTitle = () => {
    setFlag(false);
    const stitle = newsData;
    stitle.sort((a: any, b: any) => (a.title > b.title ? 1 : -1));
    setNewsData(stitle);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        mode="outlined"
        placeholder="Search by Author or Title"
        style={{ margin: 10 }}
        value={searchData}
        onChangeText={(text) => setSearchData(text)}
      />
      <Button
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => searchFilter(searchData)}
        disabled={searchData == "" ? true : false}
      >
        SEARCH
      </Button>
      <Button mode="contained" style={{ margin: 10 }} onPress={searchByDate}>
        FILTER BY CREATED_AT
      </Button>
      <Button mode="contained" style={{ margin: 10 }} onPress={searchByTitle}>
        FILTER BY TITLE
      </Button>

      {searchData.length > 0 ? (
        flag ? (
          <FlatList
            data={filterData}
            renderItem={renderItem}
            keyExtractor={(index, item) => item.toString()}
          />
        ) : (
          <FlatList
            data={filterData}
            renderItem={renderItem}
            keyExtractor={(index, item) => item.toString()}
          />
        )
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(index, item) => item.toString()}
          onEndReached={endReached ? () => getData() : null}
          onEndReachedThreshold={0.03}
        />
      )}
    </View>
  );
};
export default Home;
