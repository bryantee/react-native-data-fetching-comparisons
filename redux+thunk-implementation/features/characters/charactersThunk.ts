import {CharacterListPayload} from "../../models/characters.model";
import {createAsyncThunk} from "@reduxjs/toolkit";
import request from "graphql-request";
import {CHARACTERS_QUERY, GRAPHQL_ENDPOINT} from "../../../App";


/**
 * fetch characters using graphql-request
 */
export const fetchCharacters = createAsyncThunk<CharacterListPayload, unknown>(
  'characters/fetchCharacters',
  async () => {
    return request<CharacterListPayload>(GRAPHQL_ENDPOINT, CHARACTERS_QUERY, {});
  });
