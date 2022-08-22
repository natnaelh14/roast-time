import { classNames } from "utils/helpers";

export const FieldDescription = ({
    name,
    isDisabled,
    description,
}: {
    name: string;
    isDisabled: boolean | undefined;
    description?: string;
}) => {
    if (!description) return null;

    return (
        <p
            id={`${name}-description`}
            className={classNames(
                "text-xs font-normal transition-colors",
                isDisabled ? "text-gray-300" : "text-gray-500"
            )}
        >
            {description}
        </p>
    );
};