import React, { useRef, useState } from 'react';
import {View, Text, StyleSheet, PanResponder, Image} from 'react-native';

const Player = () => {
    const [swipeDirection, setSwipeDirection] = useState('');

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                if (Math.abs(dx) > Math.abs(dy)) {
                    setSwipeDirection(dx > 0 ? 'right' : 'left');
                } else {
                    setSwipeDirection(dy > 0 ? 'down' : 'up');
                }
            },
            onPanResponderRelease: () => setSwipeDirection(''),
        })
    ).current;

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