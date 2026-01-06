import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { verifyOtp } from '../services/api';
import { resendOtp } from '../services/api';
import SmsRetriever from 'react-native-sms-retriever';




type VerifyOtpRouteProp = RouteProp<RootStackParamList, 'VerifyOtp'>;

const VerifyOtpScreen = () => {
  const route = useRoute<VerifyOtpRouteProp>();
  const { mobile } = route.params;

  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const inputs = useRef<(TextInput | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);


  // Auto-submit when OTP is complete (API will come next step)
useEffect(() => {
  if (otp.every(digit => digit !== '')) {
    const finalOtp = otp.join('');
    submitOtp(finalOtp);
  }
}, [otp]);

useEffect(() => {
  let interval: ReturnType<typeof setInterval> | null = null;

  if (timer > 0) {
    interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [timer]);


useEffect(() => {
  const startSmsListener = async () => {
    try {
      await SmsRetriever.startSmsRetriever();

      SmsRetriever.addSmsListener(event => {
        const message = event.message;

        if (!message) return;

        // Extract 4-digit OTP from SMS
        const otpMatch = message.match(/\b\d{4}\b/);


        if (otpMatch) {
          const code = otpMatch[0].split('');
          setOtp(code);
        }

        SmsRetriever.removeSmsListener();
      });
    } catch (error) {
      // Graceful fallback (manual entry)
      console.log('SMS Retriever failed:', error);
    }
  };

  startSmsListener();

  return () => {
    SmsRetriever.removeSmsListener();
  };
}, []);



const handleChange = (text: string, index: number) => {
  if (!/^\d?$/.test(text)) return;

  if (error) setError('');

  const newOtp = [...otp];
  newOtp[index] = text;
  setOtp(newOtp);

  if (text && index < 3) {
    inputs.current[index + 1]?.focus();
  }
};


const submitOtp = async (finalOtp: string) => {
  if (loading) return;

  setLoading(true);
  setError('');

  const response = await verifyOtp(mobile, finalOtp);

  setLoading(false);

  if (response?.success === false) {
    setError(response.message || 'Invalid OTP');
    return;
  }

  // ✅ OTP verified successfully
  console.log('OTP verified successfully');
};


const handleResendOtp = async () => {
  if (timer > 0 || resendLoading) return;

  setResendLoading(true);
  setError('');

  const response = await resendOtp(mobile);

  setResendLoading(false);

  if (response?.success === false) {
    setError(response.message || 'Failed to resend OTP');
    return;
  }

  // Reset OTP fields
  setOtp(['', '', '', '']);
  inputs.current[0]?.focus();

  // Restart timer
  setTimer(60);
};


  const handleBackspace = (key: string, index: number) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to {mobile}
      </Text>
<View style={styles.resendContainer}>
  <Text
    style={[
      styles.resendText,
      timer > 0 ? styles.resendDisabled : null,
    ]}
    onPress={handleResendOtp}
  >
    {timer > 0
      ? `Resend OTP in ${timer}s`
      : resendLoading
      ? 'Resending...'
      : 'Resend OTP'}
  </Text>
</View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
                ref={(ref) => {
                inputs.current[index] = ref;
                }}
            style={[
              styles.otpInput,
              error ? styles.otpError : null,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleBackspace(nativeEvent.key, index)
            }
          />
        ))}
      </View>
      

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
    
  );
};

export default VerifyOtpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
  },
  otpError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    fontSize: 12,
  },
  resendContainer: {
  marginTop: 24,
  alignItems: 'center',
},
resendText: {
  fontSize: 14,
  color: '#000',
},
resendDisabled: {
  color: '#999',
},

});
