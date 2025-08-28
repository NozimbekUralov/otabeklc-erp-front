'use client'

import { Button } from "./ui/button"
import Link from "next/link"
import { Logo } from "@/components/logo"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-between items-center p-4">
      <Logo />
      <Link href={'/auth/login'}>
        <Button variant={'outline'}>Sign in</Button>
      </Link>
    </header>
  )
}