'use client'
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function ShowParams({ }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startOffset = searchParams.get('startOffset') ?? 0;
    const endOffset = searchParams.get('endOffset') ?? 1;
    console.log(typeof startOffset, +startOffset - 1 ||  0 )
    const prev = () => { 
        router.push(`/?startOffset=${+startOffset - 1 >= 0 ? +startOffset - 1 :  0 }&endOffset=${+endOffset - 1 >= 1 ? +endOffset - 1 : 1 }`)
    }
    const next = () => {
        router.push(`/?startOffset=${+startOffset + 1}&endOffset=${+endOffset + 1}`)
    }
    return (
        <>
            <button onClick={prev}>Prev</button>
            <button onClick={next }>Next</button>
        </>
    )
 }