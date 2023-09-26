import CreateLineup from "@/components/CreateLineup";
import Lineups from "@/components/Lineups";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home({searchParams}:{searchParams?: { [key: string]: string | string[] | undefined };}) {

  return (
    <>
    <Lineups/>
    <CreateLineup/>
    <ThemeToggle/>
    </>
  )
}
