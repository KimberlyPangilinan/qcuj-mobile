import { View, Text } from 'react-native'
import React from 'react'
import Layout from '../../components/Layout'
import { Image } from "react-native";
const image = require("../../../assets/images/logo.png");

export default function Index() {
    return (
        <Layout showHeader={false}>
            <View className="flex-row justify-between w-full py-2 border-b border-slate-200 ">
                <Text className="font-bold text-xl text-custom-blue">
                    QCUJ Articles
                </Text>
                <Image source={image} className=" w-8 h-8" />
            </View>
        </Layout>
    )
}