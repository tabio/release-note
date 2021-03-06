import { Octokit } from '@octokit/rest';

const ICONS = ['π', 'π', 'π΄', 'ποΈ', 'π€Ύ', 'ποΈ'];
const REPOS = [
  {repo: 'release-note', name: 'γͺγͺγΌγΉγγΌγ'},
];

export async function releaseNote() {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  let releases: string[] = [];

  for (const [index, _repo] of REPOS.entries()) {
    await octokit.repos.getLatestRelease({
      owner: 'tabio',
      repo: _repo.repo,
    }).then((res) => {
      if(res.status === 200) {
        const data = res.data;
        const body = data['body']!.replace(/@/g, 'οΌ '); // γ‘γ³γ·γ§γ³γγͺγγγγ«
        const tagName = data['tag_name']; // versionζε ±
        const icon = ICONS[index];
        releases.push(`${icon}γ${_repo.name}γ (${tagName})${icon}\n\n${body}\n\n`);
      }
    });
  }

  return releases.join("\n");
}
