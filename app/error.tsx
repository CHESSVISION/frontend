'use client'
import React, {useEffect} from 'react'
import {redirect} from "next/navigation";
import Button from "@/components/Button";

export default function Error({error, reset,}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const navigate = () => {
        redirect("/")
    }

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold">Oops!</h1>
            <p className="text-xl mt-4 mb-2">Something Went Wrong</p>
            <p className="mb-8">It might have been removed, renamed, or did not exist in the first place.</p>
            <button className="mb-2" onClick={reset}> try again</button>
            <Button name={"Go to Home page"} command={navigate}/>
        </div>
    )
}