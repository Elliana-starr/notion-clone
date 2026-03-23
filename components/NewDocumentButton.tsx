"use client";


import { Button } from "./ui/button"
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/action";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
// const createNewDocument = async () => {
//   // Simulate creating a new document and returning its ID
//   return { docId: "new-document-id" };
// };

const handleCreateNewDocument = () => {
  startTransition(async () => {
    const { docId } = await createNewDocument();
    router.push(`/doc/${docId}`);
  });
};


  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
    {isPending ? "Creating..." : "New Document"}
    </Button>
  )
}
export default NewDocumentButton