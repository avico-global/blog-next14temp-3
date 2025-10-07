import { cn } from "@/lib/utils";

export default function Container({ children, className, style }) {
  return (
    <div
      style={style}
      className={cn(
        "w-11/12 md:w-10/12 max-w-screen-lg flex items-center justify-center flex-col bg-cover bg-center py-8 md:py-12 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}
