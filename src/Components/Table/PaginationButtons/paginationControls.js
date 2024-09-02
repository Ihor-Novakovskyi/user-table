'use client'
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function ShowParams({ theme }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startOffset = searchParams.get('startOffset') ?? 0;
    const endOffset = searchParams.get('endOffset') ?? 1;
    console.log(typeof startOffset, +startOffset - 1 || 0)
    const prev = () => {
        router.push(`/?startOffset=${+startOffset - 1 >= 0 ? +startOffset - 1 : 0}&endOffset=${+endOffset - 1 >= 1 ? +endOffset - 1 : 1}`)
    }
    const next = () => {
        router.push(`/?startOffset=${+startOffset + 1}&endOffset=${+endOffset + 1}`)
    }
    const getButtonValueNumbers = setActiveButtonPosition(+endOffset);
    const [first, second, third] = getButtonValueNumbers;
    console.log(typeof first, typeof second, typeof third)
    console.log(14 === +endOffset)
    return (
        <>
            <button onClick={ prev }>Prev</button>
            <button
                className={ `${theme === 'light' ? 'bg-button-grey' : 'bg-button-dark'} flex justify-center items-center text-sm w-[31px] h-[31px]` }>
                <span className={`${theme === 'light' ? 'text-black' : 'text-light'}`}>
                    { first }
                </span>
            </button>
            <button
                className={`${theme === 'light' ? 'bg-button-grey' : 'bg-button-dark'} flex justify-center items-center text-sm w-[31px] h-[31px]` }>
                <span className={`${theme === 'light' ? 'text-black' : 'text-light'}`}> 
                    { second }
                </span>
            </button>
            <button
                className={`${theme === 'light' ? 'bg-button-grey' : 'bg-button-dark'} flex justify-center items-center text-sm w-[31px] h-[31px]` }>
                <span className={`${theme === 'light' ? 'text-black' : 'text-light'}`}>
                    { third }
                </span>
            </button>
            <button onClick={ next }>Next</button>
        </>
    )
}
function setActiveButtonPosition(activeButtonValue) {
    if (!(activeButtonValue % 3)) {
        return [activeButtonValue - 2, activeButtonValue - 1, activeButtonValue];
    } else if (!((activeButtonValue + 1) % 3)) {
        return [activeButtonValue - 1, activeButtonValue, activeButtonValue + 1];
    }
    return [activeButtonValue, activeButtonValue + 1, activeButtonValue + 2];
}

function setClassButtons(getButtonValueNumbers, activeElement,theme) {
    return getButtonValueNumbers.map((numberValueButton) => {
        if (numberValueButton === +activeElement) {
            return 'bg-active-button';
        } else { 
           return theme === 'light'
                ?
                'bg-button-grey'
                :
                'bg-button-dark';
        }

    })
}

// className={ `
//     ${
//         second === +endOffset
//     ?
//     'bg-active-button'
//     :
//     theme === 'light'
//         ?
//         'bg-button-grey'
//         :
//         'bg-button-dark'
//     }
//     flex justify-center items-center text-sm w-[31px] h-[31px]` }