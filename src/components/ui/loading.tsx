import { cn } from "@/lib/utils";

export function Loading({
  className,
  size = 'md'
}: React.ComponentProps<"div"> & {
  size?: "sm" | "md" | "lg"
}) {
  const sizeClass = {
    'sm': 'w-4 h-4',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8'
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center justify-center">
        <div className={cn("animate-spin border-b-4 border-white rounded-full", sizeClass[size], className)}></div>
      </div>
    </div>
  )
}