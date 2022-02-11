import {createSlice} from "@reduxjs/toolkit";
import {fetchCharacters} from "./charactersThunk";
import {Character} from "../../models/characters.model";
import {addMatchers} from "../../utils/addMatchers";

export interface CharactersState {
  characters: {
    data: {
      characters: {
        results: Character[];

      }
    };
    isLoading?: boolean;
    error?: boolean;
  };
}

const initialState: CharactersState = {
  characters: {
    data: {
      characters: {
        results: [],
      }
    },
    isLoading: false,
    error: false,
  }
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder => {
      builder.addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters.data = action.payload
      });

      addMatchers({
        builder,
        thunk: fetchCharacters,
        stateVariable: 'characters',
        resetData: {...initialState.characters.data},
      })
    }
  )
})

export default charactersSlice.reducer;
