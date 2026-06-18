import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role_id: user.role_id || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit User</h2>}>
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="max-w-xl">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <InputLabel htmlFor="name" value="Name *" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Email *" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="role_id" value="Role *" />
                                        <select
                                            id="role_id"
                                            name="role_id"
                                            value={data.role_id}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            onChange={(e) => setData('role_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select a role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.role_id} className="mt-2" />
                                    </div>

                                    <div className="pt-4 mt-2 border-t">
                                        <p className="text-sm text-gray-500 mb-4">Leave passwords blank to keep the current password.</p>
                                        
                                        <InputLabel htmlFor="password" value="New Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full mb-4"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />

                                        <InputLabel htmlFor="password_confirmation" value="Confirm New Password" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <Link href={route('users.index')} className="text-gray-600 hover:text-gray-900 mr-4">
                                        Cancel
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Update User
                                    </PrimaryButton>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
