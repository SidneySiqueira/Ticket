import styled from "styled-components/native";
import { TextInput as PaperTextInput, RadioButton } from 'react-native-paper';
import { TextInputMask } from "react-native-masked-text";

export const Container = styled.View`
  width: 90%;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const Input = styled(PaperTextInput)`
  width: 100%;
  margin: 10px;
  background-color: white;
`;

export const CustomButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
`;

export const CustomButtonText = styled.Text`
  color: white;
  font-size: 25px;
  text-align: center;
`;

export const AlertError = styled.Text`
  color: red;
  font-size: 16px;
  text-align: left;
`;

export const InputPhone = styled(TextInputMask)`
  width: 100%;
  padding: 16px;
  margin-bottom: 10px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;