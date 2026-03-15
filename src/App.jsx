import { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { occupations, OUTLOOK_OPTIONS } from './data/occupations';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterPanel from './components/FilterPanel';
import OccupationCard from './components/OccupationCard';
import OccupationModal from './components/OccupationModal';
import StatsBar from './components/StatsBar';

const OUTLOOK_RANK = {
  'Much faster than average': 0,
  'Faster than average': 1,
  'Average': 2,
  'Slower than average': 3,
  'Decline': 4,
};

const DEFAULT_FILTERS = {
  search: '',
  cluster: '',
  education: '',
  outlook: '',
  sortBy: 'wage-desc',
};

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    if (!selected) return;
    const handler = e => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected]);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const filtered = useMemo(() => {
    let result = occupations.filter(occ => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const hit =
          occ.title.toLowerCase().includes(q) ||
          occ.cluster.toLowerCase().includes(q) ||
          (occ.alsoKnownAs || []).some(a => a.toLowerCase().includes(q));
        if (!hit) return false;
      }
      if (filters.cluster && occ.cluster !== filters.cluster) return false;
      if (filters.education && occ.education !== filters.education) return false;
      if (filters.outlook && occ.outlook !== filters.outlook) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case 'wage-desc':   return Math.min(b.medianWage, 229300) - Math.min(a.medianWage, 229300);
        case 'wage-asc':    return Math.min(a.medianWage, 229300) - Math.min(b.medianWage, 229300);
        case 'name-asc':    return a.title.localeCompare(b.title);
        case 'outlook':     return (OUTLOOK_RANK[a.outlook] ?? 99) - (OUTLOOK_RANK[b.outlook] ?? 99);
        case 'employment':  return b.employment - a.employment;
        default:            return 0;
      }
    });

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <StatsBar occupations={occupations} filtered={filtered} />

      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={filtered.length}
          totalCount={occupations.length}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-5">
          {filtered.length === 0 ? (
            <EmptyState onClear={() => setFilters(DEFAULT_FILTERS)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filtered.map(occ => (
                <OccupationCard
                  key={occ.id}
                  occupation={occ}
                  onClick={setSelected}
                  isSelected={selected?.id === occ.id}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />

      {selected && (
        <OccupationModal
          occupation={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <Search className="w-10 h-10 text-gray-300 mb-3" />
      <h3 className="text-base font-semibold text-gray-600 mb-1">No occupations match your filters</h3>
      <p className="text-sm text-gray-400 mb-4 max-w-xs">
        Try removing a filter or broadening your search to see more results.
      </p>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-[#024879] text-white text-sm rounded-lg hover:bg-[#024879]/90 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
