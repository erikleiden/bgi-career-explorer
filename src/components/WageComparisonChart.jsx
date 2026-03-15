import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { NATIONAL_MEDIAN_WAGE } from '../data/occupations';
import { formatWage } from '../lib/utils';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-semibold text-gray-700">{payload[0].payload.name}</p>
      <p className="text-[#024879] font-bold">{formatWage(payload[0].value)}</p>
      <p className="text-gray-400 text-xs">median annual wage</p>
    </div>
  );
};

export default function WageComparisonChart({ occupation }) {
  const data = [
    {
      name: 'National Median\n(All Occupations)',
      shortName: 'All Occupations',
      wage: NATIONAL_MEDIAN_WAGE,
      isNational: true,
    },
    {
      name: occupation.title,
      shortName: occupation.title.length > 20 ? occupation.title.slice(0, 18) + '…' : occupation.title,
      wage: occupation.medianWage >= 229300 ? 229300 : occupation.medianWage,
      isNational: false,
    },
  ];

  const maxVal = Math.max(NATIONAL_MEDIAN_WAGE, occupation.medianWage >= 229300 ? 230000 : occupation.medianWage);
  const yMax = Math.ceil((maxVal * 1.15) / 10000) * 10000;

  const diff = occupation.medianWage - NATIONAL_MEDIAN_WAGE;
  const pct = Math.round((diff / NATIONAL_MEDIAN_WAGE) * 100);
  const diffLabel = diff >= 0 ? `+${formatWage(diff)} (+${pct}%)` : `${formatWage(diff)} (${pct}%)`;
  const diffColor = diff >= 0 ? 'text-emerald-700' : 'text-amber-700';

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Wage vs. National Median</h3>
        <span className={`text-xs font-semibold ${diffColor}`}>{diffLabel} vs. median</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }} barSize={52}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="shortName"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, yMax]}
            tickFormatter={v => `$${v / 1000}k`}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            width={42}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(2,72,121,0.05)' }} />
          <Bar dataKey="wage" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.isNational ? '#81A3BC' : '#024879'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-gray-400 text-center -mt-1">
        National median all occupations: {formatWage(NATIONAL_MEDIAN_WAGE)}/yr (BLS 2023)
        {occupation.medianWage >= 229300 && ' · This occupation\'s wage is reported as $229,300+ by BLS'}
      </p>
    </div>
  );
}
