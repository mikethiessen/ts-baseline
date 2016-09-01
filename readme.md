# baseline
---
Baseline is a barebones front-end boilerplate designed to help you quickly start a project and keep that project organized.

## GULP
Use the command `npm install` from the root directory to install the required plugins. Once installed, you can use the command `gulp` to setup the source folder and set the file watchers. The command `gulp build` can be used to generate the distribution files.

## BASIC LAYOUT
Baseline contains patterns to assist with the creation of basic layout, including rows and grids. The styles for these patterns can be found in `/styles/_mobules/basic-layout.scss`

## LIVING STYLE GUIDE
The Gulp file includes a script that will generate a style guide from the SASS files. It uses LivingCSS (https://github.com/straker/livingcss). It uses /src/styleguide.hb as a template and outputs a file at /dist/styleguide.html

##### Row Layout
The row pattern consists of a single row the contains multiple columns. The parent class `.row` acts as a semantic clear fix for the floated elements and the class `.col` identifies each individual column in the row. Classes are available to style width of each column in the form of a variant class where the width is expressed as a fraction. The highest denominator available is fifths and the fractions should always be reduced (i.e. `.col--2/4` is not a valid class and will need to be written as `.col--1/2`). Spacing between columns is optional and can be added by using the state class `.has-margin` on the parent row.
```
<div class="row has-margin">
    <p class="col col--1/2">Lorem Ipsum Dolor</p>
    <p class="col col--1/4">Sit amet</p>
    <p class="col col--1/4">Consectetur Adipisicing Elit</p>
</div>
```

##### Media Pattern
The media pattern consists of two columns where one column is a fixed width and the other column fills the remaing space. The parent class `.media` acts as a semantic clear fix for the floated elements while the `.media-head` and `.media-content` identify the fixed and fluid columns respectively. A maximum width of 33.333% is applied to the `.media-head` as a sane default to prevent it from overtaking the fluid content. By default, the fixed column will be displayed on the left but this can be switched to the right using the `.media-head--flip` variant class. Spacing between columns is optional and can be added by using the state class `.has-margin` on the parent container.
```
<div class="media has-margin">
    <img class="media-head media-head--flip" alt="FPO" src="/images/fpo.gif" width="100" height="100" />
    <div class="media-content">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>
</div>
```

##### Grid Layout
The grid pattern consists of a single container with multiple rows and multiple columns. The parent class `.grid` acts as a semantic clear fix for the floated elements and the class `.grid-cell` identifies each individual cell in the grid. The styles for each grid layout are generated using the `gridLayout` mixin found in `/styles/_baseline/mixins.scss`. The `gridLayout` mixin requires two parameters, `$parent_selector` and `$col_count`. The `$parent_selector` is a string that is a unique selector for the grid (e.g. `".grid--listing"`) and the `$col_count` is used to determine the number of grid cells in each row. Due to the complexity of the selectors and the difficulty in overridding those styles it is not recommend that the mixin is included outside of a media query. Spacing between grid cells is optional and can be added by using the state class `.has-margin` on the parent grid.

The grid pattern relies on the use of the `:nth-child` selector and requires the inclusion of the Selectivzr library due to a lack of support in IE8. Because IE8 also lacks support for media queries and the recommendation that the mixin not be included outside of one, it is also necessary to include a single instance of the mixin in the IE specific stylesheet using the parameters you provided for largest screen size.
```
<ul class="grid grid--large has-margin">
    <li class="grid-cell">Lorem</li>
    <li class="grid-cell">Ipsum</li>
    <li class="grid-cell">Dolor</li>
    <li class="grid-cell">Sit</li>
    <li class="grid-cell">Amet</li>
</ul>
```
```
@media only screen and (min-width: 801px) {
    @include gridLayout(".grid--large", 4)
}
```
