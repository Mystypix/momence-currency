import { Dropdown } from 'primereact/dropdown';
import {FloatLabel} from "primereact/floatlabel";
import {SelectItem} from "primereact/selectitem";
import {useController, UseControllerProps} from "react-hook-form";

interface SelectFieldProps extends UseControllerProps  {
    label?: string;
    options: SelectItem[];
}

export const SelectField = (props: SelectFieldProps) => {
    const { field } = useController(props)
    const { label, options } = props;

    return (
        <FloatLabel>
            <Dropdown {...field} options={options} optionLabel="name"/>
            {label && <label htmlFor={field.name}>{label}</label>}
        </FloatLabel>
    )
}