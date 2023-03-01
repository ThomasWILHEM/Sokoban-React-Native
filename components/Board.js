import {Image, StyleSheet, Text, PanResponder, View, ToastAndroid} from "react-native";
import React, {useRef, useState} from "react";
import Player from "./Player";
import Wall from "./Wall";
import Box from "./Box";
import Target from "./Target";

const Board = (props) => {

    const [swipeDirection, setSwipeDirection] = useState('');
    const [board, setBoard] = useState(props.board);
    const [swipeHandled, setSwipeHandled] = useState(false);

    const handleSwipe = () => {
        if (!swipeHandled) {
            // Ici, on traite le geste de swipe
            setSwipeHandled(true);
        }
    };


    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderRelease:(evt, gestureState) => {
                const { dx, dy } = gestureState;
                if (Math.abs(dx) > Math.abs(dy)) {
                    setSwipeDirection(dx > 0 ? 'right' : 'left');
                    handleSwipe();
                    if(dx > 0) {
                        setPlayerPostition(6,6);
                    } else {

                    }

                } else {
                    setSwipeDirection(dy > 0 ? 'down' : 'up');
                }
            },
        })
    ).current;



    const setPlayerPostition = (nextX, nextY) => {
        board.forEach((row,rowIndex) =>{
            row.forEach((cell,cellIndex) => {
                if(cell === "P") {
                    ToastAndroid.show('pos: ' + rowIndex, ToastAndroid.SHORT);
                    // return [rowIndex, cellIndex];
                    board[rowIndex][cellIndex] = ".";
                    board[nextX][nextY] = 'P';
                    setBoard(board);
                }
            });
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