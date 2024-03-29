import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef } from "react";

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
	variant?: "success" | "error";
	title?: string;
	children: React.ReactNode;
}
export function Modal({ open, setOpen, variant, title, children }: Props) {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity dark:bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative overflow-hidden rounded-lg bg-white px-24 py-16 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-blue-dark sm:my-8 sm:w-full sm:max-w-lg">
								<div>
									{variant === "success" ? (
										<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
											<CheckIcon className="size-6 text-green-600" aria-hidden="true" />
										</div>
									) : (
										variant === "error" && (
											<div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100">
												<ExclamationTriangleIcon className="size-6 text-red-600" aria-hidden="true" />
											</div>
										)
									)}
									<div className="my-10 text-center sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-center text-3xl font-semibold text-brown-dark dark:text-brown-light"
										>
											{title}
										</Dialog.Title>
									</div>
								</div>
								<div className="mt-5">{children}</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
