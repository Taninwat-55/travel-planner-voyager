const FAVORITES_KEY = 'favoriteHotels';

/**
 * Hämtar alla favorithotell från localStorage.
 * @returns {Array} En array med favorithotell.
 */
export const getFavorites = () => {
  const favoritesJson = localStorage.getItem(FAVORITES_KEY);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

/**
 * Sparar ett hotell till favoritlistan.
 * @param {Object} hotel - Hela hotellobjektet som ska sparas.
 */
export const addFavorite = (hotel) => {
  const favorites = getFavorites();
  // Använd en unik identifierare för att kontrollera om hotellet redan finns
  const isAlreadyFavorite = favorites.some(fav => fav.data_id === hotel.data_id);

  if (!isAlreadyFavorite) {
    const newFavorites = [...favorites, hotel];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  }
};

/**
 * Tar bort ett hotell från favoritlistan baserat på dess unika ID.
 * @param {string} hotelId - Det unika ID:t för hotellet (t.ex. data_id).
 */
export const removeFavorite = (hotelId) => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(fav => fav.data_id !== hotelId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
};

/**
 * Kontrollerar om ett specifikt hotell redan är en favorit.
 * @param {string} hotelId - Det unika ID:t för hotellet.
 * @returns {boolean} - Returnerar true om hotellet är en favorit, annars false.
 */
export const isFavorite = (hotelId) => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.data_id === hotelId);
};