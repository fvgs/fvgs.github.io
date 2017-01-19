const gaze = require('gaze');

const { build, file } = require('./build.js');

const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const glasses = '\u{1f453} ';

run(build);
watch(file, build);

async function run(build) {
  const time = process.hrtime();
  await build();
  const diff = process.hrtime(time);
  const seconds = (diff[0] + (diff[1] / 1e9)).toFixed(3);
  console.log(`Completed in ${seconds}s`);
}

function watch(file, build) {
  gaze(file, (err, watcher) => {
    if (err) {
      throw err;
    }
    console.log(`${glasses} ${yellow}Watching ${file}...${reset}`);
    watcher.on('changed', () => run(build));
  });
}
