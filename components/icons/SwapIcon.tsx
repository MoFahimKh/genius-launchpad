type IconProps = {
  size?: number;
  className?: string;
  alt?: string;
};

export function SwapIcon({ size = 20, className, alt = "Swap" }: IconProps) {
  return (
    <img
      src="/icons/swap.svg"
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  );
}
