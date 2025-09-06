import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ContentComponent from './ContentComponent/ContentComponent';
import getData from '../functions/getData';
import Stack from '@mui/material/Stack';
import DatePickerUI from './DatePickerUI';
import Button from '@mui/material/Button';
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Slider, MenuItem, Container, Box, Grid} from '@mui/material';
import { createTheme, alpha, getContrastRatio, ThemeProvider } from '@mui/material/styles';
import { useReducer, useState, useRef } from 'react';
import MenuAppBar from './MenuAppBar';


const blueBase = "#000000";
const blueMain = alpha(blueBase, 0.7);
const theme = createTheme({
    palette: {
        blue: {
            main: blueMain,
            light: alpha(blueBase, 0.5),
            dark: alpha(blueBase, 0.9),
            contrastText: getContrastRatio(blueMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
})

function FormOption({ defaultValue, inputLabel, textFieldLable, adornment, options, inputChangeHandler, selectChangeHandler, sx, fullWidth, ref, isSelect=true, isError=false}) {
    if (!defaultValue) {
        defaultValue = "default";
    } else if (!adornment) {
        adornment = ""
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
                <FormControl color="blue" sx={{width: width1}}>
                  <InputLabel htmlFor="outlined-adornment-amount">{inputLabel}</InputLabel>
                  <OutlinedInput
                    error={isError}
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">{adornment}</InputAdornment>}
                    label={inputLabel}
                    onChange={inputChangeHandler}
                    ref={ref}
                    sx={{flex: 1}}
                  />
                </FormControl>
        {isSelect && <TextField
                    id="outlined-select-currency"
                    select
                    label={textFieldLable}
                    defaultValue={defaultValue}
                    onChange={selectChangeHandler}
                    sx={{width: width2}}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>}
        </Box>
    )
}

export default function HomePage() {
    const [chosen_currencie, set_chosen_currencie] = useState("");
    const time_terms = [
        {
            value: "месяц",
            label: "мес."
        },
        {
            value: "год",
            label: "год"
        },
    ]
    const money_terms = [
        {
            value: "% в месяц",
            label: "% в месяц",
        },
        /* {
            value: "% в год",
            label: "% в год",
        }, */
    ]

    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'TJS',
            label: 'SM',
        },
    ];
    
    const debt_types = [
        {
            "value": "аннуитет",
            "label": "аннуитет"
        },
        {
            "value": "дифферинцированный",
            "label": "дифферинцированный"
        },
    ]

    const [isSumError, setIsSumError] = useState(false);
    const [isPeriodError, setIsPeriodError] = useState(false);
    const [isRateError, setIsRateError] = useState(false);
    const testData = {
    "table": [
        {
            "date": "2025-09-03T00:00:00Z",
            "payment": 8884.88,
            "body": 7884.88,
            "interest": 1000,
            "remainder": 92115.12
        },
        {
            "date": "2025-10-03T00:00:00Z",
            "payment": 8884.88,
            "body": 7963.73,
            "interest": 921.15,
            "remainder": 84151.39
        },
        {
            "date": "2025-11-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8043.36,
            "interest": 841.51,
            "remainder": 76108.03
        },
        {
            "date": "2025-12-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8123.8,
            "interest": 761.08,
            "remainder": 67984.23
        },
        {
            "date": "2026-01-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8205.04,
            "interest": 679.84,
            "remainder": 59779.19
        },
        {
            "date": "2026-02-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8287.09,
            "interest": 597.79,
            "remainder": 51492.11
        },
        {
            "date": "2026-03-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8369.96,
            "interest": 514.92,
            "remainder": 43122.15
        },
        {
            "date": "2026-04-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8453.66,
            "interest": 431.22,
            "remainder": 34668.49
        },
        {
            "date": "2026-05-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8538.19,
            "interest": 346.68,
            "remainder": 26130.3
        },
        {
            "date": "2026-06-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8623.58,
            "interest": 261.3,
            "remainder": 17506.72
        },
        {
            "date": "2026-07-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8709.81,
            "interest": 175.07,
            "remainder": 8796.91
        },
        {
            "date": "2026-08-03T00:00:00Z",
            "payment": 8884.88,
            "body": 8796.91,
            "interest": 87.97,
            "remainder": 0
        }
    ],
    "monthly": 8884.88,
    "sum": 106618.55
}


    const [showTable, setShowTable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [body, setBody] = useState({});
    const [multiplier, setMultiplier] = useState(1);
    const periodRef = useRef();

    function changeBody(key, value) {
        const newBody = {...body};
        newBody[key] = value;

        console.log(newBody);
        setBody(newBody);
    }

    const handleCurrencieChange = (event) => {
        const chosen = currencies.filter(item => item.value === event.target.value);
        console.log(chosen);
        console.log(chosen.value);
        set_chosen_currencie(chosen ? chosen[0].label : "TJS");
    }
    
    const calcHandle = () => {  
        // getData({setData, setIsLoading, setShowTable, body});
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
            setIsLoading(false);
            setShowTable(true);
            setData(testData);
        }
    };

    return (
    <>
        <main>
        <MenuAppBar></MenuAppBar>
        <ThemeProvider theme={theme}>
        <Container sx={{ flexGrow: 0, marginTop: 3, maxWidth: "1200px", backgroundColor: "rgba(255, 255, 255, 0.5)", padding: "20px", borderRadius: "16px"}}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <FormControl color="blue" sx={{width: 0.78}} className='focus_input'>
                          <InputLabel htmlFor="outlined-adornment-amount">Сумма кредита</InputLabel>
                          <OutlinedInput
                            error={isSumError}
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">{chosen_currencie}</InputAdornment>}
                            label="Сумма кредита"
                            onChange={(e) => {
                                setIsSumError(false);
                                changeBody("sum", Number(e.target.value))}}
                          />
                        </FormControl>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Currency"
                            defaultValue="TJS"
                            // helperText="Please select your currency"
                            color="blue"
                            size="normal"
                            onChange={(e) => {changeBody("currency", 1)}}
                            sx={{width: 0.2}}
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
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
                        if (e.target.value === "год") { newMultiplier = 12}
                        else if (e.target.value === "месяц") { newMultiplier = 1 }

                        const val = periodRef.current.childNodes[1].value;
                        setMultiplier(newMultiplier);
                        console.log("Multiplier: ", newMultiplier);
                        changeBody("period", +val * newMultiplier)
                    }}
                    inputChangeHandler={(e) => {
                        setIsPeriodError(false);
                        changeBody("period", +e.target.value * multiplier)
                    }}
                    options={time_terms}
                    sx={{justifyContent: "space-between"}}
                    ></FormOption>
                </Grid>
                <Grid size={6}>
                    <FormOption
                        defaultValue={"% в месяц"}
                        inputLabel="Ставка(в месяц)"
                        isSelect={false}
                        inputChangeHandler={(e) => { 
                            setIsRateError(false);
                            changeBody("rate", Number(e.target.value))}}
                        options={money_terms}
                        sx={{justifyContent: "space-between"}}
                        isError={isRateError}
                    ></FormOption>
                </Grid>
                <Grid size={6}>
                    <Box sx={{display: "flex", justifyContent: "space-between", gap: 1.4}}>
                    <TextField
                        fullWidth
                        id="outlined-select-currency"
                        select
                        label={"Тип кредита"}
                        defaultValue={"аннуитет"}
                        color="blue"
                        onChange={(e) => { changeBody("type", e.target.value === "аннуитет" ? 1 : 2) }}
                    >
                      {debt_types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <DatePickerUI color="blue" changeBody={changeBody}></DatePickerUI>
        </Box>
                </Grid>
                <Grid size={3}>
                </Grid>  
                <Grid size={12}>
                    ‌<Button 
                        fullWidth 
                        size="large" 
                        variant="contained" 
                        color="blue" 
                        sx={{margin: 1, borderRadius: 0}}
                        onClick={calcHandle}>Рассчитать</Button>
                </Grid>
            </Grid>
        </Container>
        {showTable && <ContentComponent data={testData} currency={"$"}></ContentComponent>}
        </ThemeProvider>
        </main>
    </>
    );
}
