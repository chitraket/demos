import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const FormScreen = () => {
  const insets = useSafeAreaInsets();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    errors: {
      name: '',
      email: '',
      password: '',
    },
  });

  const validateName = (name: string) => {
    if (!name) {
      return 'Name is required';
    }
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    } else if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleChange = (key: string, value: string) => {
    setFormState(prevState => {
      const updatedState = {...prevState, [key]: value};

      // Validate the input
      let errorMessage = '';
      if (key === 'name') {
        errorMessage = validateName(value);
      } else if (key === 'email') {
        errorMessage = validateEmail(value);
      } else if (key === 'password') {
        errorMessage = validatePassword(value);
      }

      return {
        ...updatedState,
        errors: {...prevState.errors, [key]: errorMessage},
      };
    });
  };

  const handleSubmit = () => {
    const {name, email, password} = formState;

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      setFormState(prevState => ({
        ...prevState,
        errors: {
          name: nameError,
          email: emailError,
          password: passwordError,
        },
      }));
      return;
    }
  };

  const {name, email, password, errors} = formState;

  return (
    <View
      style={{
        paddingLeft: Math.max(Number(insets?.left), 15),
        paddingRight: Math.max(Number(insets?.right), 15),
        paddingTop: Math.max(Number(insets?.top), 15),
        paddingBottom: Math.max(Number(insets?.bottom), 15),
      }}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => handleChange('name', text)}
      />
      {errors?.name && <Text style={styles.errorText}>{errors?.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => handleChange('email', text)}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => handleChange('password', text)}
        secureTextEntry
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={
          Boolean(errors.name) ||
          Boolean(errors.email) ||
          Boolean(errors.password)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FormScreen;
