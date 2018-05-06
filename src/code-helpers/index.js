import { JSON_SPACING } from "../constants";

function getStyleguideColorsCode(options, colors) {
    // var { colorFormat } = options;
    // var styleguideColorTexts = getStyleguideColorTexts(colorFormat, colors);
    // return `const colors = {\n${styleguideColorTexts.join(",\n")}\n};`;
}

function getStyleguideTextStylesCode(options, project, textStyles) {
    // var textStylesObj = generateStyleguideTextStylesObject(options, project, textStyles);

    // var textStylesStr = JSON.stringify(textStylesObj, null, JSON_SPACING);
    // var processedTextStyles = textStylesStr.replace(/"(.+)":/g, "$1:").replace(/: "colors\.(.*)"/g, ": colors.$1");

    // return `const textStyles = StyleSheet.create(${processedTextStyles});`;
}

function getLayerCode(project, layer, options) {
    
}

export {
    getStyleguideColorsCode,
    getStyleguideTextStylesCode,
    getLayerCode
};
