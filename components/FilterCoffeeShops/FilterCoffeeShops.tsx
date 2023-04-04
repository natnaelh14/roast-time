import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const people = ["RELEVANCE", "RATING", "DISTANCE", "POPULARITY"];

const FilterCoffeeShops = () => {
	const [selected, setSelected] = useState(people[0]);
	return (
		<div className="absolute right-6 z-10 mt-4 w-60">
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<Listbox.Button className="relative w-full cursor-default rounded-lg py-2  pl-3 pr-10 text-left shadow-md hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-blue-dark dark:text-gray-200 sm:text-sm">
						<span className="block truncate">{selected}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</span>
					</Listbox.Button>
					<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none dark:bg-blue-dark sm:text-sm">
							{people.map((person, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 hover:cursor-pointer ${
											active ? "bg-gray-300 dark:bg-blue-light dark:text-gray-200" : "dark:text-gray-400"
										}`
									}
									value={person}
								>
									{/* eslint-disable-next-line */}
									{({ selected }) => (
										<>
											<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{person}</span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black sm:text-sm">
													<CheckIcon className="h-5 w-5" aria-hidden="true" />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default FilterCoffeeShops;
