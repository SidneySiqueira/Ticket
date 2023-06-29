import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo, Feather } from '@expo/vector-icons';
import { Provider, useSelector } from 'react-redux';

import Login from '../pages/Login';
import MyEvents from '../pages/Dashboard';
import SearchEvents from '../pages/SearchEvents';
import Cart from '../pages/Cart';
import AdminPage from '../pages/AdminPage';
import store, { RootState } from '../redux/store';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  const { user } = useSelector((state: RootState) => state.isLogger);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#3260cb', borderTopColor: '#3260cb' },
        tabBarActiveTintColor: '#f4c10a',
        tabBarInactiveTintColor: '#cccccc',
        tabBarLabelStyle: { fontSize: 10 },
      }}
    >
      <Tabs.Screen
        name="Meus Eventos"
        component={MyEvents}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Entypo name="home" size={size + 5} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Procurar Eventos"
        component={SearchEvents}
        options={{
          tabBarLabel: 'Procurar',
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Feather name="search" size={size + 5} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Carrinho"
        component={Cart}
        options={{
          tabBarLabel: 'Carrinho',
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Entypo name="shopping-cart" size={size + 5} color={color} />,
        }}
      />
      {user.isAdmin && (
        <Tabs.Screen
          name="Adicionar eventos"
          component={AdminPage}
          options={{
            tabBarLabel: 'Admin',
            headerShown: false,
            tabBarIcon: ({ size, color }) => <Feather name="user" size={size + 5} color={color} />,
          }}
        />
      )}
    </Tabs.Navigator>
  );
};

export function AppRoutes() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3260cb',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Login" component={Login} options={{ title: 'Tickets' }} />
          <Stack.Screen name="Home" component={MainTabs} options={{ title: 'Tickets', headerBackVisible: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
