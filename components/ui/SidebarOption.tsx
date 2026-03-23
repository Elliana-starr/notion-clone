"use client";

import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import { usePathname } from "next/navigation";


function SidebarOption( {href, id}: {
    href: string;
    id: string;
}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const pathname = usePathname();
    const isActive = pathname === href;
    // const isActive = href.includes(pathname) && pathname !== "/";



    if (loading) return <p className="p-2 text-sm text-gray-400">Loading...</p>;
if (!data) return null;
    // if (!data) return null;
  return (
    <Link href={href} className={`flex items-center justify-center gap-2 border p-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-100 ${
      isActive ? "bg-gray-300 font-bold border-black" : "border-gray-300"
    }`}>

{/* <p className="truncate">{JSON.stringify(data)}</p> */}
        <p className="truncate">{data.title}</p>
    </Link>
  )
}
export default SidebarOption