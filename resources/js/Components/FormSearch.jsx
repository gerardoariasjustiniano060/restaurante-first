
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function FormSearch({
    url, filters
}) {
    const [search, setSearch] = useState((filters && filters.search) || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route(url), { search }, { preserveState: true, preserveScroll: true });
    };

    return (<div className="text-gray-900 dark:text-white">
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
            <input
                className="w-full max-w-xs pl-4 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-150 ease-in-out"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Buscar
            </button>
        </form>
    </div>);
}