'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import UploadImages from './UploadImages'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { LineupRequest, LineupValidator } from '@/lib/validators/lineups'
import axios, { AxiosError } from 'axios'
import { useToast } from './ui/use-toast'
import { Button } from './ui/button'



type Props = {}

function CreateLineup({}: Props) {
  const {toast} = useToast()
  const queryClient = useQueryClient()
  const [mapName,setMapName] = useState<string>('')
  const [siteName,setSiteName] = useState<string>('')
  const [allImages, setAllImages] = useState<string[]>([]);

  const {mutate:createLineup,isLoading} = useMutation({
    mutationKey:['lineup'],
    mutationFn:async ()=>{
      const payload:LineupRequest = {
        images:allImages,
        mapName,
        siteName,
      }
      const {data} = await axios.post<LineupRequest>('/api/create',payload)
      return data
    },
    onSuccess:async ()=>{
      queryClient.invalidateQueries({queryKey:['lineup']})
      setMapName('')
      setSiteName('')
      setAllImages([])
      return toast({
        title:"Lineup Created",
        description:"Successfully created new lineup",
      })
    },
    onError: async (err)=>{
      setMapName('')
      setSiteName('')
      setAllImages([])
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Lineup Already Exists',
            description: 'A Lineup with the same name already exists for this map and site.',
            variant: 'destructive',
          })
        }

        else if (err.response?.status === 422) {
          return toast({
              title: 'Lineup Validation Error',
              description: 'An Error Occured while Validating your Lineup Please try again.',
              variant: 'destructive'
          })
      }
      }

      return toast({
        title: 'Error Initializing Chat',
        description: 'An Error Occured while Initializing your Chat Please try again.',
        variant: 'destructive',
      })
    }
  })


  return (
    <div>
      <div className='relative grid gap-2 w-full border-2 rounded-xl bg-foreground/10 p-2'>
        <h1 className='text-2xl font-semibold'>Create new lineup {'🔥'}</h1>
        <Input value={mapName} onChange={e=>setMapName(e.target.value)} placeholder='Map Name'/>
        <Input value={siteName} onChange={e=>setSiteName(e.target.value)} placeholder='Site Name'/>
        uploaded {allImages.length} files
        <UploadImages allImages={allImages} setAllImages={setAllImages} />
        <Button onClick={()=>createLineup()} isLoading={isLoading} disabled={isLoading}>Create Lineup</Button>

      </div>
    </div>
  )
}

export default CreateLineup