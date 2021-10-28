import React from "react";
import { Card} from "react-native-paper";
import {Text,View} from "react-native" 
const Info = ({route}:any) =>
{
    const{rawJson}=route.params
    const jsonData=rawJson
    return (
        <View>
            <Card style={{padding:15,margin:10}}>
                <Text>{JSON.stringify(jsonData)}</Text>
            </Card>
        </View>
    )
}
export default Info 