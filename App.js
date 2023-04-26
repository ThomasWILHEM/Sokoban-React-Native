import React, {useState} from 'react';
import Board from "./components/Board";
import {View, Text} from "react-native";
import Victory from "./components/Victory";

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



export default function App() {
  const [gameOver, setGameOver] = useState(false);

  const handleGameOver = () => {
    setGameOver(true);
  }

  const handleRestart = () => {
    setGameOver(false);
  }

  return (
      <View>
        {gameOver ?<Victory onRestart={handleRestart}></Victory> : <Board board={board} onGameOver={handleGameOver}></Board>}
      </View>

  );
}