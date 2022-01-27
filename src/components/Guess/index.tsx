import React from "react";

interface Props {
  guess: string;
  word: string;
}

export function Guess({ guess, word }: Props) {
  return (
    <div>{guess}</div>
  );
}
