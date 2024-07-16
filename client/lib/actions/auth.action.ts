"use server";

import { SigninForm, SignupForm } from "@/types";

export const handleSignup = async (userData: SignupForm) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to sign up user.');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw new Error('Failed to sign up user.');
    }
  };
  

export const handleSignin = async (userData: SigninForm) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to sign in user.');
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw new Error('Failed to sign in user.');
    }
  };
  