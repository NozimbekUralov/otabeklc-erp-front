'use client'

import { LogOutIcon, SettingsIcon, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSupabase } from "@/contexts/supabase";
import { useUser } from "@/contexts/user-provider";
import { Loading } from "./ui/loading";

export function UserAvatar() {
  const router = useRouter()
  const supabase = useSupabase()
  const { user: profile, isLoading } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  function getFirstLetters(fullName: string) {
    const words = fullName.split(' ');
    if (words.length != 2) return 'U'
    return words.map(name => name.charAt(0).toUpperCase()).join('')
  }

  if (isLoading) return (
    <Avatar>
      <Loading size="sm" />
    </Avatar>
  )

  if (!profile) return null;

  const initials = getFirstLetters(profile.firstName + ' ' + profile.lastName)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer">
        <Avatar>
          <AvatarImage
            src={profile.photo}
            alt={profile.firstName}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={profile.photo}
              alt={profile.firstName}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="font-medium leading-none">{profile.firstName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User2 />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}