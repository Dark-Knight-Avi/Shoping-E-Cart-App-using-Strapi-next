import React from 'react';
import Link from 'next/link';
export default function Navbar() {
  return (
    <header className="text-gray-600 body-font mx-20">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/"><a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img width={20} src="/logo.svg" alt=""/>
          <span className="ml-3 text-xl">Tailblocks</span>
        </a></Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/"><a className="mr-5 cursor-pointer hover:text-gray-900">Home</a></Link>
          <Link href="/about"><a className="mr-5 cursor-pointer hover:text-gray-900">About</a></Link>
          <Link href="/product"><a className="mr-5 cursor-pointer hover:text-gray-900">Products</a></Link>
          <Link href="/contact"><a className="mr-5 cursor-pointer hover:text-gray-900">Contact us</a></Link>
        </nav>
        <button className="inline-flex text-sm text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Login</button>
      </div>
    </header>
  );
}