import { NATIONAL_MEDIAN_WAGE, DATA_YEAR } from '../data/occupations';
import { formatWage, formatNumber } from '../lib/utils';

export default function StatsBar({ occupations, filtered }) {
  const avgWage = filtered.length
    ? Math.round(filtered.reduce((sum, o) => sum + Math.min(o.medianWage, 229300), 0) / filtered.length)
    : 0;

  const totalEmployed = filtered.reduce((sum, o) => sum + o.employment, 0);

  const fastGrowthCount = filtered.filter(
    o => o.outlook === 'Much faster than average' || o.outlook === 'Faster than average'
  ).length;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex flex-wrap gap-x-6 gap-y-1">
      <Stat
        label="Occupations shown"
        value={filtered.length}
        sub={`of ${occupations.length} total`}
      />
      <Stat
        label="Avg. median wage (shown)"
        value={filtered.length ? formatWage(avgWage) : '—'}
        sub={`vs. ${formatWage(NATIONAL_MEDIAN_WAGE)} national median`}
      />
      <Stat
        label="Total employed (shown)"
        value={filtered.length ? formatNumber(totalEmployed) : '—'}
        sub="workers"
      />
      <Stat
        label="Above-average outlook"
        value={filtered.length ? fastGrowthCount : '—'}
        sub={filtered.length ? `of ${filtered.length} shown` : ''}
      />
      <span className="ml-auto self-center text-[10px] text-gray-400 hidden sm:block">
        BLS data, {DATA_YEAR}
      </span>
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-sm font-bold text-[#024879]">{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
      {sub && <span className="text-[10px] text-gray-300">· {sub}</span>}
    </div>
  );
}
