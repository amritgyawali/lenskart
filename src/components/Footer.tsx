import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/refund-exchange" className="text-gray-300 hover:text-white transition-colors">
                  Refund & Exchange
                </Link>
              </li>
              <li>
                <Link href="/download-app" className="text-gray-300 hover:text-white transition-colors">
                  Download App
                </Link>
              </li>
              <li>
                <a href="mailto:support@lenskart.us" className="text-gray-300 hover:text-white transition-colors">
                  Email: support@lenskart.us
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">About Us</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About us
                </Link>
              </li>
            </ul>
          </div>

          {/* App Download Section */}
          <div>
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <Link href="/download-app" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://ext.same-assets.com/2368309368/2079238745.svg"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                  />
                </Link>
                <Link href="/download-app" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://ext.same-assets.com/2368309368/967234380.svg"
                    alt="Download on the App Store"
                    width={140}
                    height={42}
                  />
                </Link>
              </div>
              <p className="text-gray-300 text-sm">
                Download Lenskart App to buy<br />
                Eyeglasses and Sunglasses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                T & C
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                Privacy
              </Link>
              <Link href="/accessibility" className="text-gray-300 hover:text-white transition-colors text-sm">
                Accessibility
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Version 1.0.0</span>
              <span className="text-gray-400 text-sm">||</span>
              <span className="text-gray-400 text-sm">Follow Us</span>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Link href="https://facebook.com/lenskartusa" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://ext.same-assets.com/2368309368/2590010722.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link href="https://instagram.com/lenskartusa" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://ext.same-assets.com/2368309368/4161386767.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link href="https://twitter.com/Lenskart_com" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://ext.same-assets.com/2368309368/3182482777.svg"
                    alt="Twitter"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
