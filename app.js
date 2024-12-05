const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const baseURL = 'https://potterapi-fedeperin.vercel.app';

const fetchData = async (language, endpoint, params = '') => {
  try {
    const response = await axios.get(`${baseURL}/${language}/${endpoint}${params}`);
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

const main = async () => {
  rl.question('Escolha o idioma (en/es): ', (language) => {
    rl.question('Escolha o endpoint (books/characters/houses/spells): ', (endpoint) => {
      rl.question('Deseja buscar um item aleatório? (yes/no): ', (random) => {
        if (random.toLowerCase() === 'yes') {
          fetchData(language, endpoint, '/random');
        } else {
          rl.question('Digite o termo de pesquisa (ou deixe em branco para buscar todos): ', (searchQuery) => {
            if (searchQuery) {
              fetchData(language, endpoint, `?search=${searchQuery}`);
            } else {
              fetchData(language, endpoint);
            }
            rl.close();
          });
        }
      });
    });
  });
};

main();
