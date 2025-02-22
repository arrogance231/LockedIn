import NavBar from "@/components/NavBar";
import { SidebarDemo } from "@/components/ui/sidebar-implementation";

export default async function Home() {
  return (
    <main className="relative h-screen">
      <NavBar />
      <SidebarDemo />
    </main>
  );
}
