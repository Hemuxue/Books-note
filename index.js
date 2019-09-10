const chalk = require('chalk');
const execSync = require('child_process').execSync;
const print = console.log;
const log = {
  info   : (msg) => {
    print(chalk.bgBlue.black('INFO'), chalk.blue(msg));
  },
  warn   : (msg) => {
    print(chalk.bgYellow.black('WARN'), chalk.yellow(msg));
  },
  error  : (msg) => {
    print(chalk.bgRed.black('ERROR'), chalk.red(msg));
  },
  success: (msg) => {
    print(chalk.bgGreen.black('SUCCESS'), chalk.green(msg));
  }
};

function pushOrigin() {
  console.log('inter');
  execSync(`git checkout master`);
  execSync('git add .');
  execSync(`git commit -m "feat:${this.getTime()} done"`);
  execSync(`git push hmx master`);
  log.success('Please, Keep learning and keep progressing');
  log.success('Bye!');
}

pushOrigin();

