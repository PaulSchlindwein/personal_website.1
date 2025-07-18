'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    if (!isAuthenticated || !userData) {
      router.push("/signin");
      return;
    }

    try {
      const userObj = JSON.parse(userData);
      setUser(userObj);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/signin");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-0">
        {children}
      </main>
    </div>
  );
} 