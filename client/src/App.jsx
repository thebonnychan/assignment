import React from "react";
import axios from "axios";
import Select from "react-select";
import { useForm, useController } from "react-hook-form";
import Swal from "sweetalert2";
import "./App.css";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange, yellow } from "@mui/material/colors";

const App = ({ user = {} }) => {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: user,
  });
  const { field } = useController({ name: "address_state", control });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const handleSelectChange = (option) => {
    field.onChange(option.value);
  };

  const handleSave = async (formValues) => {
    const dataBody = {
      name_first: formValues.name_first,
      email: formValues.email,
      address_state: formValues.address_state,
      name_last: formValues.name_last,
      address_line_1: formValues.address_line_1,
      address_line_2: formValues.address_line_2,
      address_city: formValues.address_city,
      address_postal_code: formValues.address_postal_code,
      document_ssn: formValues.document_ssn,
      birth_date: formValues.birth_date,
    };

    await axios
      .post("/api", dataBody, config)
      .then(function (res) {
        if (res.data.summary.outcome === "Approved") {
          return Swal.fire({
            title: "Success!",
            text: "Account successfully created!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "OrangeRed",
          });
        } else if (res.data.summary.outcome === "Manual Review") {
          return Swal.fire({
            icon: "info",
            text: "Thanks for submitting your application, we'll be in touch shortly!",
            confirmButtonText: "OK",
            confirmButtonColor: "OrangeRed",
          });
        } else if (res.data.summary.outcome === "Denied") {
          return Swal.fire({
            icon: "error",
            title: "Sorry, your application was not successful. womp womp :(",
            confirmButtonText: "OK",
            confirmButtonColor: "OrangeRed",
          });
        } else {
          return Swal.fire({
            icon: "error",
            title: "uh oh something went wrong",
            confirmButtonText: "OK",
            confirmButtonColor: "OrangeRed",
          });
        }
      })
      .catch(function (error) {
        console.log("error::: " + error.response);
      });
  };

  return (
    <div>
      <Typography gutterBottom variant="h3" align="center">
        Some Bank
      </Typography>
      <Card style={{ maxWidth: 800, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" color={"OrangeRed"}>
            Submit User Application
          </Typography>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            paddingBottom={"5px"}
          >
            Fill in your information for submission
          </Typography>
          <form onSubmit={handleSubmit(handleSave)}>
            <ThemeProvider theme={theme}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="First Name"
                    placeholder="Enter First Name"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("name_first")}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Last Name"
                    placeholder="Enter Last Name"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("name_last")}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Address Line 1"
                    placeholder="Enter Address"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("address_line_1")}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Address Line 2"
                    placeholder="Enter Floor, Apartment Number, etc"
                    variant="outlined"
                    fullWidth
                    {...register("address_line_2")}
                  />
                </Grid>
                <Grid sm={6} item>
                  <TextField
                    label="City"
                    placeholder="Enter City"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("address_city")}
                  />
                </Grid>
                <Grid sm={6} item>
                  <Select
                    placeholder="Select State...*"
                    required
                    value={stateOptions.find(
                      ({ value }) => value === field.value
                    )}
                    onChange={handleSelectChange}
                    options={stateOptions}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                      }),
                      dropdownIndicator: arrowStyles,
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: "3.5rem",
                        fontSize: "12pt",
                        fontFamily:
                          "Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif",
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "OrangeRed",
                        primary: "OrangeRed",
                      },
                    })}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Zip Code"
                    placeholder="Enter Zip Code"
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      title: "numbers only",
                      maxLength: 5,
                      minLength: 5,
                    }}
                    {...register("address_postal_code")}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Country"
                    placeholder="US"
                    variant="outlined"
                    fullWidth
                    required
                    disabled
                    defaultValue="US"
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="email"
                    label="Email"
                    placeholder="Enter Email"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("email")}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="SSN"
                    placeholder="Enter SSN without dashes"
                    variant="outlined"
                    fullWidth
                    required
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      title: "numbers only",
                      maxLength: 9,
                      minLength: 9,
                    }}
                    {...register("document_ssn")}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    type="date"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true, required: true }}
                    {...register("birth_date")}
                  />
                </Grid>

                <Grid xs={12} item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </ThemeProvider>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const stateOptions = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

const arrowStyles = (base, state) => {
  let changes = {
    height: "2rem",
    marginBottom: "0.9rem",
  };
  return Object.assign(base, changes);
};
const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: yellow,
  },
});
export default App;
