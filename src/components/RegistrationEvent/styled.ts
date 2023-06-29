import styled from "styled-components/native";
import { TextInput as PaperTextInput, RadioButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View`
  width: 90%;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const Label = styled.Text`
  font-size: 20px;
  color: gray;
  text-align: left;
`;

export const Input = styled(PaperTextInput)`
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
`;

export const InputPrice = styled(TextInputMask)`
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

export const CustomButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 30px;
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