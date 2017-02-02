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
      async (err, result) => {
        if (err) {
          reject(err);
        }
        const res = await postcss([autoprefixer])
          .process(result.css, { from: inputScssPath, to: destCssPath });
        res.warnings().forEach(warning => console.log(warning.toString()));
        fs.writeFile(destCssPath, res.css, (err) => {
          if (err) {
            reject(err);
          }
          console.log(`${sparkles} ${green}Finished!${reset}`);
          resolve();
        });
      }
    );
  });
}

if (require.main === module) {
  build();
}

Object.assign(exports, { build, file: inputScssPath });
