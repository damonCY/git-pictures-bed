const child = require('child_process')

module.exports = {
  update() {
    child.execSync(`npm install git-pictures-bed -g`, { stdio: 'inherit' });
  },
  getUserName(git) {
    const matches = git.match(/github\.com:(.*)\/.*/);
    return matches[1];
  },
  spawn(cmd, options = {}) {
    try {
      const cmds = cmd.split(' ');
      // console.log(`excute: ${cmd}`, cmds[0], cmds.slice(1));
      const data = child.spawnSync(cmds[0], cmds.slice(1), Object.assign({ stdio: 'inherit'}, options));
      // console.log(data.stdout.toString());
    } catch (error) {
      throw(error.message);
    }
  }
}