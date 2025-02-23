"use client";

import { AuthProvider } from "@/components/organization/AuthContext";

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
