import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function userDataHook({ users }) {
    const [isLimited, setLimited] = useState(false);
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
    }, [filter, startOffset])
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
        }
        return filtered;
    }
    if (!renderData.length && startOffset >= 1) {
        router.push(`/?startOffset=${startOffset - 1}&endOffset=${endOffset - 1}&filter=${filter}`);
    }
    function filterUsersByFilterValue(user) {
        const { "Customer": userName, "Product Name": product } = user;
        const [firstName, secondName] = userName.split(' ');
        return product.toLowerCase().startsWith(filter) || firstName.toLowerCase().startsWith(filter) || secondName.toLowerCase().startsWith(filter);
    }
    const getAllUsersByOffset = async () => {
        if (!isLimited) {
            const resp = await fetch(`http://localhost:5000/users?_start=${start}&_end=${end}`);
            const data = await resp.json();
            if (data.length) {
                setRenderData(data);
                if (data.length < quantityElementToShow) {
                    setLimited(true);
                }
                return;
            }
            setLimited(true);
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
            if (filteredUsers.length < quantityElementToShow) {
                setLimited(true);
            }
        }
    }

    function setFilterValue(e) {
        const value = e.currentTarget.value.toLowerCase();
        setLimited(false);
        if (value.length) {
            router.push(`/?startOffset=0&endOffset=1&filter=${value}`)
        } else {
            router.push(`/?startOffset=0&endOffset=1&filter=all`)
        }
    }

    return {
        filter,
        setFilterValue,
        renderData,
        deleteElement,
        isLimited,
        setLimited
    }
}
