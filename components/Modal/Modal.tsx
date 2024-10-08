import { Dialog } from "@headlessui/react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

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
		<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen} open={open}>
			<div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity dark:bg-opacity-75" />
			<div className="fixed inset-0 z-10 overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
				</div>
			</div>
		</Dialog>
	);
}
