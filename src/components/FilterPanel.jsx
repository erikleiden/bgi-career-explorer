import { Search, X } from 'lucide-react';
import { CLUSTERS, EDUCATION_LEVELS, OUTLOOK_OPTIONS } from '../data/occupations';

const SORT_OPTIONS = [
  { value: 'wage-desc',   label: 'Highest wage' },
  { value: 'wage-asc',    label: 'Lowest wage' },
  { value: 'name-asc',    label: 'Name (A–Z)' },
  { value: 'outlook',     label: 'Best outlook' },
  { value: 'employment',  label: 'Most employed' },
];

export default function FilterPanel({ filters, onFiltersChange, resultCount, totalCount }) {
  const { search, cluster, education, outlook, sortBy } = filters;

  const set = (key, value) => onFiltersChange({ ...filters, [key]: value });

  const hasActiveFilters = search || cluster || education || outlook;

  const clearAll = () =>
    onFiltersChange({ search: '', cluster: '', education: '', outlook: '', sortBy: filters.sortBy });

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Filters</span>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-[#E0712A] hover:underline flex items-center gap-0.5"
            >
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400">
          Showing <span className="font-semibold text-gray-700">{resultCount}</span> of {totalCount} occupations
        </p>
      </div>

      <div className="p-4 space-y-5 overflow-y-auto flex-1">
        {/* Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Search occupations</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => set('search', e.target.value)}
              placeholder="e.g. nurse, engineer…"
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024879]/20 focus:border-[#024879]"
            />
            {search && (
              <button
                onClick={() => set('search', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Career Cluster */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Career cluster
            <Tooltip text="Career clusters group occupations by related knowledge, skills, and activities. Based on the 16-cluster framework used in U.S. career education." />
          </label>
          <select
            value={cluster}
            onChange={e => set('cluster', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024879]/20 focus:border-[#024879] bg-white"
          >
            <option value="">All clusters</option>
            {CLUSTERS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Education required
            <Tooltip text="The typical minimum education needed to enter this occupation. Some jobs accept equivalent work experience." />
          </label>
          <select
            value={education}
            onChange={e => set('education', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024879]/20 focus:border-[#024879] bg-white"
          >
            <option value="">All education levels</option>
            {EDUCATION_LEVELS.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        {/* Job Outlook */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Job outlook
            <Tooltip text="BLS projected employment growth over 10 years (2023–2033). 'Average' = 5–7% growth; 'Faster than average' = 8–13%; 'Much faster' = 14%+." />
          </label>
          <select
            value={outlook}
            onChange={e => set('outlook', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024879]/20 focus:border-[#024879] bg-white"
          >
            <option value="">All outlooks</option>
            {OUTLOOK_OPTIONS.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Sort by</label>
          <select
            value={sortBy}
            onChange={e => set('sortBy', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024879]/20 focus:border-[#024879] bg-white"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* About the data */}
      <div className="p-4 border-t border-gray-100">
        <details className="group">
          <summary className="text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-700 flex items-center gap-1 list-none">
            <span className="group-open:hidden">▶</span>
            <span className="hidden group-open:inline">▼</span>
            About the data
          </summary>
          <p className="mt-2 text-xs text-gray-400 leading-relaxed">
            All data from the U.S. Bureau of Labor Statistics. Wages are median annual earnings
            (May 2023 OES). Employment growth projections cover 2023–2033. National median wage
            used for comparisons is <strong className="text-gray-600">$48,060</strong>.
          </p>
        </details>
      </div>
    </aside>
  );
}

function Tooltip({ text }) {
  return (
    <span className="group relative inline-block ml-1 cursor-help">
      <span className="text-gray-400 text-[10px] border border-gray-300 rounded-full px-1 leading-none">?</span>
      <span className="pointer-events-none absolute left-0 bottom-full mb-1.5 z-50 w-52 rounded-lg bg-gray-800 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        {text}
      </span>
    </span>
  );
}
