import axios from 'axios';

// Konfigurasi base URL untuk API Laravel Anda
const API_URL = import.meta.env.VITE_API_BASE_URL || "https://adm-diskominfo.kotabogor.go.id/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

/**
 * Mengambil daftar semua album foto.
 * @returns {Promise<Array>} Promise yang berisi array of albums.
 */
export const getAlbums = async () => {
  try {
    const response = await apiClient.get('/albums');
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error; // Lemparkan error agar bisa ditangani di komponen
  }
};

/**
 * Mengambil konten dari sebuah album spesifik (detail album, foto, dan video).
 * @param {string|number} albumId - ID dari album.
 * @returns {Promise<Object>} Promise yang berisi detail album, list foto, dan list video.
 */
export const getAlbumContent = async (albumId) => {
  try {
    const response = await apiClient.get(`/album-content/${albumId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching content for album ${albumId}:`, error);
    throw error;
  }
};

/**
 * Mengambil daftar semua video.
 * @returns {Promise<Array>} Promise yang berisi array of videos.
 */
export const getVideos = async () => {
    try {
        const response = await apiClient.get('/video');
        return response.data;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};