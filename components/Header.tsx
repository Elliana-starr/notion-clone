// "use client";
// import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

// function Header() {
//   const { user } = useUser(); 

//   return (
//     <div>
//       {user && (
//         <h1> {user?.firstName}
//         {` 's `}Space </h1>
//       )}

//       {/* {Breadcrumbs} */}

//       <div>
//         <SignedOut>
//           <SignInButton></SignInButton>
//         </SignedOut>

//         <SignedIn>

//         </SignedIn>
//       </div>
//     </div>
//   )
// }

// export default Header

"use client";

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {!isSignedIn && <SignInButton />}

      {isSignedIn && (
        <>
         
          <h1 className="text-2xl">Welcome {user?.firstName}</h1>
          <UserButton />
        </>
      )}
    </div>
  );
}

export default Header;