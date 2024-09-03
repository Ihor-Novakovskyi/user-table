'use client'
// import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Rows from "./Rows/Rows";
import Pagination from "@/Components/Table/PaginationButtons/paginationControls";



export default function Table({ users }) {
    const [theme, setTheme] = useState('dark');
    const [elementsIsEnd, setElementsIsEnd] = useState(false);
    const searchParams = useSearchParams();
    let startOffset = Number(searchParams.get('startOffset') ?? 0);
    let endOffset = Number(searchParams.get('endOffset') ?? 1);
    const filter = (searchParams.get('filter') ?? 'all').toLowerCase();
    console.log('filter',filter)
    const router = useRouter();
    console.log('render', startOffset, endOffset)

    console.log(startOffset, endOffset);    
    const quantityElementToShow = 10;
    let start = startOffset * quantityElementToShow;
    let end = endOffset * quantityElementToShow;
    const renderUserInfo = filter === 'all' ? users.slice(start, end) : createFilteredUser(users);
    const [renderData, setRenderData] = useState(renderUserInfo);
    console.log('renderData',renderData)
    function createFilteredUser(users) { 
        let filtered = users.filter(filterData);
        if (filtered.length > start && filtered.length >= end) {
            filtered = filtered.slice(start, end);
        } else if (filtered.length > start) {
            filtered = filtered.slice(start, filtered.length)
        } else { 
            if (startOffset >= 1) {
                router.push(`/?startOffset=${startOffset - 1}&endOffset=${endOffset - 1}&filter=${filter}`);
            }
        }
        console.log('filtered',filtered)
        return filtered;
    }

    function filterData(user) { 
        const { "Customer": userName } = user;
        const [firstName, secondName] = userName.split(' ');
        return firstName.toLowerCase().startsWith(filter) || secondName.toLowerCase().startsWith(filter);

    }
    const getData = async () => {
        // тут вполняется запрос и поэтому рендерится все нужн просписать условие
        if (!elementsIsEnd) {
            
            const resp = await fetch(`http://localhost:5000/users?_start=${start}&_end=${end}`);
            const data = await resp.json();
            if (data.length) {
                setRenderData(data);
                return;
            }
            setElementsIsEnd(true);
            router.push(`/?startOffset=${startOffset - 1 >= 0 ? startOffset - 1 : 0}&endOffset=${endOffset - 1 >= 1 ? endOffset - 1 : 1}&filter=${filter}`)
        }

    }
    const deleteElement = async (id) => {
        console.log(id)
        const resp = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
        });
        if (resp.ok) {
            const resp = await fetch(`http://localhost:5000/users?_start=${start}&_end=${end}`);
            const data = await resp.json();
            console.log(data)
            setRenderData(data);
        }
    }
    const getFilteredItems = async () => { 
        if (filter !== 'all') { 
            const resp = await fetch('http://localhost:5000/users');
            console.log(resp)
            const data = await resp.json();
            const filteredUsers = createFilteredUser(data);
            setRenderData(filteredUsers)
        }
    } 
    useEffect(() => { 
        getFilteredItems();
    },[filter,startOffset])
    useEffect(() => {
        if (filter === 'all') { 
            getData();
        }
    }, [startOffset])
    function setFilterValue(e) { 
        const value = e.currentTarget.value.toLowerCase();
        if (value.length) {
            router.push(`/?startOffset=${startOffset}&endOffset=${endOffset}&filter=${value}`)
        } else {
            router.push(`/?startOffset=${startOffset}&endOffset=${endOffset}&filter=all`)
        }
    }
    return (
        <section className={ `${theme === 'light' ? 'bg-light' : 'bg-dark'} w-[1110px]` }>
            <div className="grow flex flex-row justify-between items-center py-[16px] px-[16px]">
                <div className="flex flex-row items-center gap-[12px]">
                    <span
                        className={`text-sm ${theme === 'light' ? '' : 'text-light'}`}
                    >
                        Show
                    </span>
                    <div className={`flex flex-row px-[9px] h-[31px] gap-[4px] rounded-[8px] items-center ${theme === 'light' ? 'bg-button-grey' : 'bg-button-dark'}`}>
                        <span
                            className={`text-sm ${theme  === 'light' ? '' : 'text-light'}`}
                        >
                            10
                        </span>
                        <img
                            src={ `${theme === 'light' ? './bi_caret-down-fillW.svg' : 'bi_caret-down-darkTheme.png'}` } alt="caret"
                            className="w-[8px] h-[8px]"
                        />
                    </div>
                    <span
                        className={`text-sm ${theme === 'light' ? '' : 'text-light'}`}
                    >
                        entries
                    </span>
                    <input
                        value={filter === 'all' ? '' : filter}
                        onChange={setFilterValue}
                        type="text"
                        placeholder="Search..."
                        className={ `${theme === 'light' ? 'bg-light border-button-grey bg-[url("/akar-icons_search-grey.svg")]' : 'bg-dark border-light text-light bg-[url("/akar-icons_search.svg")]'} border rounded-[8px] text-sm w-[176px] self-stretch pl-[33px] outline-0 bg-no-repeat bg-[9px_center]`}
                    />
                </div>
                <button
                    className="flex flex-row gap-[8px] items-center bg-active-button px-[12px] h-[32px] rounded-[8px]"
                >
                    <img src="./plus.svg" alt="plus button edit" />
                    <span className="text-light text-sm font-semibold leading-normal"> 
                        Add Customer
                    </span>
                </button>
            </div>

            <div>
                <table className=" w-[100%] min-h-[740px] table-auto">
                    <thead>
                        <tr className={ `text-left text-base ${theme === 'light' ? 'text-black' : 'text-light'}` }>
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
                        <Rows users={ renderData } theme={ theme } deleteItem={ deleteElement } />
                    </tbody>

                </table>
            </div>
            <div className="flex py-[16px] justify-center gap-[12px]">
                <Pagination theme={ theme } isLimited={ elementsIsEnd } reloadLimit={ setElementsIsEnd } />
            </div>
        </section>

    )

}

export const getDataBaseInfo = async () => {
    const res = await fetch('http://localhost:5000/users');
    const data = await res.json();
    return { props: { users: data } }
}
