import {Image, StyleSheet, Text, PanResponder, View, ToastAndroid} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import Player from "./Player";
import Wall from "./Wall";
import Box from "./Box";
import Target from "./Target";
import Vide from "./Vide";

const Board = (props) => {

    const [swipeDirection, setSwipeDirection] = useState('');
    const [board, setBoard] = useState(props.board);
    const [targets, setTargets] = useState([])
    const [swipeHandled, setSwipeHandled] = useState(false);
    let [nextX, setNextX] = useState(4);
    let [nextY, setNextY] = useState(4);
    let [isCroix, setIsCroix] = useState(0);


    const handleSwipe = () => {
        if (!swipeHandled) {
            // Ici, on traite le geste de swipe
            setSwipeHandled(true);
        }
    };

    const checkWin = (newBoard) =>
    {
        const thereIsAnX = newBoard.find(subArray => subArray.includes("X"));
        if (!thereIsAnX) {
            console.log('Victoire');
            props.onGameOver();
        }
    }
    const CheckCroix = (newBoard,PositionX,PositionY,currentPlayerPosition) =>{
        if(isCroix === 0){
            newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
            newBoard[PositionX][PositionY] = "P";
            setIsCroix(isCroix = 1);
        }
        else {
            newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = "X";
            newBoard[nextX][nextY] = "P";
            setIsCroix(isCroix = 0);
        }
    };
    const CheckCroixCaseVide = (newBoard,PositionX,PositionY,currentPlayerPosition) =>{
        if(isCroix === 0){
            newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
            newBoard[PositionX][PositionY] = "P";
        }
        else {
            newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = "X";
            newBoard[nextX][nextY] = "P";
            setIsCroix(isCroix = 0);
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
        if(newBoard[nextX][nextY] === "#"){
            newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = "P";
            setNextX(nextX => currentPlayerPosition.x);
            setNextY(nextY => currentPlayerPosition.y);
        }
        else if(newBoard[nextX][nextY] === "B"){

            let boxMoved = false;
            
            if(swipeDirection === "up" && (newBoard[nextX][nextY-1] !== "#" && newBoard[nextX][nextY-1] !== "B")){
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
                newBoard[nextX][nextY-1] = "B";
                boxMoved = true;
            }
            else if(swipeDirection === "down" && (newBoard[nextX][nextY+1] !== "#" && newBoard[nextX][nextY+1] !== "B")){
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
                newBoard[nextX][nextY+1] = "B";
                boxMoved = true;
            }
            else if(swipeDirection === "left" && (newBoard[nextX-1][nextY] !== "#" && newBoard[nextX-1][nextY] !== "B")){
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
                newBoard[nextX-1][nextY] = "B";
                boxMoved = true;
            }
            else if(swipeDirection === "right" && (newBoard[nextX+1][nextY] !== "#" && newBoard[nextX+1][nextY] !== "B")){
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
                newBoard[nextX+1][nextY] = "B";
                boxMoved = true;
            }
            if (boxMoved) {
                newBoard[currentPlayerPosition.x][currentPlayerPosition.y] = ".";
                newBoard[nextX][nextY] = "P";
            } else {
                setNextX(nextX => currentPlayerPosition.x);
                setNextY(nextY => currentPlayerPosition.y);
            }
                        
            checkWin(newBoard)
        }
        else if(newBoard[nextX][nextY] === "X"){
            CheckCroix(newBoard,nextX,nextY,currentPlayerPosition);
        }
        else{
            CheckCroixCaseVide(newBoard,nextX,nextY,currentPlayerPosition);
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
                                {cell === '@' && <Vide source={require("../assets/vide.png")}/>}
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
