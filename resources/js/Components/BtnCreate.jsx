
import { Head, router, usePage } from '@inertiajs/react';

export default function BtnCreate({
    url, ...props
}) {

    const startCreating = () => {
        router.get(route(url));
    };


    return (<button
        onClick={() => startCreating()}
        className="flex items-center justify-center w-9 h-9 bg-blue-100 text-blue-600 font-medium rounded-full shadow-md hover:bg-blue-200 transition-colors duration-200"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
    </button>)
}