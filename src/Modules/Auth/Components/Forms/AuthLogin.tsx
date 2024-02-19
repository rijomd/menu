import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Grid, IconButton, Typography} from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";

import { AnimateButton } from "Components/Extend/AnimateButton";
import { FormTextField } from "Components/FormElements/FormTextField";
import { FormButtonField } from "Components/FormElements/FormButtonField";


export const AuthLogin = ({ handleSubmit }: { handleSubmit: (data: any) => any; }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container direction="column" justifyContent="center">
        <Formik
          initialValues={{
            email: "Admin@gmail.com",
            password: "Admin@7034",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid item xs={12} sx={{ marginTop: "10px" }}>
                <FormTextField
                  id="outlined-adornment-email-login"
                  label="Email Address"
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  fullWidth={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={true}
                  error={{
                    isError: Boolean(touched.email && errors.email),
                    errorMsg: errors.email,
                  }}
                  value={values.email}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: "10px" }}>
                <FormTextField
                  id="outlined-adornment-password-login"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth={true}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required={true}
                  error={{
                    isError: Boolean(touched.password && errors.password),
                    errorMsg: errors.password,
                  }}
                  value={values.password}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                />
              </Grid>

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <FormButtonField
                    disabled={isSubmitting}
                    fullWidth
                    type="submit"
                  >
                    Sign in
                  </FormButtonField>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
      </Grid>
    </>
  );
};
