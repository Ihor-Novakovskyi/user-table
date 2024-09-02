import React from "react";
export default function Rows({ users, theme }) {
    console.log(theme)
    return (
        <>
            { users.map((user) => Row(user, theme)) }
        </>
    )
}

function Row(user, theme) {
    console.log(theme)
    const {
        "Tracking ID": id,
        "Product Image": img,
        "Product Name": productName,
        "Customer": customer,
        "Date": date,
        "Amount": amount,
        "Payment Mode": paymentMode,
        "Status": status,
    } = user;
    return (
        <tr className={`${theme === "light" ? "odd:bg-light-grey" : "odd:bg-light-dark"} text-base align-middle text-left`}>
            <td className="pl-[16px] pr-[0px] text-center py-[16px]">{ `#${id}` }</td>
            <td className="pl-[16px] pr-[0px] py-[16px]">
                <div className="flex gap-[8px] items-center">
                    <img className='w-8 h-8 block' src={ img } alt="product view" />
                    <span>
                        { productName.split(' ')[0] }
                    </span>
                </div>
            </td>
            <td className="pl-[16px] pr-[0px] py-[16px]">
                { customer }
            </td>
            <td className="pl-[16px] pr-[0px] py-[16px]">
                { date }
            </td>
            <td className="pl-[16px] pr-[0px] py-[16px]">
                { amount }
            </td>
            <td className="pl-[16px] pr-[0px] py-[16px]">
                { paymentMode }
            </td>
            <td className="pl-[16px] pr-[0px] py-[16px]">
                <IndicatorProcess status={ status.toLowerCase() } />
            </td>
            <td className="pl-[16px] pr-[0px] py-[16px]">
                <div className="flex gap-[16px] justify-center">
                    <img className="w-[24px] h-[24px]"src="./edit.png" alt="edit" />
                    <img className="w-[24px] h-[24px]" src="./trash.png" alt="edit" />
                </div>
            </td>
        </tr>
    )
}

function IndicatorProcess({ status }) {
    console.log(status)
    return {
        delivered: <Delivered />,
        process: <Process />,
        cancelled: <Canceled />
    }[status];
}


function Delivered() {
    return (
        <div className='px-[12px] py-[8px] bg-light-green inline-block rounded-[22px]'>
            <span className="text-sm text-green">
                Delivered
            </span>
        </div>
    )
}
function Process() {
    return (
        <div className='px-[12px] py-[8px] bg-light-orange inline-block rounded-[22px]'>
            <span className="text-sm text-orange">
                Process
            </span>
        </div>
    )
}
function Canceled() {
    return (
        <div className="px-[12px] py-[8px] bg-peach inline-block rounded-[22px]">
            <span className="text-sm text-brown">
                Canceled
            </span>
        </div>
    )
}