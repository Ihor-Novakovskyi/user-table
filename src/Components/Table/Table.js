'use client'
// import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Rows from "./Rows/Rows";
import ShowParams from "@/Components/Table/PaginationButtons/paginationControls";



export default function Table({ users }) {
    const [theme, setTheme] = useState('light')
    const searchParams = useSearchParams();
    const startOffset = searchParams.get('startOffset') ?? 0;
    const endOffset = searchParams.get('endOffset') ?? 1;
    console.log('render', startOffset, endOffset)

    console.log(startOffset, endOffset);
    const quantityElementToShow = 10;
    const start = +startOffset * quantityElementToShow;
    const end = +endOffset * quantityElementToShow;
    const renderUserInfo = users.slice(+startOffset * quantityElementToShow, +endOffset * quantityElementToShow);
    const [renderData, setRenderData] = useState(renderUserInfo)
    // console.log('renderUserInfo', renderUserInfo)
    // const resp = await fetch(`http://localhost:5000/user?_start=${start}&_end=${end}`);
    // const data = resp.json();
    // console.log(data)
    const getData = async () => {
        const resp = await fetch(`http://localhost:5000/users?_start=${start}&_end=${end}`);
        const data = await resp.json();
        
        setRenderData(data)
        // console.log(data)
    }
    useEffect(() => {
        getData();
    }, [startOffset])

    return (
        // тут нужно попробовать сделать падинг вместо border-spacing-x-[16px]
        <section className={ `flex-row justify-center ${theme === 'light' ? 'bg-light' : 'bg-dark'} w-[1110px]` }>
            <div className="grow">
            <table class=" w-[100%] table-auto">
                <thead>
                    <tr className="text-left">
                        <th className="text-center w-[136px] pl-[16px] pr-[0px] py-[16px]" scope="col">Tracking ID</th>
                        <th className="py-[16px] pl-[16px] pr-[0px] " scope="col">
                            <div className="flex justify-between items-center">
                                <span>
                                    Product
                                </span>
                                <img className="w-[16px] h-[16px]" src="/bxs_sort-alt.svg" alt="sort" />
                            </div>
                        </th>
                        <th className="pl-[16px] pr-[0px] py-[16px]" scope="col">
                            <div className="flex justify-between items-center">
                                <span>
                                    Customer
                                </span>
                                <img className="w-[16px] h-[16px]" src="/bxs_sort-alt.svg" alt="sort" />
                            </div>
                        </th>
                        <th className="pl-[16px] pr-[0px]  py-[16px]" scope="col">
                            <div className="flex justify-between items-center">
                                <span>
                                    Date
                                </span>
                                <img className="w-[16px] h-[16px]" src="/bxs_sort-alt.svg" alt="sort" />
                            </div>
                        </th>
                        <th className="pl-[16px] pr-[0px] py-[16px]" scope="col">Amount</th>
                        <th className="pl-[16px] pr-[0px] py-[16px]" scope="col">Payment Mode</th>
                        <th className="pl-[16px] pr-[0px] py-[16px]" scope="col">
                            <div className="flex justify-between items-center">
                                <span>
                                    Status
                                </span>
                                <img className="w-[16px] h-[16px]" src="/bxs_sort-alt.svg" alt="sort" />
                            </div>                        </th>
                        <th className="text-center w-[136px] pl-[16px] pr-[0px]  py-[16px]" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <Rows users={ renderData } theme={theme} />
                </tbody>

            </table>
            </div>
           

            {/* <h1 className="text-center py-10 px-12">Hi Ihor</h1> */ }
            {/* { renderData.slice(0, 5).map((el,id) => <span key={id} className="text-green">{el.Customer}</span>)} */ }
            <div className="flex justify-center gap-[12px]">
                <ShowParams theme={theme} />
            </div>
        </section>

    )

}
// users?_start=10&_end=20
export const getDataBaseInfo = async () => {
    const res = await fetch('http://localhost:5000/users');
    // console.log(res)
    const data = await res.json();
    // console.log(data)
    return { props: { users: data } }
}
