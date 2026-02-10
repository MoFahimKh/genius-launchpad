import Image from "next/image";

export function NothingHereYet() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-hidden gap-4 px-6 py-12 text-center">
      <Image
        src="/icons/empty-icon.png"
        alt="Nothing here yet"
        width={96}
        height={96}
        className="opacity-80"
      />
      <p className="text-base font-semibold text-(--muted-2)">Nothing here yet</p>
    </div>
  );
}
