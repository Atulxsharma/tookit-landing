export function BrandLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const styles = {
    sm: 'text-[18px]',
    md: 'text-[22px]',
    lg: 'text-[48px]'
  };

  return (
    <div
      className={`inline-flex items-baseline font-sans font-bold leading-none tracking-[-0.5px] ${styles[size]}`}
      aria-label="tookit"
    >
      <span className="text-[#F0FDF4]">took</span>
      <span className="text-[#4ADE80]">it</span>
    </div>
  );
}
