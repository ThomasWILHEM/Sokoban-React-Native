import {Image, StyleSheet, Text, ToastAndroid, View} from "react-native";
import React from "react";
import GestureRecognizer from "react-native-swipe-gestures";

const Board = (props) => {

    const handleSwipe = (gestureState) => {

        switch (gestureState.direction) {
            case "SWIPE_LEFT":
                console.log("Swiped left");
                break;
            case "SWIPE_RIGHT":
                console.log("Swiped right");
                break;
            case "SWIPE_UP":
                console.log("Swiped up");
                break;
            case "SWIPE_DOWN":
                console.log("Swiped down");
                break;
        }
    };

    return (
        <GestureRecognizer onSwipe={handleSwipe}>
        <View style={styles.container}>
            {props.board.map((row, rowIndex) => (
                <View key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <View key={cellIndex} style={[styles.cell, cell === '#' && styles.wall]}>
                            {cell === '.' && <Image source={require("../assets/background.png")}/>}
                            {cell === '#' && <Image source={require("../assets/wall.png")}/>}
                            {cell === 'P' && <Image source={require("../assets/character.png")}/>}
                            {cell === 'B' && <Image source={require("../assets/box.png")}/>}
                            {cell === 'X' && <Image source={require("../assets/cible.png")}/>}
                        </View>
                    ))}
                </View>
            ))}
        </View>
        </GestureRecognizer>

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