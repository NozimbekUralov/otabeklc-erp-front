'use client'

import { Building, School, Users } from "lucide-react";
import { DashboardCard } from "./dashboard-card";
import { getGroupsCount, getRoomsCount, getStudentsCount, getTeachersCount } from "@/lib/supabase/queries";
import { useUser } from "@/contexts/user-provider";
import { Loading } from "./ui/loading";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";

export function AdminDashboard() {
  const { user: profile } = useUser()
  const [groupsCount, setGroupsCount] = useState(0)
  const [studentsCount, setStudentsCount] = useState(0)
  const [teachersCount, setTeachersCount] = useState(0)
  const [roomsCount, setRoomsCount] = useState(0)
  const [isLoadingCount, setIsLoadingCount] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!profile) {
        return
      }
      try {
        const [groupsCount, studentsCount, teachersCount, roomsCount] =
          await Promise.all([
            getGroupsCount(profile.branchId),
            getStudentsCount(profile.branchId),
            getTeachersCount(profile.branchId),
            getRoomsCount(profile.branchId),
          ]);
        setGroupsCount(groupsCount || 0)
        setStudentsCount(studentsCount || 0)
        setTeachersCount(teachersCount || 0)
        setRoomsCount(roomsCount || 0)
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoadingCount(false)
      }
    }
    fetchData()
  }, [profile])
  if (isLoadingCount) return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card><Loading /></Card>
      <Card><Loading /></Card>
      <Card><Loading /></Card>
      <Card><Loading /></Card>
    </div>
  )
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Groups"
        value={groupsCount}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardCard
        title="Students"
        value={studentsCount}
        icon={<School className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardCard
        title="Teachers"
        value={teachersCount}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardCard
        title="Rooms"
        value={roomsCount}
        icon={<Building className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}