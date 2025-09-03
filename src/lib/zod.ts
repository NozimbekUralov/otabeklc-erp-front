import z from 'zod'

export const firstName = z.string()
  .min(1, 'First name is required')
  .max(32, 'First name must be less than 32 characters');

export const lastName = z.string()
  .min(1, 'Last name is required')
  .max(32, 'Last name must be less than 32 characters');
