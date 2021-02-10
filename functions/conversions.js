// Convert Kelvin to Fahrenheit
export function KToF(K) {
    return (K - 273.15) * 9 / 5 + 32;
}
// Convert Kelvin to Celsius
export function KToC(K) {
    return K - 273.15;
}
// Convert Meters/hour to Kilometers/hour
export function metersToKPH(meters) {
    return meters * 3.6;
}
// Convert Meters/hour to Miles/hour
export function metersToMPH(meters) {
    return meters * 2.236;
}