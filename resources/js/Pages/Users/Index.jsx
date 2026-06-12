import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'


function Index({users }) {

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: info => (
                <div className="d-flex gap-2 justify-content-center align-items-center w-100">
                    <button className="btn btn-sm d-flex justify-content-center align-items-center">
                        <span
                        className="material-symbols-rounded"
                        style={{ color: "#0d6efd" }}
                        >
                        edit_square
                        </span>
                    </button>

                    <button className="btn btn-sm d-flex justify-content-center align-items-center">
                        <span
                        className="material-symbols-rounded"
                        style={{ color: "#dc3545" }}
                        >
                        delete
                        </span>
                    </button>
                </div>
            ),
        }
    ];

    const table = useReactTable({
        data: users || [],  
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    
  return (
        <AuthenticatedLayout> 

            <button className="btn btn-primary mb-4 float-end">Add User</button>

        <table className="w-full border ">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} className="border p-2">
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="border p-2 text-center">
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </td>
                    ))}
                    </tr>
                ))}
            </tbody>
      </table>
        </AuthenticatedLayout>
  )
}

export default Index