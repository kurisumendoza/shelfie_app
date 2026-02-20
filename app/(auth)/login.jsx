import { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'expo-router';

import Spacer from '../../components/Spacer';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('email:', email, 'password:', password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Login to Your Account
        </ThemedText>

        <ThemedTextInput
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Email"
          keyBoardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <ThemedTextInput
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: '#f2f2f2' }}>Login</Text>
        </ThemedButton>

        <Spacer height={100} />
        <Link href="/register">
          <ThemedText style={{ textAlign: 'center' }}>
            Register instead
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { textAlign: 'center', fontSize: 18, marginBottom: 30 },
});
