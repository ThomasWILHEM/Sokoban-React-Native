import React from 'react';
import Board from "./components/Board";

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
  return (
      <Board board={board}></Board>
  );
}