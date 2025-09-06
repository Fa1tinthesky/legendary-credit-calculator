import numberWithCommas from "../../functions/numberWithCommas";
import classes from './FormComponent.module.css'

export default function NumberInput({ value, setValue }) {
    function onChange(event) {
        let newValue = event.target.value;
        let weCan = false;

        if (newValue.length < value.length) {
            weCan = true;
        } else {
            const newSymbol = newValue.slice(-1);
            if (!isNaN(Number(newSymbol))) {
                weCan = true;
            }
        }

        if (weCan) {
            setValue(newValue);
        }
    }

    return (
        <div className={classes.input}>
            <label>Сумма займа</label>
            <input value={value} onChange={onChange} type="text" />
        </div>
    );
}
