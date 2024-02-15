"use client"
import { useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

import { FaStripe } from "react-icons/fa6";

const deliveryMethods = [
    { id: 1, title: 'Local Payment', turnaround: 'Use local payments like eDahab, ZAAD, or Sahal.', price: '0', paymentType: 'local' },
    { id: 2, title: 'Online Payment', turnaround: 'Use PayPal or a credit card.', price: '0', paymentType: 'online' },
];


const paymentMethods = [
    { code: "252", phone: "", id: 1, title: 'eVC Plus', description: 'Fast and secure mobile payment' },
    { code: "25263", phone: "", id: 2, title: 'Zaad', description: 'Reliable for everyday transactions' },
    { code: "25290", phone: "", id: 3, title: 'Sahal', description: 'Easy and convenient payment solution' },
];


const PaymentModal = ({ className }: { className: string }) => {

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);

    const [currentPaymentType, setCurrentPaymentType] = useState('local'); // Default to 'local'


    useEffect(() => {

        const currentMethod = deliveryMethods.find(method => method.id === selectedDeliveryMethod.id)

        if (currentMethod) {
            setCurrentPaymentType(currentMethod.paymentType)
        }

    }, [selectedDeliveryMethod])


    return (
        <Dialog>
            <DialogTrigger className={className}>
                Buy Plan
            </DialogTrigger>
            <DialogContent>
                <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom  transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">

                    <form>
                        <div className='mt-10'>
                            <h3 className="text-lg font-medium text-gray-900">Delivery Method</h3>

                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">

                                {
                                    deliveryMethods.map((method) => (
                                        <div
                                            className={`cursor-pointer rounded-lg border p-4 shadow-sm ${cn(method.id === selectedDeliveryMethod.id ? "border-rose-500" : "border-gray-300")}`}
                                            onClick={() => setSelectedDeliveryMethod(method)}
                                        >

                                            <h4 className="text-sm font-medium text-gray-900">{method.title}</h4>
                                            <p className="mt-1 text-sm text-gray-500">{method.turnaround}</p>

                                        </div>
                                    ))}
                            </div>
                        </div>
                        {
                            currentPaymentType === "online" ?

                                <div className="mt-8 flex gap-4 w-full justify-center">

                                    <button
                                        type='button'
                                        className='w-full'
                                    >

                                        <div
                                            className="cursor-pointer rounded-lg border p-4 shadow-sm hover:border-rose-500 w-full flex justify-center items-center space-x-2"
                                        >
                                            <h4 className="text-md font-medium text-gray-900">Pay With </h4>
                                            <FaStripe className='w-10 h-10' />
                                        </div>

                                    </button>

                                </div>
                                : <>

                                    <div className="mt-10">
                                        <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
                                        <div className="mt-4 flex flex-col space-y-4">

                                            {
                                                paymentMethods.map((method) => (
                                                    <div
                                                        key={method.id}
                                                        className={`cursor-pointer rounded-lg border p-4 shadow-sm ${cn(method.id === selectedPaymentMethod.id ? "border-rose-600" : "border-gray-300")}`}
                                                        onClick={() => setSelectedPaymentMethod(method)}
                                                    >
                                                        <h4 className='text-sm font-medium text-gray-900'>{method.title}</h4>
                                                        <p className="mt-1 text-sm text-gray-500">{method.description}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                        }
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PaymentModal