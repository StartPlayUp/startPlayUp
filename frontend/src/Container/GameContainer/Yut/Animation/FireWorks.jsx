// const { keyframes } = require("styled-components");

// const particles = 50;
// const width = 500;
// const height = 500;

// // Create the explosion...
// $box - shadow: ();
// $box - shadow2: ();
// @for $i from 0 through $particles {
//     $box - shadow: $box - shadow,
//         random($width) - $width / 2 + px
//     random($height) - $height / 1.2 + px
//     hsl(random(360), 100, 50);
//     $box - shadow2: $box - shadow2, 0 0 #fff
// }
// @mixin keyframes($animationName) {
//     @-webkit - keyframes #{ $animationName } {
//         @content;
//     }

//     @-moz - keyframes #{ $animationName } {
//         @content;
//     }

//     @-o - keyframes #{ $animationName } {
//         @content;
//     }

//     @-ms - keyframes #{ $animationName } {
//         @content;
//     }

//     @keyframes #{ $animationName } {
//         @content;
//     }
// }

// @mixin animation - delay($settings) {
//     -moz - animation - delay: $settings;
//     -webkit - animation - delay: $settings;
//     -o - animation - delay: $settings;
//     -ms - animation - delay: $settings;
//     animation - delay: $settings;
// }

// @mixin animation - duration($settings) {
//     -moz - animation - duration: $settings;
//     -webkit - animation - duration: $settings;
//     -o - animation - duration: $settings;
//     -ms - animation - duration: $settings;
//     animation - duration: $settings;
// }

// @mixin animation($settings) {
//     -moz - animation: $settings;
//     -webkit - animation: $settings;
//     -o - animation: $settings;
//     -ms - animation: $settings;
//     animation: $settings;
// }

// @mixin transform($settings) {
//     transform: $settings;
//     -moz - transform: $settings;
//     -webkit - transform: $settings;
//     -o - transform: $settings;
//     -ms - transform: $settings;
// }

// body {
//     margin: 0;
//     padding: 0;
//     background: #000;
//     overflow: hidden;
// }

// .pyro > .before, .pyro > .after {
//     position: absolute;
//     width: 5px;
//     height: 5px;
//     border - radius: 50 %;
//     box - shadow: $box - shadow2;
//     @include animation((1s bang ease - out infinite backwards, 1s gravity ease -in infinite backwards, 5s position linear infinite backwards));
// }

// .pyro > .after {
//     @include animation - delay((1.25s, 1.25s, 1.25s));
//     @include animation - duration((1.25s, 1.25s, 6.25s));
// }

// @include keyframes(bang) {
//   to {
//         box - shadow: $box - shadow;
//     }
// }

// @include keyframes(gravity)  =>keyframes`
//   to {
//         @include transform(translateY(200px));
//         opacity: 0;
//     }
// `;

// const include = (position) => keyframes`
//     0 %, 19.9 % {
//         margin- top: 10 %;
//         margin - left: 40 %;
//     }
//     20 %, 39.9 % {
//         margin- top: 40 %;
//         margin - left: 30 %;
//     }
//     40 %, 59.9 % {
//         margin- top: 20 %;
//         margin - left: 70 %
//     }
//     60 %, 79.9 % {
//         margin- top: 30 %;
//         margin - left: 20 %;
//     }
//     80 %, 99.9 % {
//         margin- top: 30 %;
//         margin - left: 80 %;
//     }
// `;
