"use client";

import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen pt-16">
      {children}
    </main>
  );
} 