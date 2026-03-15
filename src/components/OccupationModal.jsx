import { X, GraduationCap, TrendingUp, Users, Briefcase, MapPin, Tag, BookOpen, ExternalLink } from 'lucide-react';
import { CLUSTER_COLORS, OUTLOOK_CONFIG, NATIONAL_MEDIAN_WAGE } from '../data/occupations';
import { formatWage, formatNumber, formatEmployment, wageVsMedian, wageLabelColor } from '../lib/utils';
import WageComparisonChart from './WageComparisonChart';

function Tooltip({ text, children }) {
  return (
    <span className="group relative inline-flex items-center cursor-help">
      {children}
      <span className="pointer-events-none absolute left-0 top-full mt-1.5 z-[60] w-56 rounded-lg bg-gray-800 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        {text}
      </span>
    </span>
  );
}

function KPICard({ icon: Icon, label, value, sub, tooltip }) {
  const inner = (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 text-[#024879]" />
        <span className="text-[11px] text-gray-500 font-medium">{label}</span>
      </div>
      <div className="font-bold text-gray-900 text-sm leading-tight">{value}</div>
      {sub && <div className="text-[10px] text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip text={tooltip}>
        {inner}
      </Tooltip>
    );
  }
  return inner;
}

export default function OccupationModal({ occupation, onClose }) {
  if (!occupation) return null;

  const clusterStyle = CLUSTER_COLORS[occupation.cluster] || CLUSTER_COLORS['Business & Administration'];
  const outlookStyle = OUTLOOK_CONFIG[occupation.outlook] || OUTLOOK_CONFIG['Average'];
  const { pct } = wageVsMedian(occupation.medianWage);
  const wageColor = wageLabelColor(occupation.medianWage);

  const growthLabel =
    occupation.growthRate < 0
      ? `${occupation.growthRate}% (declining)`
      : `+${occupation.growthRate}%`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${occupation.title} details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span
                  className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: clusterStyle.bg, color: clusterStyle.text, borderColor: clusterStyle.border }}
                >
                  {occupation.cluster}
                </span>
                <span
                  className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border ${outlookStyle.bg} ${outlookStyle.color} ${outlookStyle.border}`}
                >
                  {occupation.outlook}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#024879] leading-tight">{occupation.title}</h2>
              <p className="text-xs text-gray-400 mt-0.5">SOC code: {occupation.id}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
          {/* KPI grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <KPICard
              icon={TrendingUp}
              label="Median Wage"
              value={formatWage(occupation.medianWage)}
              sub={<span className={`font-semibold ${wageColor}`}>{pct >= 0 ? `+${pct}%` : `${pct}%`} vs. national median</span>}
              tooltip="Median annual wage from BLS Occupational Employment & Wage Statistics, May 2023. Half of workers in this occupation earn more, half earn less."
            />
            <KPICard
              icon={Users}
              label="Employed"
              value={formatEmployment(occupation.employment)}
              sub={`${formatNumber(occupation.employment)} workers`}
              tooltip="Total number of people employed in this occupation as of May 2023, across all industries and states."
            />
            <KPICard
              icon={Briefcase}
              label="Annual Openings"
              value={formatNumber(occupation.annualOpenings)}
              sub="projected/yr"
              tooltip="Average projected annual job openings over 2023–2033, including new jobs and replacement openings from retirements and career changes."
            />
            <KPICard
              icon={TrendingUp}
              label="10-Yr Growth"
              value={growthLabel}
              sub="2023–2033"
              tooltip={`Projected employment change from 2023 to 2033. The national average for all occupations is about 5–6%. "${occupation.outlook}" = ${occupation.outlook === 'Much faster than average' ? '14%+' : occupation.outlook === 'Faster than average' ? '8–13%' : occupation.outlook === 'Average' ? '5–7%' : occupation.outlook === 'Slower than average' ? '1–4%' : 'negative growth'}.`}
            />
          </div>

          {/* Wage chart */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <WageComparisonChart occupation={occupation} />
          </div>

          {/* Education */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
              <GraduationCap className="w-4 h-4 text-[#024879]" />
              Education & Training
            </h3>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <div className="font-semibold text-sm text-[#024879]">{occupation.education}</div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{occupation.educationNote}</p>
            </div>
          </div>

          {/* Typical tasks */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
              <BookOpen className="w-4 h-4 text-[#024879]" />
              Typical Tasks
            </h3>
            <ul className="space-y-2">
              {occupation.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 leading-snug">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#024879]/10 text-[#024879] text-[11px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Work context */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-[#024879]" />
              Work Environment
            </h3>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 border border-gray-100 leading-relaxed">
              {occupation.workContext}
            </p>
          </div>

          {/* Also known as */}
          {occupation.alsoKnownAs?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                <Tag className="w-4 h-4 text-[#024879]" />
                Also Known As
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {occupation.alsoKnownAs.map(name => (
                  <span
                    key={name}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* BLS link */}
          <div className="pt-1">
            <a
              href={`https://www.bls.gov/ooh/`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#024879] hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View full profile on BLS Occupational Outlook Handbook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
