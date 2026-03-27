import portfolioData from '@/data/portfolio.json'

export function Footer() {
  const { socials } = portfolioData
  return (
    <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#060e20] font-label text-xs uppercase tracking-widest border-t border-outline-variant/10">
      <div className="text-[#a3aac4]">© {new Date().getFullYear()} TAWONA RWATIDA • ENGINEERED WITH PRECISION</div>
      <div className="flex gap-8">
        {socials.map(s => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a3aac4] hover:text-[#69f6b8] transition-all opacity-80 hover:opacity-100"
          >
            {s.name}
          </a>
        ))}
      </div>
    </footer>
  )
}
