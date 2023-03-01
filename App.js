import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const board = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '#', '.', '#', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '.', '.', '.', '#', '.', 'X', '.', '#'],
  ['#', '.', '.', '.', 'P', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['#', 'X', 'B', '.', '.', '.', '.', '#', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '#', '.', '.', '.', '.', 'B', '.', '#'],
  ['#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

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
    borderWidth: 1,
    borderColor: 'black',
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
  box: {
    backgroundColor: 'red',
    color: 'white',
  },
  destination: {
    backgroundColor: 'green',
    color: 'white',
  }
});

export default function App() {
  return (
      <View style={styles.container}>
        {board.map((row, rowIndex) => (
            <View key={rowIndex}>
              {row.map((cell, cellIndex) => (
                  <Text key={cellIndex} style={[styles.cell, cell === '#' && styles.wall]}>
                    {cell === '.' && ''}
                    {cell === 'P' && <Text style={styles.player}>P</Text>}
                    {cell === 'B' && <Text style={styles.box}>B</Text>}
                    {cell === 'X' && <Text style={styles.destination}>X</Text>}
                  </Text>
              ))}
            </View>
        ))}
      </View>
  );
}