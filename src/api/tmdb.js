const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const fetchFromTMDB = async (endpoint) => {
  try {
    const url = new URL(`${BASE_URL}/${endpoint}`);

    url.searchParams.set("api_key", API_KEY);
    url.searchParams.set("language", "en-US");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("TMDB Error:", error);

    return {
      results: [],
    };
  }
};

export const imageUrl = (path, size = "w500") => {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }

  return `https://image.tmdb.org/t/p/${size}${path}`;
};