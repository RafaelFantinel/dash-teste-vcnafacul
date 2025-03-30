import React from 'react';
import { Area, IssueType } from '../types';
import { Search } from 'lucide-react';

interface FilterProps {
  area: Area;
  type: IssueType;
  titleSearch: string;
  onAreaChange: (area: Area) => void;
  onTypeChange: (type: IssueType) => void;
  onTitleSearchChange: (search: string) => void;
}

export function Filter({ 
  area, 
  type, 
  titleSearch,
  onAreaChange, 
  onTypeChange,
  onTitleSearchChange 
}: FilterProps) {
  const areas: Area[] = ['All', 'UI/UX', 'Frontend', 'Backend'];
  const types: IssueType[] = ['All', 'Melhoria', 'Ajuste', 'Bug'];

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={titleSearch}
          onChange={(e) => onTitleSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Área</label>
          <select
            value={area}
            onChange={(e) => onAreaChange(e.target.value as Area)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value as IssueType)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}