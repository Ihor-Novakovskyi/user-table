'use client'
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function Pagination({ theme, isLimited, reloadLimit }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startOffset = Number(searchParams.get('startOffset') ?? 0);
    const endOffset = Number(searchParams.get('endOffset') ?? 1);
    const filter = searchParams.get('filter') ?? 'all';
    const setSlide = (e) => { 
        const buttonValue = Number(e.currentTarget.children[0].innerText);
        if (buttonValue >= endOffset && isLimited) {
            return;
        } else { 
            isLimited ? reloadLimit(false) : void 0;
            router.push(`/?startOffset=${buttonValue - 1}&endOffset=${buttonValue}&filter=${filter}`)
        }
    }
    const prevSlide = () => {
        if (isLimited && endOffset === 1) { 
            return;
        }
        isLimited ? reloadLimit(false) : void 0;
        router.push(`/?startOffset=${startOffset - 1 >= 0 ? startOffset - 1 : 0}&endOffset=${endOffset - 1 >= 1 ? endOffset - 1 : 1}&filter=${filter}`)
    }
    const nextSlide = () => {
        router.push(`/?startOffset=${startOffset + 1}&endOffset=${endOffset + 1}&filter=${filter}`)
    }
    const buttonValueNumbers = setButtonPosition(endOffset);
    const [first, second, third] = buttonValueNumbers;
    const [firstClass, secondClass, thirdClass] = setClassButtons(buttonValueNumbers, endOffset, theme);
 
    return (
        <>
            <button
                onClick={ prevSlide }
                className={`text-sm ${theme === 'light' ? 'text-grey-toggle' : 'text-light'}`}
            >
                Prev
            </button>
            <button
                onClick={setSlide}
                className={ `flex justify-center items-center text-sm w-[31px] h-[31px] rounded-[8px] ${firstClass}` }>
                <span className={`${theme === 'light' && first !== endOffset ? 'text-black' : 'text-light'}`}>
                    { first }
                </span>
            </button>
            <button
                onClick={setSlide}
                className={`flex justify-center items-center text-sm w-[31px] h-[31px] rounded-[8px] ${secondClass}` }>
                <span className={`${theme === 'light' && second !== endOffset ? 'text-black' : 'text-light'}`}> 
                    { second }
                </span>
            </button>
            <button
                onClick={setSlide}
                className={ `flex justify-center items-center text-sm w-[31px] h-[31px] rounded-[8px] ${thirdClass}` }>
                <span className={`$ ${theme === 'light' && third !== endOffset ? 'text-black' : 'text-light'}`}>
                    { third }
                </span>
            </button>
            <button
                onClick={ nextSlide }
                disabled={ isLimited }
                className={`text-sm ${theme === 'light' ? 'text-grey-toggle' : 'text-light'}`}
            >
                Next
            </button>
        </>
    )
}
function setButtonPosition(activeButtonValue) {
    if (!(activeButtonValue % 3)) {
        return [activeButtonValue - 2, activeButtonValue - 1, activeButtonValue];
    } else if (!((activeButtonValue + 1) % 3)) {
        return [activeButtonValue - 1, activeButtonValue, activeButtonValue + 1];
    }
    return [activeButtonValue, activeButtonValue + 1, activeButtonValue + 2];
}

function setClassButtons(getButtonValueNumbers, activeElement,theme) {
    return getButtonValueNumbers.map((numberValueButton) => {
        if (numberValueButton === activeElement) {
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

