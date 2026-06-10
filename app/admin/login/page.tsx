import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Acceso admin"
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-4 py-10">
      <LoginForm />
    </main>
  );
}
