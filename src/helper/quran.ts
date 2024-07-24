import { IQuran } from "@/types/quran";


const quran: IQuran[] = require("../data/quran.json");

export const getListSurahs = () => {
    return quran.map(({ ayahs, bismillah, ...rest }) => rest);
};

export const getSurah = (surahNumber: number) => {
    const surah = quran[Number(surahNumber) - 1];

    if (!surah) {
        return { error: "surah not found" }
    }
    return surah;
};

export const getAyahs = (surahNumber: number) => {
    const ayahs = quran[Number(surahNumber) - 1]?.ayahs;

    if (!ayahs) {
        return { error: "ayah not found" }
    }

    return ayahs;
};

export const getAyah = (surahNumber: number, ayahNumber: number) => {
    const ayah = quran[Number(surahNumber) - 1]?.ayahs[Number(ayahNumber) - 1];

    if (!ayah) {
        return { error: "ayah not found" }
    }

    return ayah;
};
