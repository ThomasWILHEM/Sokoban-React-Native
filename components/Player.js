import React, { useRef, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Player = () => {
    return (
        <Image source={require("../assets/character.png")}/>
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

export default Player;