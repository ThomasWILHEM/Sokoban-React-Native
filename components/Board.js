import {Image, StyleSheet, Text, PanResponder, View} from "react-native";
import React, {useRef, useState} from "react";
import Player from "./Player";

const Board = (props) => {

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
        <View  {...panResponder.panHandlers}>
            <View style={styles.container} >
                {props.board.map((row, rowIndex) => (
                    <View key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <View key={cellIndex} style={[styles.cell, cell === '#' && styles.wall]}>
                                {cell === '.' && <Image source={require("../assets/background.png")}/>}
                                {cell === '#' && <Image source={require("../assets/wall.png")}/>}
                                {cell === 'P' && <Player/> }
                                {cell === 'B' && <Image source={require("../assets/box.png")}/>}
                                {cell === 'X' && <Image source={require("../assets/cible.png")}/>}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            <Text style={styles.text}>{swipeDirection}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    cell: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        fontWeight: 'bold',
    }
});

export default Board;