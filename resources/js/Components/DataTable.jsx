import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';

export default function DataTable({
    columns,
    data = [],
    searchPlaceholder = "Search...",
    showSearch = false,
    pageSizeOptions = [5, 10, 25, 50],
    defaultPageSize = 10,
    emptyStateMessage = "No records found.",
    getRowClassName,
}) {
    const [globalFilter, setGlobalFilter] = useState('');

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: defaultPageSize,
            },
        },
    });

    const { getHeaderGroups, getRowModel, getState, setPageSize, nextPage, previousPage, getCanPreviousPage, getCanNextPage, getPageCount } = table;
    const { pagination } = getState();

    const totalRows = getRowModel().rows.length;
    const allRowsLength = data.length;
    const startIdx = allRowsLength === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
    const endIdx = Math.min((pagination.pageIndex + 1) * pagination.pageSize, allRowsLength);

    const getPageNumbers = () => {
        const pageCount = getPageCount();
        const currentPage = pagination.pageIndex;
        const pages = [];

        if (pageCount <= 7) {
            for (let i = 0; i < pageCount; i++) pages.push(i);
        } else {
            pages.push(0);
            if (currentPage > 2) pages.push('ellipsis1');
            
            const start = Math.max(1, currentPage - 1);
            const end = Math.min(pageCount - 2, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (currentPage < pageCount - 3) pages.push('ellipsis2');
            pages.push(pageCount - 1);
        }
        return pages;
    };

    return (
        <div className="space-y-4">
            {showSearch && (
                <div className="flex items-center justify-between">
                    <input
                        type="text"
                        value={globalFilter ?? ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                        className="w-full max-w-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={searchPlaceholder}
                    />
                </div>
            )}

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {getRowModel().rows.length > 0 ? (
                            getRowModel().rows.map(row => (
                                <tr 
                                    key={row.id} 
                                    className={`hover:bg-gray-50 transition-colors ${
                                        getRowClassName ? getRowClassName(row.original) : ''
                                    }`}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-sm text-gray-500">
                                    {emptyStateMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {allRowsLength > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>Show</span>
                        <select
                            value={pagination.pageSize}
                            onChange={e => setPageSize(Number(e.target.value))}
                            className="rounded-md border-gray-300 py-1 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <span>entries</span>
                        <span className="ml-4 text-gray-500">
                            Showing {startIdx} to {endIdx} of {allRowsLength} entries
                        </span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => table.setPageIndex(0)}
                            disabled={!getCanPreviousPage()}
                            className="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            First
                        </button>
                        <button
                            onClick={() => previousPage()}
                            disabled={!getCanPreviousPage()}
                            className="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Prev
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((page, index) => {
                                if (page === 'ellipsis1' || page === 'ellipsis2') {
                                    return <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>;
                                }
                                return (
                                    <button
                                        key={page}
                                        onClick={() => table.setPageIndex(page)}
                                        className={`px-3 py-1.5 rounded border text-sm font-medium transition ${
                                            pagination.pageIndex === page
                                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        {page + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => nextPage()}
                            disabled={!getCanNextPage()}
                            className="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => table.setPageIndex(getPageCount() - 1)}
                            disabled={!getCanNextPage()}
                            className="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
