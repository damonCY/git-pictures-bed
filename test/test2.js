const child = require('child_process');

try {
//  const data = child.execSync('git commit -m"test"', {cwd: '/Users/wuxi/work/personal/github-upload/repo/image_db'}).toString();
  const data = child.spawnSync('git', ['commit', '-m', 'aaa'], {
    // stdio: 'inherit',
    cwd: '/Users/wuxi/work/personal/github-upload/repo/image_db'
  });
  console.log('---', data.stdout.toString());
} catch (error) {
  console.log('---', data.stdout);
}