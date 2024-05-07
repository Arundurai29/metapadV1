import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ref, get } from "firebase/database";
import { DATABASE } from "../../FireBaseConfig";

const UserDataScreen = ({ route }) => {
  const { uid } = route.params ?? {};
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uid) {
      const userRef = ref(DATABASE, `users/${uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("User data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [uid]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>User Data:</Text>
          {userData && (
            <View>
              <Text>Name: {userData.name}</Text>
              <Text>Email: {userData.email}</Text>
              {/* Add more fields as needed */}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserDataScreen;
