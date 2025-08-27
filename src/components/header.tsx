'use client'

import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-accent flex justify-between items-center p-4">
      <Link href={'/'} className="flex gap-2 items-center">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="text-3xl font-bold">Otabek L.C</h1>
      </Link>
      <Link href={'/auth/login'}>
        <Button variant={'outline'}>Sign in</Button>
      </Link>
    </header>
  )
}