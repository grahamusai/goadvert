import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#1B2237] text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="md:col-span-1">
            <Image
              src="/images/Logo.png"
              alt="IAD Logo"
              width={60}
              height={60}
              className="rounded-xl"
            />
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact Us</Link>
              <Link href="/explore" className="hover:underline">Explore</Link>
              <Link href="/jobs" className="hover:underline">Jobs</Link>
            </nav>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/terms" className="hover:underline">Terms</Link>
              <Link href="/support" className="hover:underline">Support</Link>
              <Link href="/partners" className="hover:underline">Partners</Link>
            </nav>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              <Link href="/cookie-policy" className="hover:underline">Cookie Policy</Link>
              <Link href="/blog" className="hover:underline">Blog</Link>
            </nav>
          </div>

          {/* Sitemap Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Sitemap</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/properties" className="hover:underline">Properties</Link>
              <Link href="/vehicles" className="hover:underline">Vehicles</Link>
              <Link href="/jobs" className="hover:underline">Jobs</Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-right text-sm max-w-5xl mx-auto flex justify-between items-center">
          <hr className="border-t border-gray-600" /><h3>Copyright | 2025</h3>
        </div>
      </div>
    </footer>
  )
}

