
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cleanupAuthState } from '@/utils/authUtils';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fixed AuthProvider to not depend on router hooks initially
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Create a fake navigate function that will be replaced when the component mounts
  const [navigate, setNavigate] = useState<(path: string) => void>(() => 
    (path: string) => console.log(`Navigation attempted to ${path} but router not ready`)
  );
  
  // Initialize auth state without router dependencies
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast.success('Signed in successfully!');
          // Defer navigation until router is ready
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          toast.info('Signed out');
          // Defer navigation until router is ready
          setTimeout(() => {
            window.location.href = '/auth';
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []); // No router dependency here

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Clean up existing auth state before signup
      cleanupAuthState();
      
      // Try to sign out globally first (ignore errors)
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (error) {
        // Continue even if this fails
      }
      
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            username
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Registration successful! Please check your email to verify your account.');
      window.location.href = '/auth'; // Use direct navigation instead of navigate
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign up');
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Clean up existing auth state before login
      cleanupAuthState();
      
      // Try to sign out globally first (ignore errors)
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (error) {
        // Continue even if this fails
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      // Navigation is handled by onAuthStateChange
      // Force refresh for a clean slate
      // window.location.href = '/dashboard';
    } catch (error: any) {
      toast.error(error.message || 'Sign in failed');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Then attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      // Force page reload for a clean state on critical auth operation
      window.location.href = '/auth';
    } catch (error: any) {
      toast.error(error.message || 'Sign out failed');
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
