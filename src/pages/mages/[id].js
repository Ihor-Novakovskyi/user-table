import { useRouter, useSearchParams } from 'next/router'
export default function Show({ params }) {
    const router = useRouter()
    return (<h1>
        Hello -  {router.query.id}   
    </h1>)
}