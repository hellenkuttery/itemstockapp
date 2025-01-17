import React from "react";
import { TextField, Button } from "@mui/material";

const RegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        value={values.username}
        onChange={handleChange}
        label="Username"
        onBlur={handleBlur} // kullanıcının input alanından ayrıldığını yaklayan event
        error={touched.username && errors.username} //validationda verdiğimiz kalıba uymazsa ilgili mesajları göstermesi için errors dan gelen mesajı yakalıyoruz.
        helperText={touched.username && errors.username} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için error attribute ı benden false/true degeri bekliyor ondan dolayı daha sağlıklı olması için boolean deger döndürüyoruz.
        // touched da kullanıcının inputa tıklayıp tıklamadığını yakalıyor
        variant="outlined"
        fullWidth
        type="text"
        margin="normal"
      />
      <TextField
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.firstName && errors.firstName}
        helperText={touched.firstName && errors.firstName}
        label="First Name"
        variant="outlined"
        fullWidth
        type="text"
        margin="normal"
      />
      <TextField
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.lastName && errors.lastName}
        helperText={touched.lastName && errors.lastName}
        label="Last Name"
        variant="outlined"
        fullWidth
        type="text"
        margin="normal"
      />
      <TextField
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
        helperText={touched.email && errors.email}
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        margin="normal"
      />

      <TextField
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && errors.password}
        helperText={touched.password && errors.password}
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        margin="normal"
      />

      <Button type="submit" variant="contained" fullWidth margin="normal">
        SUBMIT
      </Button>
    </form>
  );
};

export default RegisterForm;
