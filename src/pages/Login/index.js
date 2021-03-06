import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axiosInstance from '../../axios.config';

import contactUsSchema, { fieldSchema } from './contactus_validate';
import Input from '../../components/Input';
class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    error: '',
  };

  handleChange = (e) => {
    const { value, name } = e.target;

    const validate = () => {
      fieldSchema(name)
        .validate(value)
        .then(() => {
          console.log('valid');
          this.setState((prevState) => {
            const { errors } = prevState;
            return { errors: { ...errors, [name]: '' } };
          });
        })
        .catch((err) => {
          console.log('in valid');

          this.setState((prevState) => {
            const { errors } = prevState;
            return { errors: { ...errors, [name]: err.message } };
          });
        });
    };

    this.setState({ [name]: value }, validate);
  };

  validateForm = (data) => {
    contactUsSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        console.log('valid');
        this.setState({ errors: {}, error: '' });
      })
      .catch((err) => {
        console.log('in valid');
        console.log(err.inner);
        const errors = {};
        err.inner.forEach(({ message, params }) => {
          errors[params.path] = message;
        });
        this.setState({ errors, error: 'check the fields above' });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, bday, error } = this.state;
    this.validateForm({ username, email, password, bday });
    const axios = axiosInstance();
    if (!error) {
      axios
        .post('/auth/login', {
          email,
          password,
        })
        .then((res) => {
          const user = res.data;
          console.log(user);
          this.props.handleLogin(user);
          console.log(this.props.history);
          this.props.history.push('/home');
        })
        .catch((err) => {
          console.log(err.response.data.error);
          let error = err.response.data.error;
          if (error.includes('duplicate')) {
            error = 'Email already exists';
          }
          this.setState({ error });
        });
    }
  };

  render() {
    const { email, password, errors, error } = this.state;
    console.log(this.props.location.state);

    return (
      <div className="App">
        <form action="#" onSubmit={this.handleSubmit}>
          <Input
            type="email"
            labelTxt="email"
            name="email"
            value={email}
            handleChange={this.handleChange}
            error={errors.email}
          />
          <Input
            type="password"
            labelTxt="password"
            name="password"
            value={password}
            handleChange={this.handleChange}
            error={errors.password}
          />
          <button type="submit">login</button>
          {error && <span>{error}</span>}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
// export default Login;
