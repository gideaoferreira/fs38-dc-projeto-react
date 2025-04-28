import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";

const initialAddressValues = {
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    country: '',
    zipcode: ''
}

const initialValues = {
    name: '',
    email: '',
    birthdate: '',
    cpf: '',
    phone: '',
    address: initialAddressValues,
    password: '',
};

function Register() {
    const navigate = useNavigate()

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    fetch("http://localhost:3000/register", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            navigate('/login')
                        });
                }}
                validate={(values) => {
                    const errors = {};

                    if (!values.name) {
                        errors.name = "Nome é obrigatório"
                    }

                    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,255}$/gm
                    const passwordIsValid = passwordRegex.test(values.password);
                
                    if (!passwordIsValid) {
                        errors.password = 'A senha não é válida'
                    }

                    return errors;
                }}  
            >
                <Form className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-8">

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <Field 
                                    type="text" 
                                    className="form-control" 
                                    id="name"
                                    name="name"
                                    placeholder="João Doe"
                                />
                                <ErrorMessage name="name" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="birthdate" className="form-label">Data de nascimento</label>
                                <Field 
                                    type="date" 
                                    className="form-control" 
                                    id="birthdate"
                                    name="birthdate"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <Field 
                                    type="email" 
                                    className="form-control" 
                                    id="email"
                                    name="email"
                                    placeholder="email@gmail.com"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <Field 
                                    type="password"
                                    className="form-control" 
                                    id="password"
                                    name="password"
                                    placeholder="*********"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-primary" type="submit">
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default Register