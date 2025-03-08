import { useState, useEffect, useCallback, useRef } from "react";

type UseDebouncedProperties<T> = {
	value: T;
	onChangeDelay: (value: T) => void;
	delay?: number;
};

const useDebounced = <T>({
	value: initialValue,
	onChangeDelay,
	delay = 1200,
}: UseDebouncedProperties<T>) => {
	const [localValue, setLocalValue] = useState<T>(initialValue);
	const [value, setValue] = useState<T>(initialValue);
	const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Правильний тип

	const onChange = useCallback(
		(newValue: T) => {
			setLocalValue(newValue);

			if (debounceTimeout.current) {
				clearTimeout(debounceTimeout.current);
			}

			debounceTimeout.current = setTimeout(() => {
				onChangeDelay(newValue);
				setValue(newValue);
			}, delay);
		},
		[onChangeDelay, delay],
	);

	useEffect(() => {
		return () => {
			if (debounceTimeout.current) {
				clearTimeout(debounceTimeout.current);
			}
		};
	}, []);

	return { value, localValue, onChange };
};

export { useDebounced };
