const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const fs = require("fs-extra");
const runSequence = require("run-sequence");
const replace = require("gulp-string-replace");
const sourcemaps = require("gulp-sourcemaps");
const notifier = require("node-notifier");
const rename = require("gulp-rename");
const minify = require("gulp-minifier");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const Builder = require("systemjs-builder");
const cleanCSS = require("gulp-clean-css");
const _ = require("lodash");
const typescript = require("gulp-typescript");
const tslint = require("gulp-tslint");

//////////////////////////////////////////////////////////////////////////////// ASSETS

gulp.task("sass", function () {
    return gulp.src("src/assets/styles/miaa.scss")
        .pipe(sass({
            includePaths: [
                "node_modules"
            ],
            // this minifies the code so there is no real need for extra minification.
            outputStyle: "compressed"
        }).on("error", function (err) {
            sass.logError.bind(this)(err);
            process.exit(1);
        }))
        .pipe(postcss(
            [cssnext({ browsers: ["last 1 version"] })]
        ))
        .pipe(sourcemaps.write("."))
        .pipe(replace(".miaa html", "html .miaa"))
        .pipe(replace(".miaa body", ".miaa"))
        .pipe(rename("miaa.min.css"))
        .on("error", function () {
            console.dir(arguments);
        })
        .pipe(gulp.dest("dist"));
});

//////////////////////////////////////////////////////////////////////////////// MINIFICATION

gulp.task("minify:js", function () {
    return gulp.src("dist/miaa.js")
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            getKeptComment: function (content) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join("\n") + "\n" || "";
            }
        }))
        .pipe(rename("miaa.min.js"))
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:css", function () {
    return gulp.src("dist/miaa.css")
        .pipe(cleanCSS())
        .pipe(rename("miaa.min.css"))
        .pipe(gulp.dest("dist"));
});

gulp.task("minify", ["minify:js", "minify:css"]);

gulp.task("dist", function (cb) {
    runSequence(
        "clean",
        ["sass", "bundle"],
        "minify",
        function () {
            notifier.notify("build finished");
            cb();
        });
});
gulp.task("default", ["dist"]);

gulp.task("build", ["typescript", "copy_html"]);

gulp.task("bundle", ["build"], function (cb) {
    var builder = new Builder();
    builder.config({
        packages: {
            tmp: {
                main: "App",
                defaultExtension: "js"
            }
        }
    })

    builder
        .loadConfig("systemjs-config.js")
        .then(function () {
            return builder
                .buildStatic("tmp", "dist/miaa.js", {
                    runtime: false,
                    globalName: "miaa",
                    globalDeps: {
                        "vue": "Vue",
                        "vue-router": "VueRouter",
                        "lodash": "_",
                    },
                    externals: ["vue", "vue-router", "lodash"]
                });
        })
        .then(function () {
            // strips whitespace from imported HTML files
            gulp.src("dist/miaa.js")
                .pipe(replace(/\\n */g, "", {
                    logs: {
                        enabled: false
                    }
                }))
                .on("error", function () {
                    throw arguments;
                })
                .pipe(gulp.dest("dist"))
                .on("end", () => cb());
        })
        .catch(function (err) {
            console.error(err);
            process.exit(1);
        });
});

gulp.task("clean", function () {
    return del(["tmp", "dist"]);
});

gulp.task("copy_html", function () {
    return gulp.src("src/app/**/*.html")
        .pipe(replace(/\n */g, "", {
            logs: {
                enabled: false
            }
        })) // strips whitespace from imported HTML files 
        .on("error", function () {
            console.error(arguments);
            process.exit(1);
        })
        .pipe(gulp.dest("./tmp"));
});

gulp.task("tslint", function () {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
        .on("error", function () {
            console.error(arguments);
            process.exit(1);
        });
});

gulp.task("typescript", ["generate_screens_index", "tslint"], function () {
    const tsProject = typescript.createProject("tsconfig.json", {
        module: "es6"
    });
    return tsProject.src()
        .pipe(tsProject())
        .on("error", () => {
            process.exit(1);
        })
        .js.pipe(gulp.dest("./tmp"));

});

gulp.task("generate_screens_index", function () {
    const screensDir = "src/app/screens/";
    return fs.readdir(screensDir)
        .then(contents => {
            contents = contents.filter(c => fs.lstatSync(screensDir + c).isDirectory())
                .map(dir => `import "./${dir}/${dir}";`);
            contents.push("");
            contents.unshift("// THIS FILE IS GENERATED. DO NOT EDIT DIRECTLY.");
            return fs.writeFile(screensDir + "index.ts", contents.join("\n"))
        });
});