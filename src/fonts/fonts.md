#/fonts/

Place the font files (EOT, WOFF, TTF, SVG) for locally stored web fonts in this folder. Local web fonts can be included in the CSS using the `localWebFont` mixin. The mixin accepts two parameters `$fontName` and `$filename`. The first parameter is the name of the font family (no spaces) and the second is the name of the file, minus the filetype.

The code below:
```
@include localWebFont("customfont", "Custom-Font-webfont");
```

Outputs to:
```
@font-face {
    font-family: customfont;
    font-style: normal;
    font-weight: normal;
    src: url("../fonts/Custom-Font-webfont.eot");
    src: url("../fonts/Custom-Font-webfont.eot?#iefix") format("embedded-opentype"),
         url("../fonts/Custom-Font-webfont.woff") format("woff"),
         url("../fonts/Custom-Font-webfont.ttf") format("truetype"),
         url("../fonts/Custom-Font-webfont.svg#customfont") format("svg");
};
```
