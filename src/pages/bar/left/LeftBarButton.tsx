import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type SidebarButtonProps = {
  to: string;
  label: string;
  icon: string;
  iconFill: string;
  currentPath: string;
};

export default function LeftBarButton({
  to,
  label,
  icon,
  iconFill,
  currentPath,
}: SidebarButtonProps) {
  const isActive = currentPath === to;

  return (
    <Button
      asChild
      variant="ghost"
      className={`w-full justify-start gap-3 text-sm hover:bg-zinc-800 px-3 py-2 text-white ${
        isActive ? "bg-zinc-800" : ""
      }`}
    >
      <Link to={to}>
        <div className="flex items-center gap-2">
          <img
            src={isActive ? iconFill : icon}
            alt={label}
            className="w-5 h-5"
          />
          <span>{label}</span>
        </div>
      </Link>
    </Button>
  );
}
