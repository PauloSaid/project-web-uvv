import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white w-full fixed top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-black tracking-wide">
          <Link href="/">Lojinha de Produtos</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/" passHref>
            <span className="cursor-pointer hover:text-blue-500">Home</span>
          </Link>
          
          <Link href="/login" passHref>
            <span className="cursor-pointer hover:text-blue-500">Login</span>
          </Link>
          <Link href="/register" passHref>
            <span className="cursor-pointer hover:text-blue-500">Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
