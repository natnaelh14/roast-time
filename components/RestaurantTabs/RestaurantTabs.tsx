import { Tab } from '@headlessui/react';
import Overview from 'components/Overview/Overview';
import Photos from 'components/Photos/Photos';
import Reviews from 'components/Reviews/Reviews';

const RestaurantTabs = () => {
    return (
        <Tab.Group defaultIndex={0}>
            <div className='flex flex-col w-auto lg:max-w-lg'>
                <Tab.List>
                    <Tab
                        className={({ selected }) =>
                            selected ? 'p-4 m-3 border-b-2 border-pink-primary text-pink-primary' : 'p-4 m-3 text-gray-600 border-b-2 border-transparent hover:border-gray-300'
                        }
                    >
                        Overview
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            selected ? 'p-4 m-3 border-b-2 border-pink-primary text-pink-primary' : 'p-4 m-3 text-gray-600 border-b-2 border-transparent hover:border-gray-300'
                        }
                    >
                        Photos
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            selected ? 'p-4 m-3 border-b-2 border-pink-primary text-pink-primary' : 'p-4 m-3 text-gray-600 border-b-2 border-transparent hover:border-gray-300'
                        }
                    >
                        Reviews
                    </Tab>
                </Tab.List>
                <Tab.Panels className='h-[450px]'>
                    <Tab.Panel>
                        <Overview />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Photos />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Reviews />
                    </Tab.Panel>
                </Tab.Panels>
            </div>
        </Tab.Group>
    )
};
export default RestaurantTabs;