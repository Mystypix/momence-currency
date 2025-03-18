import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import {useController, UseControllerProps} from "react-hook-form";

interface InputFieldProps extends UseControllerProps {
    label?: string;
}

export const InputField = (props: InputFieldProps) => {
    const { field } = useController(props)
    const { label } = props;

    return (
        <FloatLabel>
            <InputText {...field} />
            {label && <label htmlFor={field.name}>{label}</label>}
        </FloatLabel>
    )
}
