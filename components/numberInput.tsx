import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface NumberInputProps {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    onChange: (newValue: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ min = 1, max = 10, step = 1, value, onChange }) => {
    const [localValue, setLocalValue] = useState<number>(value);

    const handleIncrement = () => {
        const newValue = localValue + step;
        if (newValue <= max) {
            setLocalValue(newValue);
            onChange(newValue);
        }
    };

    const handleDecrement = () => {
        const newValue = localValue - step;
        if (newValue >= min) {
            setLocalValue(newValue);
            onChange(newValue);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setLocalValue(newValue);
            onChange(newValue);
        }
    };

    const handleBlur = () => {
        if (localValue < min) {
            setLocalValue(min);
            onChange(min);
        } else if (localValue > max) {
            setLocalValue(max);
            onChange(max);
        }
    };

    return (
        <div className="flex items-center">
            <button
                className="border-2 border-orange-500 text-orange-500 rounded-full p-2"
                onClick={handleDecrement}
            >
                <Minus size={16} />
            </button>
            <input
                type="number"
                className="mx-2 text-center border-2 border-orange-500 text-orange-500 rounded-full p-2 w-12"
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                min={min}
                max={max}
                readOnly //habilitar edição futuramente
            />
            <button
                className="border-2 border-orange-500 text-orange-500 rounded-full p-2"
                onClick={handleIncrement}
            >
                <Plus size={16} />
            </button>
        </div>
    );
};

export default NumberInput;
