import { socialLinks } from "./constants";

interface SocialIconsProps {
  /** Tailwind classes controlling the icon size (and any responsive variants). */
  iconClassName: string;
  /** Tailwind classes applied to the wrapping flex container. */
  containerClassName?: string;
}

export default function SocialIcons({
  iconClassName,
  containerClassName = "",
}: SocialIconsProps) {
  return (
    <div className={`flex items-center ${containerClassName}`}>
      {socialLinks.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          className="text-[#F5F7FA] transition-opacity hover:opacity-60"
          aria-label={label}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
