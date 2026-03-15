import bgiLogo from '../assets/bgi-logo.svg';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 sticky top-0 z-40">
      <a href="https://burningglassinstitute.org" target="_blank" rel="noreferrer" className="flex-shrink-0">
        <img src={bgiLogo} alt="Burning Glass Institute" className="h-9" />
      </a>
      <div className="border-l border-gray-200 pl-4">
        <h1 className="text-lg font-bold text-[#024879] leading-tight">BLS Career Explorer</h1>
        <p className="text-xs text-gray-500 leading-tight">
          Helping students explore career paths — powered by U.S. Bureau of Labor Statistics data
        </p>
      </div>
    </header>
  );
}
