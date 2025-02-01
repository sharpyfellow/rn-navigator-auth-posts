import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // Import the context

export default function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useContext(AuthContext); // Get the token from context

  const handleCreatePost = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    console.log("Token:", token); // Log the token
    console.log("Request Data:", { title, description }); // Log the request data

    try {
      const response = await axios.post(
        "http://192.168.3.161:3000/posts", // Replace with your machine's IP address
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token from context
          },
        }
      );
      console.log("Response:", response.data); // Log the response data
      Alert.alert("Success", "Post created successfully");
      navigation.navigate("Home");
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response.data); // Log the server error response
        Alert.alert(
          "Error",
          error.response.data.error || "Something went wrong"
        );
      } else {
        console.log("Error:", error.message); // Log any other errors
        Alert.alert("Error", "Something went wrong");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
