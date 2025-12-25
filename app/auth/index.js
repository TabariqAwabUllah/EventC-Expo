import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
    //login screen
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const Router = useRouter()
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        {/* <MaterialCommunityIcons name="Calendar" size={60} color="#6366F1" /> */}
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="email-outline" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="john.doe@example.com"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="lock-outline" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={()=> {Router.replace('../(tabs)')}}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => {Router.push('/auth/SignUp')}}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
    backgroundColor: '#6366F1',
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#6366F1',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  signUpLink: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
});
