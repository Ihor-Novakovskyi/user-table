import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function userDataHook({users}) { 
    const [elementsIsEnd, setElementsIsEnd] = useState(false);
    const searchParams = useSearchParams();
    let startOffset = Number(searchParams.get('startOffset') ?? 0);
    let endOffset = Number(searchParams.get('endOffset') ?? 1);
    const filter = (searchParams.get('filter') ?? 'all').toLowerCase();
    const router = useRouter();
    const quantityElementToShow = 10;
    let start = startOffset * quantityElementToShow;
    let end = endOffset * quantityElementToShow;
    const renderUserInfo = filter === 'all' ? users.slice(start, end) : createFilteredUserSlice(users);
    const [renderData, setRenderData] = useState(renderUserInfo);
    useEffect(() => { 
        getFilteredItems();
    },[filter,startOffset])
    useEffect(() => {
        if (filter === 'all') { 
            getAllUsersByOffset();
        }
    }, [startOffset])


    function createFilteredUserSlice(users) { 
        let filtered = users.filter(filterUsersByFilterValue);
        if (filtered.length > start && filtered.length >= end) {
            filtered = filtered.slice(start, end);
        } else if (filtered.length > start) {
            filtered = filtered.slice(start, filtered.length)
        } else { 
            if (startOffset >= 1) {
                router.push(`/?startOffset=${startOffset - 1}&endOffset=${endOffset - 1}&filter=${filter}`);
            }
        }
        return filtered;
    }

    function filterUsersByFilterValue(user) { 
        const { "Customer": userName } = user;
        const [firstName, secondName] = userName.split(' ');
        return firstName.toLowerCase().startsWith(filter) || secondName.toLowerCase().startsWith(filter);

    }
    const getAllUsersByOffset = async () => {
        if (!elementsIsEnd) {            
            const resp = await fetch(`http://localhost:5000/users?_start=${start}&_end=${end}`);
            const data = await resp.json();
            if (data.length) {
                setRenderData(data);
                if (data.length < quantityElementToShow) { 
                    setElementsIsEnd(true);
                }
                return;
            }
            setElementsIsEnd(true);
            router.push(`/?startOffset=${startOffset - 1 >= 0 ? startOffset - 1 : 0}&endOffset=${endOffset - 1 >= 1 ? endOffset - 1 : 1}&filter=${filter}`)
        }

    }
    const deleteElement = async (id) => {
        const resp = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
        });
        if (resp.ok) {
            const resp = await fetch(`http://localhost:5000/users?_start=${start}&_end=${end}`);
            const data = await resp.json();
            setRenderData(data);
        }
    }
    const getFilteredItems = async () => { 
        if (filter !== 'all') { 
            const resp = await fetch('http://localhost:5000/users');
            const data = await resp.json();
            const filteredUsers = createFilteredUserSlice(data);
            setRenderData(filteredUsers)
        }
    } 
 
    function setFilterValue(e) { 
        const value = e.currentTarget.value.toLowerCase();
        if (value.length) {
            router.push(`/?startOffset=${startOffset}&endOffset=${endOffset}&filter=${value}`)
        } else {
            router.push(`/?startOffset=${startOffset}&endOffset=${endOffset}&filter=all`)
        }
    }
    return {
        filter,
        setFilterValue,
        renderData,
        deleteElement,
        elementsIsEnd,
        setElementsIsEnd,
    }
}