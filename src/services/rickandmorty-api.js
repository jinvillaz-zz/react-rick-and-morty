import restService from './http-common';

const api = restService.get();

class RickAndMortyApi {
  async getCharacters(page, gender, name) {
    const params = {
      page: page + 1,
    };
    if (gender !== '') {
      params.gender = gender;
    }
    if (name !== '') {
      params.name = name;
    }
    const { data } = await api.get('/character', { params });
    return { characters: data.results, size: data.info.count };
  }
}

export default new RickAndMortyApi();
