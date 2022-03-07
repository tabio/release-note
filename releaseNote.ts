import { Octokit } from '@octokit/rest';

const ICONS = ['🏄', '🏇', '🚴', '🏌️', '🤾', '🏋️'];
const REPOS = [
  {repo: 'release-note', name: 'リリースノート'},
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
        const body = data['body']!.replace(/@/g, '＠'); // メンションしないように
        const tagName = data['tag_name']; // version情報
        const icon = ICONS[index];
        releases.push(`${icon}【${_repo.name}】 (${tagName})${icon}\n\n${body}\n\n`);
      }
    });
  }

  return releases.join("\n");
}
