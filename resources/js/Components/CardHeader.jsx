import { Head, router, usePage } from '@inertiajs/react';


export default function CardHeader({
    ...props
}) {

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('categorias.index'), { search }, { preserveState: true, preserveScroll: true });
    };

    return (<>
        <div className="pt-4">
            <div className="w-full mx-auto sm:px-6 lg:px-8">
                <div className="bg-white border dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-3">
                        <div className="flex justify-between w-full items-center">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}