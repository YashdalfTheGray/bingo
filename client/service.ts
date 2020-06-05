interface ICardResponse {
  card: string;
}

async function getOneCard(): Promise<string> {
  const response = await fetch('/api/bingo/one');
  const json = (await response.json()) as ICardResponse;
  return json.card;
}

export { ICardResponse, getOneCard };
