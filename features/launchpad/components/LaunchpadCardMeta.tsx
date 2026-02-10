import { Clock, Send, Globe, MessageCircle, Search } from "lucide-react";
import { LaunchpadItem } from "@/types/launchpad";
import XTwitter from "@/components/icons/x-twitter";
import Link from "next/link";

function getBscScanUrl(address: string, networkId?: number): string | null {
  // Only show BSCScan link for BSC network (networkId === 56)
  if (networkId === 56 && address) {
    return `https://bscscan.com/token/${address}`;
  }
  return null;
}

export function LaunchpadCardMeta({ item }: { item: LaunchpadItem }) {
  const socialLinks = item.socialLinks || {};
  const hasSocialLinks = Object.values(socialLinks).some(Boolean);
  const bscScanUrl = getBscScanUrl(item.id, item.networkId);

  return (
    <div className="flex items-center gap-3 text-xs text-(--muted)">
      <div className="flex items-center gap-1 text-(--accent-2)">
        <Clock size={14} />
        <span className="font-medium">{item.age}</span>
      </div>
      <div className="flex items-center gap-2 text-(--muted)">
        {bscScanUrl && (
          <Link
            href={bscScanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            aria-label="View on BSCScan"
          >
            <Search size={16} />
          </Link>
        )}
        {hasSocialLinks && (
          <>
            {socialLinks.twitter && (
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="Twitter"
              >
                <XTwitter />
              </Link>
            )}
            {socialLinks.telegram && (
              <Link
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="Telegram"
              >
                <Send size={16} />
              </Link>
            )}
            {socialLinks.website && (
              <Link
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="Website"
              >
                <Globe size={16} />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
