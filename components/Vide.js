import React from 'react';
import {StyleSheet, Image} from 'react-native';

const Vide = () => {
    return (
        <Image source={require("../assets/vide.png")}/>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Vide;