import NavBar from "@/components/NavBar";
import pb from "../lib/pocketbase_init";
import { revalidatePath } from "next/cache";
import { SidebarDemo } from "@/components/ui/sidebar-implementation";

export default async function Home() {
  return (
    <main className="relative h-screen">
      <NavBar />
      <SidebarDemo />
    </main>
  );
}
