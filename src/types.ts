export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  labels: {
    name: string;
    color: string;
  }[];
  created_at: string;
  updated_at: string;
}

export type Area = 'UI/UX' | 'Frontend' | 'Backend' | 'All';
export type IssueType = 'Melhoria' | 'Ajuste' | 'Bug' | 'All';