'use client'
import Button from "@/components/Button";
import React from "react";
import {redirect} from "next/navigation";

export default function NotFound() {
    const navigate = () => {
        redirect('/')
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold">Oops!</h1>
            <p className="text-xl mt-4 mb-2">404 - Page Not Found</p>
            <p className="mb-8">It might have been removed, renamed, or did not exist in the first place.</p>
            <Button name={"Go to Home page"} command={navigate}/>
        </div>
    )
}