import NavBar from "@/components/NavBar";
import { SidebarDemo } from "@/components/ui/sidebar-implementation";

export default async function Home() {
  return (
    <main className="relative h-screen motion-translate-y-in-100 motion-duration-[2s] motion-ease-spring-smooth">
      <NavBar />
      <SidebarDemo />
    </main>
  );
}
