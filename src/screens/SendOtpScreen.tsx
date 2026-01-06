import React, { useState } from 'react';
import { sendOtp } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SendOtpScreen = () => {
      const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
  if (mobile.length !== 10) {
    setError('Please enter a valid 10-digit mobile number');
    return;
  }




  setError('');
  setLoading(true);

  const response = await sendOtp(mobile);

  setLoading(false);

  if (response?.success === false) {
    setError(response.message || 'Failed to send OTP');
    return;
  }


// ✅ Navigate to OTP screen
navigation.navigate('VerifyOtp', { mobile });
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        Enter your mobile number to continue
      </Text>

      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
        ]}
        placeholder="Mobile Number"
        keyboardType="number-pad"
        maxLength={10}
        value={mobile}
        onChangeText={(text) => {
          setMobile(text.replace(/[^0-9]/g, ''));
          if (error) setError('');
        }}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[
  styles.button,
  mobile.length !== 10 || loading ? styles.buttonDisabled : null,
]}

        onPress={handleSendOtp}
        disabled={mobile.length !== 10 || loading}
      >
        <Text style={styles.buttonText}>
  {loading ? 'Sending...' : 'Send OTP'}
</Text>


      </TouchableOpacity>
    </View>
  );
};

export default SendOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 6,
    fontSize: 12,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
