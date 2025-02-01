import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../AuthContext";

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    console.log("Logged out");
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
      }
    };
    checkLogin();
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
