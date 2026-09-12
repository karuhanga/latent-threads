export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M3 12h17m-7-7 7 7-7 7'} /></svg>;
}

export function ThreadMark() {
  return <svg className="thread-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M5 5v13c0 7 6 7 6 0V5m7 0v26m7-26v13c0 7 6 7 6 0V5M5 31h26" /></svg>;
}

export function Waveform({ className = '' }: { className?: string }) {
  return (
    <svg className={`waveform ${className}`} viewBox="0 0 480 120" fill="none" aria-hidden="true">
      {Array.from({ length: 61 }, (_, index) => {
        const height = 5 + Math.sin((index / 60) * Math.PI) * (24 + 76 * Math.abs(Math.sin(index * 0.71)));
        return <path key={index} d={`M${index * 8} ${60 - height / 2}v${height}`} />;
      })}
    </svg>
  );
}

export function SoundRings() {
  return <svg className="sound-rings" viewBox="0 0 120 85" fill="none" aria-hidden="true"><path d="M18 24a26 26 0 0 1 0 37M35 12a43 43 0 0 1 0 61M52 1a59 59 0 0 1 0 83M4 34v17" /></svg>;
}
