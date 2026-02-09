type IconProps = {
  size?: number;
  className?: string;
  alt?: string;
};

export function ChevronDownIcon({
  size = 16,
  className,
  alt = "Chevron down"
}: IconProps) {
  return (
    <img
      src="/icons/chevron-down.svg"
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  );
}
