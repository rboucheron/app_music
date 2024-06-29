import axios from 'axios';

const API_URL = 'http://localhost:3333/api/';


const useGet = async <T>(path: string): Promise<T> => {
  try {
    console.log(`Fetching data from ${API_URL}${path}`);
    const response = await axios.get<T>(`${API_URL}${path}`, {
      responseType: 'json',
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};

export default useGet;
