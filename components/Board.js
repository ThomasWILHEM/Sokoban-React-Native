import {Image, StyleSheet, Text, PanResponder, View} from "react-native";
import React, {useRef, useState} from "react";
import Player from "./Player";
import Wall from "./Wall";
import Box from "./Box";
import Target from "./Target";

const Board = (props) => {

    const [swipeDirection, setSwipeDirection] = useState('');
    const [board, setBoard] = useState(props.board);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: () => setSwipeDirection(''),
            onPanResponderRelease: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                if (Math.abs(dx) > Math.abs(dy)) {
                    setSwipeDirection(dx > 0 ? 'right' : 'left');
                    if(dx > 0) {
                        getPlayerPostition()
                    }
                    else {

                    }

                } else {
                    setSwipeDirection(dy > 0 ? 'down' : 'up');
                }
    }
        })
    ).current;

    const getPlayerPostition = () =>{
        board.forEach((row,rowIndex) =>{
            row.forEach((cell,cellIndex) => {
                if(cell === "P")
                    return [rowIndex,cellIndex];
            })
        });
    }

    const getObjectToPosition = (rowIndex, cellIndex) => {
        return board[rowIndex][cellIndex];
    }

    return (
        <View  {...panResponder.panHandlers}>
            <View style={styles.container} >
                {board.map((row, rowIndex) => (
                    <View key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <View key={cellIndex} style={[styles.cell, cell === '#' && styles.wall]}>
                                {cell === '.' && <Image source={require("../assets/background.png")}/>}
                                {cell === '#' && <Wall source={require("../assets/wall.png")}/>}
                                {cell === 'P' && <Player cords={[rowIndex,cellIndex]}/>}
                                {cell === 'B' && <Box source={require("../assets/box.png")}/>}
                                {cell === 'X' && <Target source={require("../assets/cible.png")}/>}
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