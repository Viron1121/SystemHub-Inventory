import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useEffect, useState} from 'react';

function Index({users }) {

    console.log('test',users);
  return (
        <AuthenticatedLayout> 
            <table className="w-full border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {users?.map(user => (
                        <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AuthenticatedLayout>
  )
}

export default Index