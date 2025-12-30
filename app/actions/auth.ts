// app/actions/auth.ts
'use server';

import { signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// Login action
export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    return { error: result.error };
  }

  redirect('/');
}

// Register action
export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    await signIn('credentials', { email, password, redirect: false });
    redirect('/');
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'Email already exists' };
    }
    return { error: 'Registration failed' };
  }
}