import { cn } from '@/lib/utils';
import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react'
import PaymentModal from './PaymentModal';




export const tiers = [
    {
        name: 'Basic',
        id: 'tier-basic',
        href: '#',
        price: 5,
        credits: 62500,
        description: 'Ideal for individuals and small projects.',
        features: [
            '62,500 Credits',
            'Basic support with 48-hour response time',
            'Wireframe-to-code for simple layouts',
            'Limited Tailwind CSS customization'
        ],
        mostPopular: false,
    },
    {
        name: 'Standard',
        id: 'tier-standard',
        href: '#',
        price: 15,
        credits: 187500,
        description: 'Great for regular users with diverse needs.',
        features: [
            '187,500 Credits',
            'Priority support with 24-hour response time',
            'Advanced wireframe-to-code features',
            'Full access to Tailwind CSS customization',
            'Interactive elements support'
        ],
        mostPopular: true,
    },
    {
        name: 'Premium',
        id: 'tier-premium',
        href: '#',
        price: 25,
        credits: 312500,
        description: 'Comprehensive support and features for professionals.',
        features: [
            '312,500 Credits',
            'Dedicated support with 1-hour response time',
            'Premium wireframe-to-code capabilities',
            'Priority processing of wireframes',
            'Exclusive resources and webinars',
            'Unlimited Tailwind CSS customizations'
        ],
        mostPopular: false,
    }
];


const Pricing = () => {
    return (
        <div
            className='bg-white py-24 sm:py-32'
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* header */}
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-rose-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Pricing plans for teams of&nbsp;all&nbsp;sizes
                    </p>
                </div>

                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                    Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in.
                    Explicabo id ut laborum.
                </p>

                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                    {
                        tiers.map((tier, tierIdx) => (

                            <div
                                key={tier.id}
                                className={`${cn(tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8', tierIdx === 0 ? "lg:rounded-r-none" : "", tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "")} flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10`}
                            >
                                <div>


                                    <div>
                                        <div className='flex items-center justify-between gap-x-4'>
                                            <h3
                                                id={tier.id}
                                                className={`${cn(tier.mostPopular ? "text-rose-600" : "text-gray-900")} text-lg font-semibold leading-8`}
                                            >
                                                {tier.name}
                                            </h3>

                                            {
                                                tier.mostPopular ? (
                                                    <p className='rounded-full bg-rose-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-rose-600'>Most Popular</p>
                                                )
                                                    : null
                                            }

                                        </div>
                                    </div>

                                    <p className='mt-4 text-sm leading-6 text-gray-600'>
                                        {tier.description}
                                    </p>
                                    <p className='mt-6 flex items-baseline gap-x-1'>
                                        <span className='text-4xl font-bold -tracking-tight text-gray-900'>
                                            ${tier.price}
                                        </span>
                                        <span className='text-sm font-semibold leading-6 text-gray-600'>/One Time</span>
                                    </p>
                                    <ul
                                        role='list'
                                        className='mt-8 space-y-3 text-sm leading-6 text-gray-600'
                                    >
                                        {
                                            tier.features.map((feature) => (

                                                <li
                                                    key={feature}
                                                    className='flex gap-x-3'
                                                >
                                                    <CheckIcon className='h-6 w-5 flex-none text-rose-600' />
                                                    {feature}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <PaymentModal
                                    className={`${cn(tier.mostPopular ? "bg-rose-600 text-white shadow-sm hover:bg-rose-500" : "bg-transparent text-rose-600 ring-1 ring-rose-600 ring-inset hover:ring-rose-300 hover:bg-transparent")} mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600`}
                                    tier={tier}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Pricing