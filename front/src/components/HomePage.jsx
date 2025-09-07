import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./HomePage.css";
import constants from "./constants/constants";
import MenuAppBar from "./MenuAppBar";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./constants/theme";
import ContentComponent from "./ContentComponent/ContentComponent";
import getData from "../functions/getData";
import DatePickerUI from "./DatePickerUI";
import Button from "@mui/material/Button";
import {
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Slider,
    MenuItem,
    Container,
    Box,
    Grid,
} from "@mui/material";
import { useState, useRef } from "react";

function FormOption({
    defaultValue,
    inputLabel,
    textFieldLable,
    adornment,
    options,
    inputChangeHandler,
    selectChangeHandler,
    sx,
    fullWidth,
    ref,
    isSelect = true,
    isError = false,
}) {
    if (!defaultValue) {
        defaultValue = "default";
    } else if (!adornment) {
        adornment = "";
    } else if (!fullWidth) {
        fullWidth = false;
    }

    let width1, width2;
    if (isSelect) {
        width1 = 0.78;
        width2 = 0.2;
    } else {
        width1 = 1;
        width2 = 0;
    }

    return (
        <Box display="flex" direction="row" sx={sx}>
            <FormControl color="blue" sx={{ width: width1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                    {inputLabel}
                </InputLabel>
                <OutlinedInput
                    error={isError}
                    id="outlined-adornment-amount"
                    startAdornment={
                        <InputAdornment position="start">
                            {adornment}
                        </InputAdornment>
                    }
                    label={inputLabel}
                    onChange={inputChangeHandler}
                    ref={ref}
                    sx={{ flex: 1 }}
                />
            </FormControl>
            {isSelect && (
                <TextField
                    color="blue"
                    id="outlined-select-currency"
                    select
                    label={textFieldLable}
                    defaultValue={defaultValue}
                    onChange={selectChangeHandler}
                    sx={{ width: width2 }}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        </Box>
    );
}

export default function HomePage() {
    const { time_terms, money_terms, currencies, debt_types } = constants;

    const [isSumError, setIsSumError] = useState(false);
    const [isPeriodError, setIsPeriodError] = useState(false);
    const [isRateError, setIsRateError] = useState(false);
    const [chosen_currencie, set_chosen_currencie] = useState(
        currencies[1].label
    );

    const [showTable, setShowTable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [dataS, setDataS] = useState({});
    const [body, setBody] = useState({ currency: 1, type: 1 });
    const [resultBody, setResultBody] = useState(body);
    const [multiplier, setMultiplier] = useState(1);
    const [currency, setCurrency] = useState(currencies[1].label);
    const periodRef = useRef();

    function changeBody(key, value) {
        const newBody = { ...body };
        newBody[key] = value;
        setBody(newBody);
    }

    const handleCurrencieChange = (event) => {
        const chosen = currencies.filter(
            (item) => item.value === event.target.value
        );
        console.log(chosen);
        console.log(chosen.value);
        set_chosen_currencie(chosen ? chosen[0].label : "TJS");
    };

    const exportHandler = (e) => {
        e.preventDefault();
    };

    const calcHandle = () => {
        if (!body.sum) {
            setIsSumError(true);
        }
        if (!body.period) {
            setIsPeriodError(true);
        }
        if (!body.rate) {
            setIsRateError(true);
        }

        if (body.sum && body.period && body.rate) {
            setResultBody(body);
            setCurrency(chosen_currencie);

            console.log(body);
            getData({ setData, setIsLoading, setShowTable, body, setDataS });
        }
    };

    return (
        <>
            <main>
                <MenuAppBar></MenuAppBar>
                <ThemeProvider theme={theme}>
                    <Container
                        className="container"
                        sx={{
                            marginTop: 3,
                            padding: "20px",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <Box className="flexbox">
                                    <FormControl
                                        color="blue"
                                        sx={{ width: 0.78 }}
                                        className="focus_input"
                                    >
                                        <InputLabel htmlFor="outlined-adornment-amount">
                                            Сумма кредита
                                        </InputLabel>
                                        <OutlinedInput
                                            error={isSumError}
                                            id="outlined-adornment-amount"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    {chosen_currencie}
                                                </InputAdornment>
                                            }
                                            label="Сумма кредита"
                                            onChange={(e) => {
                                                setIsSumError(false);
                                                changeBody(
                                                    "sum",
                                                    Number(e.target.value)
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Валюта"
                                        defaultValue="TJS"
                                        // helperText="Please select your currency"
                                        color="blue"
                                        size="normal"
                                        onChange={(e) => {
                                            changeBody("currency", 1);
                                            handleCurrencieChange(e);
                                        }}
                                        sx={{ width: 0.2 }}
                                    >
                                        {currencies.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>

                            <Grid size={6}>
                                <FormOption
                                    defaultValue="месяц"
                                    ref={periodRef}
                                    inputLabel="Срок кредита"
                                    textFieldLable=""
                                    isError={isPeriodError}
                                    selectChangeHandler={(e) => {
                                        let newMultiplier;
                                        if (e.target.value === "год") {
                                            newMultiplier = 12;
                                        } else if (e.target.value === "месяц") {
                                            newMultiplier = 1;
                                        }

                                        const val =
                                            periodRef.current.childNodes[1]
                                                .value;
                                        setMultiplier(newMultiplier);
                                        console.log(
                                            "Multiplier: ",
                                            newMultiplier
                                        );
                                        changeBody(
                                            "period",
                                            +val * newMultiplier
                                        );
                                    }}
                                    inputChangeHandler={(e) => {
                                        setIsPeriodError(false);
                                        changeBody(
                                            "period",
                                            +e.target.value * multiplier
                                        );
                                    }}
                                    options={time_terms}
                                    sx={{ justifyContent: "space-between" }}
                                ></FormOption>
                            </Grid>
                            <Grid size={6}>
                                <FormOption
                                    defaultValue={"% в месяц"}
                                    inputLabel="Ставка(в месяц)"
                                    isSelect={false}
                                    inputChangeHandler={(e) => {
                                        setIsRateError(false);
                                        changeBody(
                                            "rate",
                                            Number(e.target.value)
                                        );
                                    }}
                                    options={money_terms}
                                    sx={{ justifyContent: "space-between" }}
                                    isError={isRateError}
                                ></FormOption>
                            </Grid>
                            <Grid size={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 1.4,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="outlined-select-currency"
                                        select
                                        label={"Тип кредита"}
                                        defaultValue={"Аннуитетный"}
                                        color="blue"
                                        onChange={(e) => {
                                            changeBody(
                                                "type",
                                                e.target.value === "аннуитет"
                                                    ? 1
                                                    : 2
                                            );
                                        }}
                                    >
                                        {debt_types.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <DatePickerUI
                                        color="blue"
                                        changeBody={changeBody}
                                    ></DatePickerUI>
                                </Box>
                            </Grid>
                            <Grid size={3}></Grid>
                            <Grid size={12}>
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="blue"
                                    sx={{ margin: 1, borderRadius: "12px" }}
                                    onClick={calcHandle}
                                >
                                    Рассчитать
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                    {showTable && (
                        <ContentComponent
                            sData={dataS}
                            data={data}
                            currency={currency}
                            isLoading={isLoading}
                            body={resultBody}
                        ></ContentComponent>
                    )}
                </ThemeProvider>
            </main>
        </>
    );
}
