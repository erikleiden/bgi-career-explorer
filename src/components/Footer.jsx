export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-4 text-xs text-gray-400 flex flex-col sm:flex-row gap-1 sm:gap-4 justify-between">
      <span>© {new Date().getFullYear()} Burning Glass Institute. All rights reserved.</span>
      <span>
        Data: U.S. Bureau of Labor Statistics, <em>Occupational Outlook Handbook</em> and Occupational Employment &amp; Wage Statistics, 2023.
        Wages are median annual; employment is May 2023 estimate; projections cover 2023–2033.{' '}
        <a
          href="https://www.bls.gov/ooh/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-600"
        >
          bls.gov/ooh
        </a>
      </span>
    </footer>
  );
}
