export const VintagePatterns = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
      {/* Decorative vintage elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-vintage-brown rounded-full opacity-20" />
      <div className="absolute top-20 right-20 w-24 h-24 border-2 border-vintage-gold rounded-full opacity-15" />
      <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-vintage-brown rounded-full opacity-10" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-vintage-gold rounded-full opacity-25" />
      
      {/* Vintage corner ornaments */}
      <div className="absolute top-0 left-0 w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full text-vintage-brown opacity-20">
          <path d="M0,0 Q25,25 50,0 T100,0 L100,50 Q75,25 50,50 T0,50 Z" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute top-0 right-0 w-40 h-40 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-vintage-gold opacity-15">
          <path d="M0,0 Q25,25 50,0 T100,0 L100,50 Q75,25 50,50 T0,50 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};