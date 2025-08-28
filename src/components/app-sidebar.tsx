'use client'

import Link from "next/link";
import { Home, UserPlus } from 'lucide-react';
import { useEffect, useState } from "react";

import type { INavItems } from "@/lib/types";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import { useSupabase } from "@/contexts/supabase";
import { Tables } from "@/db/types";
import { Loading } from "@/components/ui/loading";
import { Logo } from "@/components/logo";

const adminNavItems: INavItems['navItems'] = [
  { href: '/admin', label: 'Dashboard', icon: <Home className="size-5" /> },
  { href: '/admin/create-user', label: 'Create User', icon: <UserPlus className="size-5" /> },
];

const teacherNavItems: INavItems['navItems'] = [
  { href: '/teacher', label: 'Dashboard', icon: <Home className="size-5" /> }
]

export function AppSidebar() {
  const supabase = useSupabase()
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null)

  useEffect(() => {
    const getUerProfile = async () => {
      const { data, error } = await supabase.auth.getClaims()
      if (error || !data) throw error

      const { error: profileError, data: user } = await supabase.from('profiles').select().eq('id', data.claims.sub).single()

      if (profileError || !user) throw profileError

      setProfile(user)
    }
    getUerProfile()
  }, [supabase])

  if (!profile) return (
    <Sidebar collapsible="icon">
      <Loading size="lg" />
    </Sidebar>
  )

  const navItems = profile.role === 'admin' ? adminNavItems : teacherNavItems

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarGroup>
          <Logo className="text-2xl" />
        </SidebarGroup>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton>
                    {item.icon} {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}