const child = require('child_process')

module.exports = {
  update() {
    const data = child.execSync(`npm install picture-bed-tools -g`).toString();
    console.log(data);
  },
  getUserName(git) {
    const matches = git.match(/github\.com:(.*)\/.*/);
    return matches[1];
  },
  spawn(cmd, options = {}) {
    console.log('======', cmd, options);
    try {
      const cmds = cmd.split(' ');
      const data = child.spawnSync(cmds[0], cmds.slice(1), options);
      console.log(data.stdout.toString());
    } catch (error) {
      throw(error.message);
    }
  }
}