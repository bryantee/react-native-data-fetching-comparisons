import {createSlice} from "@reduxjs/toolkit";

export interface CharactersState {
  data: {
    characters: {
      results: {
        id: number;
        name: string;
        image: string;
      }[];
    };
  };
}

const initialState: CharactersState = {
  data: {characters: {results: []}}
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    getCharacters: (state, action) => {
      state.data = action.payload;
    }
  }
})

export const {getCharacters} = charactersSlice.actions;
export default charactersSlice.reducer;
