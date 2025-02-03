"use client"
import { useState } from 'react'
import pb from '../../lib/pocketbase'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { Apple, Facebook } from "lucide-react"
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // New state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await pb.collection('users').authWithPassword(email, password);
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      // Initiate Google auth flow
      const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
      
      if (authData) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Google authentication failed');
      console.error('Google auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side with logo */}
      <div className="hidden md:flex bg-[#1D2B4E] items-center justify-center p-8">
        <div className="relative w-48 h-48">
          <Image
            src="/images/Logo.png"
            alt="IAD Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-[400px] space-y-6">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                required 
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
              >
                {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me logged in
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#2D7FF9] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#2D7FF9] hover:bg-[#2D7FF9]/90"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'SIGN IN'}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign in with</span>
              </div>
            </div>

            <div className="mt-4">
              <Button
                type="button"
                className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}