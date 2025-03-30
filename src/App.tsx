import React, { useEffect, useState } from 'react';
import { GitHubIssue, Area, IssueType } from './types';
import { IssueCard } from './components/IssueCard';
import { Filter } from './components/Filter';

const REPO_OWNER = 'vcnafacul';
const REPO_NAME = 'ms-simulado';

function App() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [area, setArea] = useState<Area>('All');
  const [type, setType] = useState<IssueType>('All');
  const [titleSearch, setTitleSearch] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open`
      );
      if (!response.ok) throw new Error('Failed to fetch issues');
      const data = await response.json();
      setIssues(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesArea =
      area === 'All' || issue.labels.some((label) => 
        label.name.toLowerCase() === (area === 'UI/UX' ? 'ux/ui' : area.toLowerCase())
      );
    const matchesType =
      type === 'All' || issue.labels.some((label) => 
        label.name.toLowerCase() === type.toLowerCase()
      );
    const matchesTitle = 
      titleSearch.length < 3 || 
      issue.title.toLowerCase().includes(titleSearch.toLowerCase());
    
    return matchesArea && matchesType && matchesTitle;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">Error: {error}</p>
          <button
            onClick={fetchIssues}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://avatars.githubusercontent.com/u/128550116?s=200&v=4" 
              alt="Tasks Logo" 
              className="w-8 h-8 rounded-full"
            />
            <h1 className="text-3xl font-bold text-gray-900">
              Tasks disponíveis
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filter
          area={area}
          type={type}
          titleSearch={titleSearch}
          onAreaChange={setArea}
          onTypeChange={setType}
          onTitleSearchChange={setTitleSearch}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {filteredIssues.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                Nenhuma issue encontrada com os filtros selecionados.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;