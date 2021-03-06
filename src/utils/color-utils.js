import {
    MAX_BRIGHTNESS,
    HEX_BASE,
    HUE_MAX_DEGREE,
    MAX_PERCENTAGE
} from "../constants";

var alphaFormatter = new Intl.NumberFormat("en-US", {
    useGrouping: false,
    maximumFractionDigits: 2
});

function toHex(num) {
    return (num < HEX_BASE ? "0" : "") + num.toString(HEX_BASE);
}

function toHexString(color, prefix) {
    var hexCode = color.hexBase();

    if (color.a < 1) {
        var hexA = toHex(color.a * MAX_BRIGHTNESS);

        hexCode = prefix ? (hexA + hexCode) : (hexCode + hexA);
    }

    return `#${hexCode}`;
}

function toRGBAString(color) {
    var rgb = `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`;

    var rgbStr = color.a < 1
        ? `rgba(${rgb}, ${alphaFormatter.format(color.a)})`
        : `rgb(${rgb})`;

    return rgbStr;
}

function toHSLAString(color) {
    var hslColor = color.toHSL();
    var hsl = `${Math.round(hslColor.h * HUE_MAX_DEGREE)}, ` +
              `${Math.round(hslColor.s * MAX_PERCENTAGE)}%, ` +
              `${Math.round(hslColor.l * MAX_PERCENTAGE)}%`;

    var hslStr = color.a < 1
        ? `hsla(${hsl}, ${alphaFormatter.format(color.a)})`
        : `hsl(${hsl})`;

    return hslStr;
}

export {
    toHex,
    toHexString,
    toRGBAString,
    toHSLAString
};