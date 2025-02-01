import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // Import the context

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { token, logout } = useContext(AuthContext); // Get the token from context

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://192.168.3.161:3000/posts", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token from context
          },
        });
        setPosts(response.data); // Set the fetched posts
      } catch (error) {
        console.log("Error fetching posts:", error.response.data);
      }
    };

    fetchPosts();
  }, [token]);

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

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;
