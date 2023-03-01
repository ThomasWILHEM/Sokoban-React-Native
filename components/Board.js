import {Image, StyleSheet, Text, ToastAndroid, View} from "react-native";
import React from "react";

const Board = (props) => {
    return (
        <View style={styles.container}
              onTouchStart={e=> {
                  this.touchY = e.nativeEvent.pageY;
                  this.touchX = e.nativeEvent.pageX;
              }}
              onTouchEnd={e => {
                  if (this.touchY - e.nativeEvent.pageY > 20)
                      ToastAndroid.show('up', ToastAndroid.SHORT);
                  if (this.touchY - e.nativeEvent.pageY < -20)
                      ToastAndroid.show('down', ToastAndroid.SHORT);
                  if (this.touchX - e.nativeEvent.pageX > 20)
                      ToastAndroid.show('left', ToastAndroid.SHORT);
                  if (this.touchX - e.nativeEvent.pageX < -20)
                      ToastAndroid.show('right', ToastAndroid.SHORT);
              }}>
            {props.board.map((row, rowIndex) => (
                <View key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <Text key={cellIndex} style={[styles.cell, cell === '#' && styles.wall]}>
                            {cell === '.' && <Image source={require("../assets/background.png")}/>}
                            {cell === '#' && <Image source={require("../assets/wall.png")}/>}
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