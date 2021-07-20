import {StyleSheet} from 'react-native';

export const LoginStyle = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    alignItems: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },

  label: {
    marginTop: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputField: {
    color: '#fff',
    fontSize: 20,
  },
  inputfieldIOS: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});
