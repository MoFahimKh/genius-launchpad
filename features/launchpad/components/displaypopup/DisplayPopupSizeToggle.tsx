type DisplayPopupSizeToggleProps = {
  selectedSize: "small" | "large";
  onChange: (value: "small" | "large") => void;
};

export function DisplayPopupSizeToggle({
  selectedSize,
  onChange
}: DisplayPopupSizeToggleProps) {
  return (
    <div className="flex flex-row items-center gap-4 font-medium">
      <button
        type="button"
        onClick={() => onChange("small")}
        className={`text-xs flex flex-col items-center justify-center rounded-sm py-2 w-full transition-colors border border-(--border) h-13 ${
          selectedSize === "small" ? "bg-(--border)" : ""
        }`}
      >
        <p className="text-foreground/33">
          M.Cap <span className="text-foreground">44k</span>
        </p>
        <p className="text-foreground">Small</p>
      </button>
      <button
        type="button"
        onClick={() => onChange("large")}
        className={`text-xs flex flex-col items-center justify-center rounded-sm py-2 w-full transition-colors border border-(--border) h-13 ${
          selectedSize === "large" ? "bg-(--border)" : ""
        }`}
      >
        <p className="text-foreground/33">
          M.Cap <span className="text-foreground text-[18px]">44k</span>
        </p>
        <p className="text-foreground">Large</p>
      </button>
    </div>
  );
}
