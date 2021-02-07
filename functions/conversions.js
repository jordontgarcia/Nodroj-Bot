function KToF(K) {

    return (K - 273.15) * 9 / 5 + 32;

}

function KToC(K) {

    return (K - 273.15);

}

function MetersToKPH(Meters) {

    return (Meters * 3.6);
}

function MetersToMPH(Meters) {

    return (Meters * 2.236);

}

export { KToF, KToC, MetersToKPH, MetersToMPH };