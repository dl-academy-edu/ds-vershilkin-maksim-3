const {src, dest, series, parallel, watch} = require("gulp");


const del = require("del");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const server = require("browser-sync").create();

const autoprefixer = require("gulp-autoprefixer");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const minifyjs = require("gulp-uglify");
const minify = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");

// Compressing of the styles.
function styles() {
  return src("src/sass/**/*.{sass,scss}")
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest("build/css"))
    .pipe(minify())
    .pipe(rename({extname: ".min.css"}))
    .pipe(dest("build/css"))
    .pipe(server.stream());
  cb(new Error("Something wrong with css file!"))
}

// Compressing of the javascript files.
function js(cb) {
  return src("src/js/**/*.js")
         .pipe(babel())
         .pipe(dest("build/js"))
         .pipe(minifyjs())
         .pipe(rename({extname: ".min.js"}))
         .pipe(server.stream());
  cb(new Error("Something wrong with javascript file!"))
}

// Compressing of the images
function images() {
  return src("src/imgs/**/*{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo(),
    ]))
    .pipe(dest("build/imgs"))
}

// Transformation of the images to the webp format
function webpformat() {
  return src("src/imgs/**/*{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(dest("build/imgs"))
}

function sounds() {
  return src("src/sounds/*{mp3,ogg}")
         .pipe(dest("build/sounds"))
}

// Server launching
function serve() {
  server.init({
    server: "build/"
  });

  watch("src/sass/**/*.scss", styles).on("change", server.reload);
  watch("src/js/**/*.js", js).on("change", server.reload);
  watch("src/imgs/*.*", images).on("change", server.reload);
  watch("src/**/*.html", html).on("change", server.reload);
  watch("src/**/*", build).on("change", server.reload);
}

// Creating svg sprite
function svgsprite() {
  return src("src/imgs/img_icon_*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("img_svg_sprite.svg"))
    .pipe(dest("build/imgs"))
}

// Html
function html() {
  return src("src/**/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(dest("build"))
    .pipe(server.stream());
}

// Deleting previous files
async function clean() {
  return await del("build");
}

// Copying updated files to the build folder
function copy() {
  return src([
    "src/fonts/**/*.{woff,woff2}",
    "src/imgs/**",
    "src/js/**"
  ], {
    base: "src"
  })
  .pipe(dest("build"))
}

// Building project
function build() {
  return series(
    clean,
    copy,
    parallel(js,styles,images),
    html
  );
}

exports.build = series(
  clean,
  copy,
  parallel(js,styles,images),
  html,
  serve
);

exports.default = function() {
  return series(
  clean,
  copy,
  js,
  styles,
  images,
  html,
  serve);
  watch("src/**/*.scss", styles).on("change", server.reload);
  watch("src/**/*.html", html).on("change", server.reload);
  watch("src/**/*{png,jpg,svg}", images).on("change", server.reload);
};
