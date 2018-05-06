/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

import { 
    namedStyles,
    styledText,
    completeStyle,
    cleanName
} from "./utils/style-utils";


function layer(context, selectedLayer) {
    if (selectedLayer.type === "text") {
        var styles = namedStyles(selectedLayer.textStyles, context.project.textStyles)
        var text = styledText(selectedLayer.content, styles)
        return {
            code: "label.styledText(\""+ text +"\")",
            language: "swift"
        };
    } else {
        const JSONString = JSON.stringify(selectedLayer, null, 2)

        return {
            code: JSONString,
            language: "json"
        };
    }

    
}

function styleguideColors(context, colors) {
    var response = "import Foundation\nimport ByvStyles\nimport SwiftRichString\n\n/* Color extension */\n\nextension ByvColors {"

    /*
    static let primary: UIColor = {
        return ByvColors.named("primary")!
    }()
    */
    colors.forEach(color => {
        var name = color.name
        if (name != null) {
            name = cleanName(name)
            response += "\n\n\tstatic let "+name+": UIColor = {\n\t\treturn ByvColors.named(\""+name+"\")!\n\t}()"
        }
    });

    response += "\n}"

    return {
        code: response,
        language: "swift"
    };
}

function styleguideTextStyles(context, textStyles) {
    var response = "/* Styles extension */\n\nextension ByvStyles {"

    /*
    static let primary: Style = {
        return ByvStyles.named("style_1")!
    }()
    */
   textStyles.forEach(style => {
        style = completeStyle(style)
        var name = style.name
        if (name != null) {
            response += "\n\n\tstatic let "+name+": Style = {\n\t\treturn ByvStyles.named(\""+name+"\")!\n\t}()"
        }
    });

    response += "\n}"

    return {
        code: response,
        language: "swift"
    };
}

function exportStyleguideColors(context, colors) {
    var newColors = []
    colors.forEach(color => {
        newColors.push(cleanNamedColor(color))
    });
    const JSONString = JSON.stringify(newColors, null, 2);

    return {
        code: JSONString,
        language: "json",
        filename: "Colors.json"
    };
}

function exportStyleguideTextStyles(context, textStyles) {

    var styles = []
    textStyles.forEach(element => {
        var style = completeStyle(element)
        var namedColor = context.project.findColorEqual(style.color)
        if (namedColor != null) {
            style.color = cleanNamedColor(namedColor)
        }
        styles.push(style)
    });
    
    const JSONString = JSON.stringify(styles, null, 2);

    return {
        code: JSONString,
        language: "json",
        filename: "Styles.json"
    };
}

function comment(context, text) {

}

function cleanNamedColor(color) {
    var newColor = {
        r: color.r,
        g: color.g,
        b: color.b,
        a: color.a
    }
    var name = color.name
    if (name != null) {
        newColor.name = cleanName(name)
    }
    return newColor
}

export default {
    layer,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    // comment
};