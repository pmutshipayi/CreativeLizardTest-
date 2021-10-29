import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SchoolModel } from "../models/model";

type Props = {
    school: SchoolModel
}

const SchoolCard = (props: Props) => {

    const { school } = props;

    return (
        <View style={styles.root}>
            <Image
                source={{ uri: `${school.School_imageLink}?random=${Date.now()}` }}
                style={{
                    height: '100%',
                    width: 80,
                    borderRadius: 80 / 2,
                    resizeMode: 'stretch'
                }}
            />
            <View style={styles.nameView}>
                <Text style={styles.name}>
                    {school.School_name}
                </Text>
                <Text style={styles.address}>
                    {school.School_address}
                </Text>
            </View>
        </View>
    )

};
export default SchoolCard;
const styles = StyleSheet.create({
    root: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 10,
        height: 90
    },
    nameView: {
        marginLeft: 10
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    address: {
        fontSize: 13,
        color: 'gray'
    }
});
