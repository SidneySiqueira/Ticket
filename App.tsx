import React from 'react';
import { AppRegistry } from 'react-native';
import { AppRoutes } from './src/routes';

export default function App() {
  return (
    <AppRoutes />
  );
}

AppRegistry.registerComponent('Ticket', () => App);