import {Image, StyleSheet, Text, PanResponder, View, ToastAndroid} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import Player from "./Player";
import Wall from "./Wall";
import Box from "./Box";
import Target from "./Target";

const Board = (props) => {

    const [swipeDirection, setSwipeDirection] = useState('');
    const [board, setBoard] = useState(props.board);
    const [swipeHandled, setSwipeHandled] = useState(false);
    let [nextX, setNextX] = useState(4);
    let [nextY, setNextY] = useState(4);


    const handleSwipe = () => {
        if (!swipeHandled) {
            // Ici, on traite le geste de swipe
            setSwipeHandled(true);
        }
    };


    useEffect(() => {
        setPlayerPosition(nextX, nextY);
    }, [nextX, nextY]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderRelease:(evt, gestureState) => {
                const { dx, dy } = gestureState;
                if (Math.abs(dx) > Math.abs(dy)) {
                    setSwipeDirection(dx > 0 ? 'right' : 'left');
                    handleSwipe();
                    if(dx > 0) setNextX(nextX => nextX + 1);
                    else setNextX(nextX => nextX - 1);

                } else {
                    if (dy > 0) setNextY(nextY => nextY + 1);
                    else setNextY(nextY => nextY - 1);
                    setSwipeDirection(dy > 0 ? 'down' : 'up');
                }
            },
        })
    ).current;

    const setPlayerPosition = (nextX, nextY) => {
        let currentPlayerPosition = null;
        const newBoard = board.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => {
                if (cell === "P") {
                    currentPlayerPosition = { x: rowIndex, y: cellIndex };
                }
                return cell;
            });
        });
        if(newBoard[nextX][nextY] == "#"){
            newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = "P";
            setNextX(nextX => currentPlayerPosition.x);
            setNextY(nextY => currentPlayerPosition.y);
        }
        else if(newBoard[nextX][nextY] == "B"){
            if(swipeDirection === "up" && newBoard[nextX][nextY-1] === "."){
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
                newBoard[nextX][nextY-1] = "B";
            }
            else if(swipeDirection === "down" && newBoard[nextX][nextY+1] === "."){
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
                newBoard[nextX][nextY+1] = "B";
            }
            else if(swipeDirection === "left" && newBoard[nextX-1][nextY] === "."){
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
                newBoard[nextX-1][nextY] = "B";
            }
            else if(swipeDirection === "right" && newBoard[nextX+1][nextY] === "."){
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
                newBoard[nextX+1][nextY] = "B";
            }        }
        else if(newBoard[nextX][nextY] == "X"){
            //Methode qui reAjoute la case X une fois que le joueur est repartis
        }
        else{
            newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
            newBoard[nextX][nextY] = "P";
        }
        setBoard(newBoard);
    };


    const getObjectToPosition = (rowIndex, cellIndex) => {
        return board[rowIndex][cellIndex];
    };

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
            <Text style={styles.text}>{board}</Text>
            <Text style={styles.text}>{swipeDirection}</Text>
            <Text style={styles.text}>{nextX}</Text>
            <Text style={styles.text}>{nextY}</Text>
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
