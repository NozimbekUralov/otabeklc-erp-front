export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      branches: {
        Row: {
          address: string
          city: string
          createdAt: string
          district: string
          id: number
          isActive: boolean
          name: string
          region: string
        }
        Insert: {
          address: string
          city: string
          createdAt?: string
          district: string
          id?: never
          isActive?: boolean
          name: string
          region: string
        }
        Update: {
          address?: string
          city?: string
          createdAt?: string
          district?: string
          id?: never
          isActive?: boolean
          name?: string
          region?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          branchId: number
          createdAt: string
          id: number
          isActive: boolean
          levelId: number
          name: string
          subjectId: number
        }
        Insert: {
          branchId: number
          createdAt?: string
          id?: never
          isActive?: boolean
          levelId: number
          name: string
          subjectId: number
        }
        Update: {
          branchId?: number
          createdAt?: string
          id?: never
          isActive?: boolean
          levelId?: number
          name?: string
          subjectId?: number
        }
        Relationships: [
          {
            foreignKeyName: "groups_branchId_fkey"
            columns: ["branchId"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_levelId_fkey"
            columns: ["levelId"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_subjectId_fkey"
            columns: ["subjectId"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          createdAt: string
          discount: number
          id: string
          isAttended: boolean
          lessonId: string
          studentId: string
          teacherId: string
          updatedAt: string
        }
        Insert: {
          amount: number
          createdAt?: string
          discount?: number
          id?: string
          isAttended?: boolean
          lessonId: string
          studentId: string
          teacherId: string
          updatedAt?: string
        }
        Update: {
          amount?: number
          createdAt?: string
          discount?: number
          id?: string
          isAttended?: boolean
          lessonId?: string
          studentId?: string
          teacherId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_lessonId_fkey"
            columns: ["lessonId"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          createdAt: string
          groupId: number
          id: string
          topic: string
        }
        Insert: {
          createdAt?: string
          groupId: number
          id?: string
          topic: string
        }
        Update: {
          createdAt?: string
          groupId?: number
          id?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          createdAt: string
          id: number
          name: string
          price: number
        }
        Insert: {
          createdAt?: string
          id?: never
          name: string
          price: number
        }
        Update: {
          createdAt?: string
          id?: never
          name?: string
          price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          balance: number
          branchId: number
          email: string
          firstName: string
          id: string
          lastName: string
          phone: string
          photo: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          balance?: number
          branchId: number
          email: string
          firstName: string
          id?: string
          lastName: string
          phone: string
          photo: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          balance?: number
          branchId?: number
          email?: string
          firstName?: string
          id?: string
          lastName?: string
          phone?: string
          photo?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_branchId_fkey"
            columns: ["branchId"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          branchId: number
          capacity: number
          createdAt: string
          id: number
          name: string
        }
        Insert: {
          branchId: number
          capacity?: number
          createdAt?: string
          id?: never
          name: string
        }
        Update: {
          branchId?: number
          capacity?: number
          createdAt?: string
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_branchId_fkey"
            columns: ["branchId"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          createdAt: string
          day: Database["public"]["Enums"]["day_of_week"]
          endTime: string
          groupId: number
          id: number
          roomId: number
          startTime: string
        }
        Insert: {
          createdAt?: string
          day: Database["public"]["Enums"]["day_of_week"]
          endTime: string
          groupId: number
          id?: never
          roomId: number
          startTime: string
        }
        Update: {
          createdAt?: string
          day?: Database["public"]["Enums"]["day_of_week"]
          endTime?: string
          groupId?: number
          id?: never
          roomId?: number
          startTime?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_roomId_fkey"
            columns: ["roomId"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          balance: number
          branchId: number
          createdAt: string
          firstName: string
          id: string
          isActive: boolean
          lastName: string
          photo: string
          userId: string | null
        }
        Insert: {
          balance?: number
          branchId: number
          createdAt?: string
          firstName: string
          id?: string
          isActive?: boolean
          lastName: string
          photo: string
          userId?: string | null
        }
        Update: {
          balance?: number
          branchId?: number
          createdAt?: string
          firstName?: string
          id?: string
          isActive?: boolean
          lastName?: string
          photo?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_branchId_fkey"
            columns: ["branchId"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      teacherSubjectMap: {
        Row: {
          subjectId: number
          teacherId: string
        }
        Insert: {
          subjectId: number
          teacherId: string
        }
        Update: {
          subjectId?: number
          teacherId?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacherSubjectMap_subjectId_fkey"
            columns: ["subjectId"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacherSubjectMap_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      userGroupMap: {
        Row: {
          createdAt: string
          groupId: number
          studentId: string
          teacherId: string
        }
        Insert: {
          createdAt?: string
          groupId: number
          studentId: string
          teacherId: string
        }
        Update: {
          createdAt?: string
          groupId?: number
          studentId?: string
          teacherId?: string
        }
        Relationships: [
          {
            foreignKeyName: "userGroupMap_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userGroupMap_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userGroupMap_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
    }
    Enums: {
      day_of_week:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
      user_role: "admin" | "teacher" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      day_of_week: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      user_role: ["admin", "teacher", "student"],
    },
  },
} as const
