const path = require('path');
const simpleGit = require('simple-git');

async function commitAndPushChanges(clonePath, repoUrl) {
    const git = simpleGit(clonePath);
  
    try {
      // Check if 'origin' remote exists before removing
      const remotes = await git.getRemotes(true);
      const originExists = remotes.some(remote => remote.name === 'origin');

      if (originExists) {
        await git.removeRemote('origin');
      }
      await git
        .add('./*') 
        .commit('commit message')
        .addRemote('origin', repoUrl); 
  
      // Pull changes before pushing
      await git.pull('origin', 'main');
  
      await git.push(['-u', 'origin', 'main']); 
  
      console.log('Code committed and pushed successfully.');
    } catch (error) {
      console.error('An error occurred during the process:', error);
    }
}

const clonePath = path.resolve(__dirname);
commitAndPushChanges(clonePath, 'https://github.com/cal-brynestad/test-simple-git.git')