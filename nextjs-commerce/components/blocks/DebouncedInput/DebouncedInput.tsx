import {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface DebouncedChildProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DebouncedInputProps {
  /** Current controlled value */
  value: string;
  /** Called with the debounced value */
  onChange: (value: string) => void;
  /** Debounce delay in ms (default 300) */
  delay?: number;
  /** Render-prop child — receives debounced `value` and `onChange` */
  children: (props: DebouncedChildProps) => ReactElement;
}

function useDebounced(
  externalValue: string,
  onChange: (value: string) => void,
  delay: number,
): DebouncedChildProps {

  const [internalValue, setInternalValue] = useState(externalValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInternalValue(val);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(val);
      }, delay);
    },
    [onChange, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { value: internalValue, onChange: handleChange };
}

const DebouncedInput = ({
  value,
  onChange,
  delay = 300,
  children,
}: DebouncedInputProps) => {
  const debouncedProps = useDebounced(value, onChange, delay);
  return children(debouncedProps);
};

export default DebouncedInput;
