"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/firebase-admin";
import { title } from "process";
import { currentUser } from "@clerk/nextjs/server";

export async function createNewDocument(){
    // auth().protect();
    // const user = await currentUser();
    // if (!user) throw new Error("Unauthorized");


    const {sessionClaims}= await auth();

    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "New Doc"
    });

    await adminDb.collection("users").doc(sessionClaims?.email!).collection
    ('room').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id
    })

    return {docId: docRef.id};

}