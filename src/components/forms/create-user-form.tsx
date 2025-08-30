'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useEffect } from 'react'

export function CreateUserForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'teacher' | 'student'>('teacher')
  const [branchId, setBranchId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profileData } = await supabase.from('profiles').select().eq('id', user.id).single()
        if (!profileData) {
          return window.location.reload()
        }
        setBranchId(profileData.branchId)
      }
    }

    fetchCurrentUserProfile()
  }, [supabase])

  const handleUserCreation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const [firstName, lastName] = fullName.split(' ')
    if (!firstName || !lastName) {
      return setError('Full name is required')
    }

    if (!branchId) {
      return window.location.reload()
    }

    try {
      if (role === 'teacher') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              fullName
            },
          },
        })

        if (signUpError) throw signUpError
        if (!data.user) throw new Error('User not created')

        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          firstName,
          lastName,
          email,
          phone: '+998904716545',
          photo: '/favicon.ico',
          branchId,
          role: 'teacher',
        })
        if (profileError) throw profileError
      } else {
        const { error: studentError } = await supabase.from('students').insert({
          firstName,
          lastName,
          photo: '/favicon.ico',
          branchId,
        })
        if (studentError) throw studentError
      }

      setIsSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Created</CardTitle>
          <CardDescription>The user has been created successfully.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.reload()}>Create Another User</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create User</CardTitle>
          <CardDescription>Create a new user account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUserCreation}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as 'teacher' | 'student')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating User...' : 'Create User'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
