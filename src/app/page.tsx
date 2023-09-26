import CreateLineup from "@/components/CreateLineup";
import Lineups from "@/components/Lineups";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home({searchParams}:{searchParams?: { [key: string]: string | string[] | undefined };}) {

  return (
    <div className="flex flex-col gap-4">
    <Lineups/>
    <CreateLineup/>
    <ThemeToggle/>
    </div>
  )
}
