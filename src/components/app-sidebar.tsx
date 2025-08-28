'use client'

import Link from "next/link";
import { Home, UserPlus } from 'lucide-react';
import { useEffect, useState } from "react";

import type { INavItems } from "@/lib/types";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useSupabase } from "@/contexts/supabase";
import { Tables } from "@/db/types";
import { Loading } from "@/components/ui/loading";

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
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarMenu className="px-2">
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
      </SidebarContent>
    </Sidebar>
  );
}