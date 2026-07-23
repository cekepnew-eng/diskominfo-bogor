// src/api/menuApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://adm-diskominfo.kotabogor.go.id/api";

export const getMenus = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/menus`);
    return res.data?.data || res.data; // jaga-jaga kalau backend pakai pagination/data wrapper
  } catch (error) {
    console.error("❌ Gagal mengambil data menu:", error);
    return [];
  }
};

export const searchNews = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const res = await axios.get(
      `${API_BASE_URL}/pages?menu_name=Berita&search=${encodedQuery}`
    );
    return res.data?.data || [];
  } catch (error) {
    console.error(`❌ Error mencari berita dengan query "${query}":`, error);
    return [];
  }
};

export const getPageContent = async (menuId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/pages?menu_id=${menuId}`);
    return res.data?.data || [];
  } catch {
    return [];
  }
};

export const getContentByMenuName = async (menuName) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/pages?menu_name=${menuName}`);
    return res.data?.data || [];
  } catch (error) {
    console.error(`❌ Error fetching content for "${menuName}":`, error);
    return [];
  }
};

export const getAgendas = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/agendas`);
    return res.data?.data || res.data;
  } catch {
    return [];
  }
};

export const getAlbums = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/albums`);
    return res.data?.data || res.data;
  } catch {
    return [];
  }
};

export const getAlbumDetails = async (albumId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/albums/${albumId}`);
    return res.data || null;
  } catch {
    return null;
  }
};

export const getVideos = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/videos`);
    return res.data?.data || res.data;
  } catch {
    return [];
  }
};

export const getServices = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/services`);
    return res.data?.data || [];
  } catch (error) {
    throw new Error("Gagal memuat data layanan. Silakan coba lagi nanti.");
  }
};

export const recordVisitor = async () => {
  try {
    await axios.post(`${API_BASE_URL}/visitors/record`);
  } catch (error) {
    console.error("❌ Gagal mencatat kunjungan:", error);
  }
};

export const getVisitorStats = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/visitors/stats`);
    return res.data?.data || res.data;
  } catch {
    throw new Error("Tidak dapat memuat data statistik pengunjung.");
  }
};

export const APIpenilaian = `${API_BASE_URL}/penilaian`;

export const getAksesCepat = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/akses-cepat`);
    return res.data?.data || res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
