import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";

const Board = (props) => {
    return (
        <View style={styles.container}>
            {props.board.map((row, rowIndex) => (
                <View key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <Text key={cellIndex} style={[styles.cell, cell === '#' && styles.wall]}>
                            {cell === '.' && <Image source={require("../assets/background.png")}/>}
                            {cell === 'P' && <Image source={require("../assets/character.png")}/>}
                            {cell === 'B' && <Image source={require("../assets/box.png")}/>}
                            {cell === 'X' && <Image source={require("../assets/cible.png")}/>}
                        </Text>
                    ))}
                </View>
            ))}
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
    },
    wall: {
        backgroundColor: 'black',
        color: 'white',
    },
    player: {
        backgroundColor: 'blue',
        color: 'white',
    },
    destination: {
        backgroundColor: 'green',
        color: 'white',
    }
});

export default Board;