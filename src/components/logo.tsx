'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function Logo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <Link href={'/'} className={cn("flex gap-2 items-center text-3xl font-bold truncate", className)} {...props}>
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      Otabek L.C
    </Link>
  )
}