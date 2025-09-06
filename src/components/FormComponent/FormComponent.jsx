import classes from "./FormComponent.module.css";
import { useState } from "react";
import NumberInput from "./NumberInput";

export default function FormComponent() {
    const [sumValue, setSumValue] = useState("");

    return (
        <form className={`${classes.form} glass_matte_effect`}>
            <h2 className={classes.heading}>Посчитайте свой кредит </h2>
            <NumberInput
                value={sumValue}
                setValue={setSumValue}
            ></NumberInput>
        </form>
    );
}
