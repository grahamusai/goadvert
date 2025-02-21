"use client"
import { useState } from 'react'
import pb from '../../lib/pocketbase'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { motion } from "motion/react"

export default function signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();



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

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      // Create a new record in the users collection
      const record = await pb.collection('users').create({
        username: username,
        email: email,
        password: password,
        passwordConfirm: password, // Required by PocketBase
      });

      // After successful creation, authenticate the user
      const authData = await pb.collection('users').authWithPassword(

        email,
        password
      );

      if (authData) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to create account');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side with logo */}
      <div className="hidden md:flex bg-[#1D2B4E] items-center justify-center p-8">
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          className="relative w-48 h-48">
          <Image
            src="/images/Logo.png"
            alt="IAD Logo"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Right side with form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-[400px] space-y-6">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <h2 className="text-4xl font-bold mb-8 text-[#1a2646]">Start Selling!</h2>
          <h2 className="text-xl font-bold mb-4 text-[#1a2646]">Create an Account</h2>
          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" >Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
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
                {/* <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me logged in
                </label> */}
              </div>
              <Link href="/login" className="text-sm text-[#2D7FF9] hover:underline">
                Already have an account?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#2D7FF9] hover:bg-[#2D7FF9]/90"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'SIGN UP'}
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