import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, Platform, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SchoolCard from "../components/school.card";
import { SchoolModel } from "../models/model";


const HomeScreen = () => {

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SchoolModel[]>([]);

    useEffect(() => {

        fetchNext();

    }, []);

    const fetchNext = () => {
        setLoading(true);
        axios.get<{ data: SchoolModel[], totalPage: number }>(`http://192.168.8.13:8070/?page=${page}`)
            .then(res => {
                setData([...data, ...res.data.data]);
                setTotalPage(res.data.totalPage);
                setPage(page + 1);
            })
            .catch(e => {
                alert('Something went wrong, we are unable to get the data')
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleOpenMap = (school: SchoolModel) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${school.School_latitude},${school.School_longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        if (url) {
            Linking.openURL(url);
        }
    }

    return (
        <View style={styles.root}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={data}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListFooterComponent={(
                    page < totalPage ? (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Button
                                title='Load more'
                                disabled={loading}
                                onPress={fetchNext}
                            />
                        </View>
                    ) : (    
                        <></>
                    )   
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.School_id}
                        onPress={() => handleOpenMap(item)}
                    >
                        <SchoolCard school={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )

};
export default HomeScreen;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        // backgroundColor: '#fff'
    }
});

