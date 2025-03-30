import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GitHubIssue } from '../types';

interface IssueCardProps {
  issue: GitHubIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{issue.title}</h3>
        <a
          href={issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {issue.labels.map((label) => (
          <span
            key={label.name}
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `#${label.color}`,
              color: parseInt(label.color, 16) > 0xffffff / 2 ? '#000' : '#fff',
            }}
          >
            {label.name}
          </span>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Criado em: {new Date(issue.created_at).toLocaleDateString('pt-BR')}
      </div>
    </div>
  );
}