import Link from "next/link";

const Nav = () => {
  return (
    <nav className="text-2xl flex justify-center flex-col p-4 md:p-0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 border-b-2 border-gray-200 mt-4 mb-11">
      <Link href="/manager">Manager</Link>
      <Link href="/project-coordinator">Project Coordinator</Link>
      <Link href="/user">User</Link>
    </nav>
  );
};

export default Nav;
