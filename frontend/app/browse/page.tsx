import NavBar from "@/components/NavBar";
import pb from "../lib/pocketbase";
import { revalidatePath } from "next/cache";

export default async function Home() {
  return (
    <main className="relative h-screen">
      <NavBar />
    </main>
  );
}
