import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/regi.avif";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import AuthHeader from "../components/AuthHeader";
import AuthImage from "../components/AuthImage";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuthCall from "../hook/useAuthCall";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const { register } = useAuthCall();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Kullanıcı adı 5 karakterden az olamaz")
      .max(50, "Kullanıcı adı 50 karakterden fazla olamaz")
      .required("Kullanıcı adı zorunludur"),
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("Email adresinde @ işareti olmalıdır")
      .required("Bu alan zorunludur"),
    password: Yup.string()
      .min(8, "Password 8 karakterdn fazla olmalıdır")
      .matches(/[a-z]/, "Şifre küçük harf içermelidir")
      .matches(/[A-Z]/, "Şifre büyük hark içermelidir")
      .matches(/\d+/, "Şifre sayısal karakter içermelidir.")
      .matches(/[@$?!%&*]+/, "Özel karakter içermelidir(@$?!%&*)"),
  });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <AuthHeader />

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          {/* /* -------------------------------------------------------------------------- */}
          {/* FORMİK YAPISI */}

          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values,actions) => {
              register(values)
              // actşons değeri formikden gelen metodları içerir , resetForm, setSubmitting,...
              // Formun text alanaları temizlenmesi için resetForm
              // submit işlemi bittiği için setSubmitting(false) yapıyoruz.
              actions.resetForm()
              actions.setSubmitting(false)
            }}

            component={(props)=> <RegisterForm  {...props} /> }
          />
     
         

          {/* /* -------------------------------------------------------------------------- */}
          <Box sx={{ textAlign: "center", mt: 2, color: "secondary.main" }}>
            <Link to="/">Already have an account? Sign in</Link>
          </Box>
        </Grid>

        <AuthImage image={image} />
      </Grid>
    </Container>
  );
};

export default Register;
