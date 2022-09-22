import { Tab } from '@headlessui/react';
import { Overview, Photos, Reviews, Menu } from 'components/RestaurantTabs';

const RestaurantTabs = () => {
    return (
        <Tab.Group defaultIndex={0}>
            <div className='flex flex-col lg:min-w-lg lg:max-w-4xl'>
                <Tab.List>
                    <Tab
                        className={({ selected }) =>
                            selected ? 'p-4 m-3 border-b-2 border-pink-primary text-pink-primary focus:outline-hidden hover:cursor-pointer' : 'p-4 m-3 text-gray-600 border-b-2 border-transparent hover:border-gray-300 focus:outline-hidden hover:cursor-pointer'
                        }
                    >
                        Overview
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            selected ? 'p-4 m-3 border-b-2 border-pink-primary text-pink-primary focus:outline-hidden hover:cursor-pointer' : 'p-4 m-3 text-gray-600 border-b-2 border-transparent hover:border-gray-300 focus:outline-hidden hover:cursor-pointer'
                        }
                    >
                        Menu
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            selected ? 'p-4 m-3 border-b-2 border-pink-primary text-pink-primary focus:outline-hidden hover:cursor-pointer' : 'p-4 m-3 text-gray-600 border-b-2 border-transparent hover:border-gray-300 focus:outline-hidden hover:cursor-pointer'
                        }
                    >
                        Photos
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            selected ? 'p-4 m-3 border-b-2 border-pink-primary text-pink-primary focus:outline-hidden hover:cursor-pointer' : 'p-4 m-3 text-gray-600 border-b-2 border-transparent hover:border-gray-300  focus:outline-hidden hover:cursor-pointer'
                        }
                    >
                        Reviews
                    </Tab>
                </Tab.List>
                <Tab.Panels className='min-h-[450px] w-full'>
                    <Tab.Panel>
                        <Overview />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Menu />
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