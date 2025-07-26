"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, ShoppingCart, Heart, User, LogOut, Settings, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CartDrawer from "./CartDrawer";
import AuthDialog from "./AuthDialog";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { cart } = useCart();
  const { authState, logout } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAuthAction = () => {
    if (authState.isAuthenticated) {
      // User is logged in, show profile dropdown
      return;
    } else {
      // User is not logged in, open auth dialog
      setIsAuthDialogOpen(true);
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="https://ext.same-assets.com/2368309368/2286995177.svg"
                  alt="Lenskart"
                  width={120}
                  height={40}
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                Track Order
              </Button>

              {/* Auth Section */}
              {authState.isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {authState.user?.name.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-700">{authState.user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleAuthAction}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In & Sign Up</span>
                </Button>
              )}

              {/* Wishlist */}
              <Button variant="ghost" className="relative">
                <Heart className="h-5 w-5 text-gray-700" />
                <span className="ml-2 text-gray-700">Wishlist</span>
              </Button>

              {/* Cart */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="relative">
                    <ShoppingCart className="h-5 w-5 text-gray-700" />
                    <span className="ml-2 text-gray-700">Cart</span>
                    {cart.itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                        {cart.itemCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <CartDrawer onClose={() => setIsCartOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-8">
                <Link href="/products?category=new-arrivals">
                  <Button variant="ghost" className="text-gray-900 font-medium hover:text-blue-600">
                    NEW ARRIVALS
                  </Button>
                </Link>
                <Link href="/products?category=eyeglasses">
                  <Button variant="ghost" className="text-gray-900 font-medium hover:text-blue-600">
                    EYEGLASSES
                  </Button>
                </Link>
                <Link href="/products?category=computer-glasses">
                  <Button variant="ghost" className="text-gray-900 font-medium hover:text-blue-600">
                    COMPUTER EYEGLASSES
                  </Button>
                </Link>
                <Link href="/products?category=sunglasses">
                  <Button variant="ghost" className="text-gray-900 font-medium hover:text-blue-600">
                    SUNGLASSES
                  </Button>
                </Link>
                <Link href="/products?category=prescription-sunglasses">
                  <Button variant="ghost" className="text-gray-900 font-medium hover:text-blue-600">
                    PRESCRIPTION SUNGLASSES
                  </Button>
                </Link>
                <Link href="/products?category=kids-glasses">
                  <Button variant="ghost" className="text-gray-900 font-medium hover:text-blue-600">
                    KIDS EYEGLASSES
                  </Button>
                </Link>
              </div>

              {/* Brand Logos */}
              <div className="flex items-center space-x-4">
                <Image
                  src="https://ext.same-assets.com/2368309368/4035252582.png"
                  alt="3D Try On"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <Image
                  src="https://ext.same-assets.com/2368309368/2056523887.png"
                  alt="Blu"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <Image
                  src="https://ext.same-assets.com/2368309368/4182652703.jpeg"
                  alt="Gold"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded"
                />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Auth Dialog */}
      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
      />
    </>
  );
}
