export interface IQuran {
    number: number;
    numberOfAyahs: number;
    name: string;
    translation: string;
    revelation: string;
    description: string;
    audio: string;
    bismillah?: Bismillah;
    ayahs: Ayah[];
}

export interface Ayah {
    number: Number;
    arab: string;
    translation: string;
    audio: Audio;
    image: Image;
    tafsir: Tafsir;
    meta: Meta;
}

export interface Audio {
    alafasy: string;
    ahmedajamy: string;
    husarymujawwad: string;
    minshawi: string;
    muhammadayyoub: string;
    muhammadjibreel: string;
}

export interface Image {
    primary: string;
    secondary: string;
}

export interface Meta {
    juz: number;
    page: number;
    manzil: number;
    ruku: number;
    hizbQuarter: number;
    sajda: Sajda;
}

export interface Sajda {
    recommended: boolean;
    obligatory: boolean;
}

export interface Number {
    inQuran: number;
    inSurah: number;
}

export interface Tafsir {
    kemenag: Kemenag;
    quraish: string;
    jalalayn: string;
}

export interface Kemenag {
    short: string;
    long: string;
}

export interface Bismillah {
    arab: string;
    translation: string;
    audio: Audio;
}
