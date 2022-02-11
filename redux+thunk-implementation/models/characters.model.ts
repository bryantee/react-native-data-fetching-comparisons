export type Character = {
  id: number;
  name: string;
  image: string;
};

export type CharacterListPayload = {
  characters: {
    results: Character[];
  }
}
