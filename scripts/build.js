const fs = require('fs');

const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const blue = '\x1b[34m';
const green = '\x1b[32m';
const reset = '\x1b[0m';

const construction = '\u{1f3d7} ';
const sparkles = '\u2728 ';

const inputScssPath = 'src/main.scss';
const destCssPath = 'dist/main.min.css';

function build() {
  return new Promise((resolve, reject) => {
    console.log(`${construction} ${blue}Building...${reset}`);
    sass.render(
      {
        file: inputScssPath,
        outputStyle: 'compressed',
      },
      (err, result) => {
        if (err) {
          throw err;
        }
        postcss([autoprefixer])
          .process(result.css, { from: inputScssPath, to: destCssPath })
          .then((result) => {
            result.warnings().forEach(warning => console.log(warning.toString()));
            fs.writeFile(destCssPath, result.css, (err) => {
              if (err) {
                throw err;
              }
              console.log(`${sparkles} ${green}Finished!${reset}`);
              resolve();
            });
          });
      }
    );
  });
}

if (require.main === module) {
  build();
}

Object.assign(exports, { build, file: inputScssPath });
