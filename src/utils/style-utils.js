function styledText(content, namedStyles) {
  var response = ""
  var position = 0
  for (var i = 0; i < namedStyles.length; i++) {
    var item = namedStyles[i]
    if (position < item.range.start) {
      response += content.substring(position, item.range.start)
    }
    var styleContent = content.substring(item.range.start, item.range.end)
    var styleName = item.textStyle.name
    if (styleName == null) {
        styleName = item.textStyle.newName
    }
    response += "<"+styleName+">"+styleContent+"</"+styleName+">"
    position = item.range.end
  }
  return response
}

function namedStyles(rangedStyles, allStyles) {
  var response = rangedStyles
  for (var i = 0; i < rangedStyles.length; i++) { 
    response[i].textStyle = findTextStyleName(allStyles, rangedStyles[i].textStyle)
    if (response[i].textStyle.name == null) {
      response[i].textStyle.newName = "newStyle"+(i+1)
    }
  }
  return response
}

function findTextStyleName(allStyles, style) {
  var response = completeStyle(style)
  for (var i = 0; i < allStyles.length; i++) { 
    var namedStyle = completeStyle(allStyles[i])
    if (equalStyles(namedStyle, response)) {
      response = namedStyle
      break
    }
  }
  return response
}

function equalStyles(s1, s2) {
  if (s1.fontFace != s2.fontFace) {return false}
  if (s1.fontSize != s2.fontSize) {return false}
  if (s1.fontWeight != s2.fontWeight) {return false}
  if (s1.fontStyle != s2.fontStyle) {return false}
  if (s1.fontFamily != s2.fontFamily) {return false}
  if (s1.fontStretch != s2.fontStretch) {return false}
  if (s1.lineHeight != s2.lineHeight) {return false}
  if (s1.textAlign != s2.textAlign) {return false}
  if (s1.letterSpacing != s2.letterSpacing) {return false}
  if (s1.color.r != s2.color.r) {return false}
  if (s1.color.g != s2.color.g) {return false}
  if (s1.color.b != s2.color.b) {return false}
  if (s1.color.a != s2.color.a) {return false}
  if (s1.weightText != s2.weightText) {return false}
  return true
}

function completeStyle(style) {
  var response = {}
  response.name = cleanName(style.name)
  response.fontFace = style.fontFace
  response.fontSize = style.fontSize
  response.fontWeight = style.fontWeight
  response.fontStyle = style.fontStyle
  response.fontFamily = style.fontFamily
  response.fontStretch = style.fontStretch
  response.lineHeight = style.lineHeight
  response.textAlign = style.textAlign
  response.letterSpacing = style.letterSpacing
  response.color = style.color
  response.weightText = style.weightText

  if (response.fontWeight == null) {
    response.fontWeight = 400
  }
  if (response.fontStyle == null) {
    response.fontStyle = "normal"
  }
  if (response.fontStretch == null) {
    response.fontStretch = "normal"
  }
  if (response.textAlign == null) {
    response.textAlign = "left"
  }
  if (response.weightText == null) {
    response.weightText = "regular"
  }

  return response
}

function cleanName(name) {
  if (name == null) {
    return null
  }
  var response = name.toLowerCase()
  response = response.replace(/_/g, " ");
  response = response.replace(/\./g, "");
  response = response.replace(/\;/g, "");
  return camelize(response)
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

export {
  namedStyles,
  styledText,
  findTextStyleName,
  completeStyle,
  cleanName
};

// name : String
// .fontFace : String
// .fontSize : Number
//                   .fontWeight : Number -> 400
//                   .fontStyle : String -> normal
// .fontFamily : String
//                   .fontStretch : String -> normal
// .lineHeight : Number
//                   .textAlign : String -> left
// .letterSpacing : Number
// .color : Color
//                   .weightText : String -> regular