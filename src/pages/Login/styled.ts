import styled from "styled-components/native";

interface Props {
  error: boolean
}

export const Container = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const TicketImage = styled.Image`
  width: 150px;
  height: 150px;
  margin-top: 30%;
  margin-bottom:20px;
`;

export const Input = styled.TextInput<Props>`
  width: 100%;
  height: 70px;
  border-color: ${(props) => props.error? "red" : "gray"};
  border-width: 1px;
  margin-bottom: 12px;
  padding-left: 8px;
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

export const Alert = styled.Text`
  color: red;
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
`;

export const Register = styled.View`
  margin: 20px;
`;

export const TextRegister = styled.Text`
  color: red;
  font-size: 20px;
  text-align: center;
`;
