import styled from "styled-components/native";

export const Container = styled.View`
  width: 90%;
  min-height: 300px;
  margin: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: #ffffff;
`;

export const TicketImage = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  text-align: center;
`;

export const BoldText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
