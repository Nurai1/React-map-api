export default function getStreetList(callback, queryValue = '', countVal = 50) {
  const requestToStreets = new Request(
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token 1e4cb9c1bbeff03271767fb32b42cfb6721e8927',
      }),
      body: JSON.stringify({
        query: queryValue,
        count: countVal,
        locations: [{
          city: 'Санкт-Петербург',
        }],
      }),
    },
  );

  fetch(requestToStreets)
    .then((response) => response.json())
    .then((data) => {
      callback(data.suggestions);
    });
}
