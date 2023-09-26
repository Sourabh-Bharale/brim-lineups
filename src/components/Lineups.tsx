'use client'
import { DrizzleLineups } from "@/lib/db/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import DeleteLineUp from "./DeleteLineUp";
import { badgeVariants } from "./ui/badge";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {}
const allMaps = ['ascent', 'bind', 'breeze', 'haven', 'icebox', 'split', 'pearl', 'sunset', 'lotus', 'fracture'];
const allSites = ['a', 'b', 'c']
const Lineups = (props: Props) => {

  const searchParams = useSearchParams()
  const selectedMap = searchParams.get('map') || 'ascent'
  const selectedSite = searchParams.get('site') || 'a'
  const { data: lineups } = useQuery({
    queryKey: ['lineup', selectedMap, selectedSite],
    refetchOnMount: true,
    queryFn: async () => {
      const { data } = await axios.get<DrizzleLineups[]>('/api/lineups?map=' + selectedMap + '&site=' + selectedSite)
      return data
    },
  })
  return (
    <>
      <div className="flex flex-row w-full h-full justify-center gap-4 border-2 rounded-xl p-2">
        <div className="flex overflow-x-scroll scrollbar-hidden gap-2">
          map:
          {allMaps.map((map, idx) => (
            <Link href={`?map=${map}&site=${selectedSite}`} className={badgeVariants({ variant: map === selectedMap ? "default" : "secondary" })} key={idx}>{map}</Link>
          ))}
        </div>
        <div className="flex overscroll-x-scroll scrollbar-hidden gap-2">
          site:
          {allSites.map((site, idx) => (
            <Link href={`?map=${selectedMap}&site=${site}`} className={badgeVariants({ variant: site === selectedSite ? "default" : "secondary" })} key={idx}>{site}</Link>
          ))}
        </div>
      </div>
      <div className="w-full gap-2">{lineups?.map((lineup) => (
        <div className="flex flex-col border-2 rounded-xl p-2" key={lineup.id}>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">{'🌎'}Map{"->"}{lineup.mapName}</h1>
              <h1 className="text-2xl font-semibold">{'💣'}site{"->"}{lineup.siteName}</h1>
            </div>
            <DeleteLineUp id={lineup.id} />
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-2">
          {
            lineup.images.map((img) => (
              <Image key={parseInt(img)} src={img} className="rounded-xl w-full h-full object-cover bg-cover" alt="line up" width={1000} height={1000} />
            ))
          }
          </div>
        </div>
      ))}</div>
    </>
  )
}

export default Lineups