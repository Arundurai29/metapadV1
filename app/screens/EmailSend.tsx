import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const VerificationScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleGenerateOTP = () => {
    console.log('Generating OTP...');
    fetch('https://extreme-deadpan-border.glitch.me/api/generateOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data);
        setVerificationMessage(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleVerifyOTP = () => {
    fetch('https://extreme-deadpan-border.glitch.me/api/verifyOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })
      .then(response => response.json())
      .then(data => {
        setVerificationMessage(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View>
       <Button title="Verify OTP"  />
       <Button title="Verify OTP" />
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Button title="Generate OTP" onPress={handleGenerateOTP} />
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={text => setOtp(text)}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
      <Text>{verificationMessage}</Text>
    </View>
  );
};

export default VerificationScreen;
