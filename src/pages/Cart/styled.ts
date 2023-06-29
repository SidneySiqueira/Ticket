import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  padding: 16px;
  background-color: transparent;
`;

export const BoxEvents = styled.View`
  width: 100%;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: white;
`;

export const BoxTotal = styled.View`
  width: 100%;
  margin-top: 30px;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-top-width: 1px;
  border-top-color: black;
`;

export const Title = styled.Text`
  font-size: 20px;
`;

export const Price = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const CustomButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #007bff;
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
`;

export const CustomButtonText = styled.Text`
  color: white;
  font-size: 25px;
  text-align: center;
`;

export const Empty = styled.Text`
  font-size: 50px;
  background-color: transparent;
`;

export const RemoveButton = styled.Text`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 30px;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 40px;
`;
