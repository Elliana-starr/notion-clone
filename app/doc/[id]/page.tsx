
"use client";

import { use } from "react"; // React 18+ feature

import Document from "@/components/Document";

interface DocumentPageProps {
  params: { id: string };
}

export default function DocumentPage(props: DocumentPageProps) {
  // unwrap the async params
  const { id } = use(Promise.resolve(props.params));

  return <div className="flex flex-col flex-1 min-h-screen">
    <Document id ={id} />
  </div>;
}