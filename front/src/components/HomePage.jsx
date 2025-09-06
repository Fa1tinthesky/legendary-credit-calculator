import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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

function FormOption({ defaultValue, inputLabel, textFieldLable, adornment, options, inputChangeHandler, selectChangeHandler, sx, fullWidth, ref}) {
    if (!defaultValue) {
        defaultValue = "default";
    } else if (!adornment) {
        adornment = ""
    } else if (!fullWidth) {
        fullWidth = false;
    }

    return (
        <Box display="flex" direction="row" sx={sx}>
                <FormControl color="blue" sx={{width: 0.78}}>
                  <InputLabel htmlFor="outlined-adornment-amount">{inputLabel}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">{adornment}</InputAdornment>}
                    label={inputLabel}
                    onChange={inputChangeHandler}
                    ref={ref}
                    sx={{flex: 1}}
                  />
                </FormControl>
                <TextField
                    id="outlined-select-currency"
                    select
                    label={textFieldLable}
                    defaultValue={defaultValue}
                    onChange={selectChangeHandler}
                    sx={{width: 0.2}}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
        getData({setData, setIsLoading, setShowTable, body});
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
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">{chosen_currencie}</InputAdornment>}
                            label="Сумма кредита"
                            onChange={(e) => {changeBody("sum", Number(e.target.value))}}
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
                        changeBody("period", +e.target.value * multiplier)
                    }}
                    options={time_terms}
                    sx={{justifyContent: "space-between"}}
                    ></FormOption>
                </Grid>
                <Grid size={6}>
                    <FormOption
                        defaultValue={"% в месяц"}
                        inputLabel="Ставка"
                        textFieldLable="" 
                        selectChangeHandler={(e) => {e.preventDefault; console.log(e.target.value)}}
                        inputChangeHandler={(e) => {e.preventDefault; console.log(e.target.value)}}
                        options={money_terms}
                        sx={{justifyContent: "space-between"}}
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
                    >
                      {debt_types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <DatePickerUI color="blue"></DatePickerUI>
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
        </ThemeProvider>
        </main>
    </>
    );
}
