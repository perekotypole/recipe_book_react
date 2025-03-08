import { useState, useEffect, useCallback } from "react";

type UseDebouncedProperties = {
	value: any;
	onChangeDelay: (value: any) => void;
};

const useDebounced = (props: UseDebouncedProperties) => {
	const [localValue, setLocalValue] = useState("");
	const [value, setValue] = useState(props.value);
	const [delayDebounceFn, setDelayDebounceFn] =
		useState<React.SetStateAction<any> | null>(null);

	useEffect(() => {
		return () => clearTimeout(delayDebounceFn);
	}, [localValue]);

	const onChange = useCallback(
		(value: any) => {
			setLocalValue(value);

			setDelayDebounceFn(
				setTimeout(() => {
					props.onChangeDelay(value);
					setValue(value);
				}, 1200),
			);
		},
		[props],
	);

	return { value, localValue, onChange };
};

export { useDebounced };
