"use client";

import NewDocumentButton from "./NewDocumentButton"
import { Menu as MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from "@clerk/nextjs";
import { collection, DocumentData, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./ui/SidebarOption";
interface RoomDocument extends DocumentData {
   createdAt: string;
   role: "owner" | "editor";
   roomId: string;
   userId: string;
}

function Sidebar() {
  const {user} = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

//     const [data, loading, error] = useCollection(
//       user && 
//         query
//         (collection(db, "room"),
//          where("userId","==",user.emailAddresses[0].toString())
//         )
// );
// 

const [data, loading, error] = useCollection(
  user &&
    query(
      collection(
        db,
        "users",
        user.emailAddresses[0].toString(),
        "room"
      )
    )
);

useEffect(() => {
  if(!data) return;

  // console.log("DATA:", data.docs.map(doc => doc.data()));

  const grouped = data.docs.reduce<{
    owner: RoomDocument[];
    editor: RoomDocument[];

  }>(
    (acc, curr) => {
      const roomData = curr.data() as RoomDocument;

      if (roomData.role === "owner") {
        acc.owner.push({
          id: curr.id,
          ...roomData,
        });
      } else {
        acc.editor.push({
          id: curr.id,
          ...roomData,
        })

      }
      return acc;
    }, {
      owner: [],
      editor: [],
    }
  )

  setGroupedData(grouped)
}, [data])


const menuOptions = (
  <>
      <NewDocumentButton />
<div className=" flex flex-col gap-2 text-gray-500 font-semibold text-sm">
{/* My Documents */}
    {groupedData.owner.length === 0 ?(
        <h2 className="text-gray-500 font-semibold text-sm">No documents found
        </h2>
      ) : (

        <>
         <h2 className="text-gray-500 font-semibold text-sm">My Documents
         </h2>
         <div className="flex flex-col gap-2">
         {groupedData.owner.map((doc) => (
          
          <SidebarOption
           key={doc.id}
            id={doc.id} 
            href={`/doc/${doc.id}`} />

         ))}
         </div>
  </>
)}
</div>


{/* My Lists */}

{/* Shared With Me */}

{groupedData.editor.length > 0 &&(
   <>
   <h2 className="text-gray-500 font-semibold text-sm">Shared with Me</h2>

   {groupedData.editor.map((doc) => (
          
          <SidebarOption
           key={doc.id}
            id={doc.id} 
            href={`/doc/${doc.id}`} />

         ))}
   </>
)}

</>
);


  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
      <Sheet>
  <SheetTrigger>
    <MenuIcon className= "p-2 hover:opacity-30 rounded-lg" size={40}  >

    </MenuIcon>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Menu</SheetTitle>
      <div>{menuOptions}</div>
    </SheetHeader>
  </SheetContent>
</Sheet>
</div>
      <div className="hidden md:inline">
      {menuOptions}
      </div>
      
    </div>
  )
}
export default Sidebar