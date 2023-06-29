import styled from "styled-components/native";

interface Props {
  purchasedEvent: boolean
}

export const Container = styled.View`
  width: 90%;
  margin: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border: 1px solid gray;
  border-radius: 10px;
`;

export const TicketImage = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const Local = styled.Text`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const Adress = styled.Text`
  font-size: 20px;
  text-align: center;
`;

export const Description = styled.Text`
  font-size: 20px;
  text-align: center;
`;

export const Infotext = styled.Text`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const CustomButton = styled.TouchableOpacity<Props>`
  width: 100%;
  background-color: ${(Props) => Props.purchasedEvent? '#cccccc' : '#007bff'};
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
`;

export const CustomButtonText = styled.Text`
  color: white;
  font-size: 25px;
  text-align: center;
`;