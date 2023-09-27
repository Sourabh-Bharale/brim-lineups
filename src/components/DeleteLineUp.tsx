'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Trash2Icon } from 'lucide-react'
import React from 'react'
import { useToast } from './ui/use-toast'
import { DeletionRequest } from '@/lib/validators/delete'
import { Button } from './ui/button'

type Props = {
    id:number,
}

const DeleteLineUp = ({id}: Props) => {
    const {toast} = useToast()
    const queryClient = useQueryClient()
    const {mutate:deleteLineup,isLoading} = useMutation({
        mutationKey:['lineup'],
        mutationFn:async ()=>{
            const payload:DeletionRequest={
                id,
            }
            const {data} = await axios.post(`/api/delete`,payload)
            return data
        },
        onSuccess: async ()=>{
            queryClient.invalidateQueries(['lineup'])
            return toast({
                title:"Lineup Deleted",
                description:"Successfully deleted lineup",
            })
        },
        onError: async (err)=>{
            if (err instanceof AxiosError) {
                 if (err.response?.status === 422) {
                  return toast({
                      title: 'Lineup Validation Error',
                      description: 'An Error Occured while Validating your Lineup Please try again.',
                      variant: 'destructive'
                  })
              }
              }
              return toast({
                title: 'Failed to Delete',
                description: 'An Error Occured while Deleting your Lineup Please try again.',
                variant: 'destructive'
              })
        }

    })

  return (
    
    <Button variant={'destructive'} onClick={()=>deleteLineup()} isLoading={isLoading}>
    <Trash2Icon className="w-5 h-5 rounded-md" />
    </Button>

  )
}

export default DeleteLineUp