import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import UserModal from '@/Components/modals/UserModal';
import { useState } from 'react';


function Index({users }) {

    const [open, setOpen] = useState(false);

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
            accessorKey: 'role',
            header: 'Role',
               cell: info => info.getValue().name,
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

                <button 
                    className="btn btn-primary mb-4 float-end"  
                    onClick={() => setOpen(true)}
                >
                    Add User
                </button>

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

        <UserModal open={open} setOpen={setOpen}>
            <form>
                <input className="form-control mb-2" placeholder="Name" />
                <input className="form-control mb-3" placeholder="Email" />

                <select className="form-select mb-3">
                    <option disabled selected className="d-none">Role</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="customer">Customer</option>
                </select>

                <div className="d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </button>

                    <button className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </UserModal>
    </AuthenticatedLayout>
  )
}

export default Index