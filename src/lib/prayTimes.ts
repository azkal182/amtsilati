function degToRad(deg) {
    return deg * Math.PI / 180;
}

function radToDeg(rad) {
    return rad * 180 / Math.PI;
}

function calculateJulianDate(year, month, day) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function calculateAltitudeCorrection(altitude) {
    // Altitude correction in degrees
    return 0.0347 * Math.sqrt(altitude);
}

type prayerTime = {
    imsak: number;
    subuh: number;
    terbit: number;
    dhuha: number;
    zuhur: number;
    ashar: number;
    maghrib: number;
    isya: number
}

export function getMonthName(monthIndex) {
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return monthNames[monthIndex];
}

export function calculatePrayerTimes(date, latitude, longitude, timezone, ihthiyat, altitude) {
    const times: prayerTime = {
        imsak: 0,
        subuh: 0,
        terbit: 0,
        dhuha: 0,
        zuhur: 0,
        ashar: 0,
        maghrib: 0,
        isya: 0
    };
    const JD = calculateJulianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const D = JD - 2451545.0;
    const g = (357.529 + 0.98560028 * D) % 360;
    const q = (280.459 + 0.98564736 * D) % 360;
    const L = (q + 1.915 * Math.sin(degToRad(g)) + 0.020 * Math.sin(degToRad(2 * g))) % 360;
    const e = 23.439 - 0.00000036 * D;
    const RA = radToDeg(Math.atan2(Math.cos(degToRad(e)) * Math.sin(degToRad(L)), Math.cos(degToRad(L)))) / 15;
    const declination = radToDeg(Math.asin(Math.sin(degToRad(e)) * Math.sin(degToRad(L))));
    const EqT = q / 15 - RA;

    const noonTime = (12 + timezone - (longitude / 15) - EqT) % 24;

    const declRad = degToRad(declination);
    const latRad = degToRad(latitude);

    const altitudeCorrection = calculateAltitudeCorrection(altitude);

    function calculateTime(angle, direction) {
        const angleRad = degToRad(angle);
        const time = radToDeg(Math.acos((Math.sin(angleRad) - Math.sin(latRad) * Math.sin(declRad)) / (Math.cos(latRad) * Math.cos(declRad)))) / 15;
        return (noonTime + (direction * time)) % 24;
    }


    times.subuh = calculateTime(-20, -1);
    times.terbit = calculateTime(-0.833 + altitudeCorrection, -1);
    times.zuhur = noonTime;
    times.ashar = calculateTime(90 - Math.atan(1 + Math.tan(Math.abs(latitude - declination) * Math.PI / 180)) * 180 / Math.PI, 1);
    times.maghrib = calculateTime(-0.833 + altitudeCorrection, 1);
    times.isya = calculateTime(-18, 1);

    function formatTime(decimalTime) {
        const hours = Math.floor(decimalTime);
        const minutes = Math.floor((decimalTime - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${(minutes + ihthiyat).toString().padStart(2, '0')}`;
    }

    for (let prayer in times) {
        times[prayer] = formatTime(times[prayer]);
    }

    return times;
}
