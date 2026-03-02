// app/actions/auth.ts
'use server';
{/*
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
    //return { error: result.error };
    redirect('/login?error=' + encodeURIComponent(result.error));
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
      //return { error: 'Email already exists' };
      redirect('/register?error=' + encodeURIComponent('Email already exists')); // Can change it later
    }
    //return { error: 'Registration failed' };
    redirect('/register?error=' + encodeURIComponent('Registration failed')); // Can change it later
  }
}*/}
{/*}
import { signIn } from 'next-auth/react'; // Client version for session update
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = await signIn('credentials', {
    email,
    password,
    redirect: false, // ← Critical: don't redirect here
  });

  if (result?.error) {
    return { error: result.error }; // Return error for client to show
  }

  return { success: true }; // Client will handle redirect
}

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // ← critical: don't redirect here
    });

    if (result?.error) {
      return { error: result.error };
    }

    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'Email already exists' };
    }
    return { error: 'Registration failed' };
  }
}*/}

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn } from '@/lib/auth'; // Server-side signIn
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error; // Re-throw redirect errors
  }
}
export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'All fields are required' };
  }
  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'Email already exists' };
    }
    return { error: 'Registration failed' };
  }
}