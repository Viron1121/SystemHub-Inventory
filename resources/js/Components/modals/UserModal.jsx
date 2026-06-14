import { Dialog } from '@headlessui/react';

export default function UserModal({ open, setOpen, children }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/50" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-lg w-full max-w-md p-4">
                    <Dialog.Title className="text-lg font-semibold mb-3">
                        User Form
                    </Dialog.Title>

                    {children}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}