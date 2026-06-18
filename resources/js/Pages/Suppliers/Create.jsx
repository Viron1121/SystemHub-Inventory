import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact_person: '',
        phone: '',
        email: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('suppliers.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Supplier</h2>}>
            <Head title="Create Supplier" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="max-w-xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="name" value="Company Name *" />
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

                                    <div className="col-span-2 md:col-span-1">
                                        <InputLabel htmlFor="contact_person" value="Contact Person" />
                                        <TextInput
                                            id="contact_person"
                                            type="text"
                                            name="contact_person"
                                            value={data.contact_person}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('contact_person', e.target.value)}
                                        />
                                        <InputError message={errors.contact_person} className="mt-2" />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <InputLabel htmlFor="phone" value="Phone Number" />
                                        <TextInput
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>

                                    <div className="col-span-2">
                                        <InputLabel htmlFor="email" value="Email Address" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="col-span-2">
                                        <InputLabel htmlFor="address" value="Address" />
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={data.address}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            rows="3"
                                            onChange={(e) => setData('address', e.target.value)}
                                        ></textarea>
                                        <InputError message={errors.address} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <Link href={route('suppliers.index')} className="text-gray-600 hover:text-gray-900 mr-4">
                                        Cancel
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Save Supplier
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
