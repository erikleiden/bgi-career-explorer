import { Briefcase, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { CLUSTER_COLORS, OUTLOOK_CONFIG } from '../data/occupations';
import { formatWage, formatEmployment } from '../lib/utils';

export default function OccupationCard({ occupation, onClick, isSelected }) {
  const clusterStyle = CLUSTER_COLORS[occupation.cluster] || CLUSTER_COLORS['Business & Administration'];
  const outlookStyle = OUTLOOK_CONFIG[occupation.outlook] || OUTLOOK_CONFIG['Average'];

  return (
    <button
      onClick={() => onClick(occupation)}
      className={`
        w-full text-left rounded-xl border bg-white transition-all duration-150
        hover:shadow-md hover:border-[#024879]/30 hover:-translate-y-0.5
        ${isSelected
          ? 'border-[#024879] shadow-md ring-2 ring-[#024879]/20'
          : 'border-gray-200 shadow-sm'
        }
      `}
    >
      <div className="p-4">
        {/* Cluster badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border leading-tight"
            style={{
              backgroundColor: clusterStyle.bg,
              color: clusterStyle.text,
              borderColor: clusterStyle.border,
            }}
          >
            {occupation.cluster}
          </span>
          <span
            className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${outlookStyle.bg} ${outlookStyle.color} ${outlookStyle.border}`}
          >
            {occupation.outlook}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-[#024879] text-sm leading-snug mb-3">
          {occupation.title}
        </h3>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-[#024879]/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-[#024879]" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900 leading-tight">
                {formatWage(occupation.medianWage)}
              </div>
              <div className="text-[10px] text-gray-400 leading-tight">median/yr</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-[#024879]/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-3.5 h-3.5 text-[#024879]" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900 leading-tight">
                {formatEmployment(occupation.employment)}
              </div>
              <div className="text-[10px] text-gray-400 leading-tight">employed</div>
            </div>
          </div>
        </div>

        {/* Education footer */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-[11px] text-gray-500 leading-tight">{occupation.education}</span>
        </div>
      </div>
    </button>
  );
}
