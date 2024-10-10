import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MyComponent = ({ navigation }) => {
  const friendsData = [
    { name: "Sophia G.", isOnline: true },
    { name: "Liam H.", isOnline: false },
    { name: "Oliver K.", isOnline: true },
    { name: "Grace W.", isOnline: false },
    { name: "Chloe D.", isOnline: true },
  ];

  const usersNearYou = [
    {
      name: "Aurora",
      age: 28,
      distance: "30m",
      image: require("../Images/profile-pic.png"),
    },
    {
      name: "Evelyn",
      age: 26,
      distance: "500m",
      image: require("../Images/profile-pic.png"),
    },
    {
      name: "Grace",
      age: 23,
      distance: "10m",
      image: require("../Images/profile-pic.png"),
    },
    {
      name: "Elijah",
      age: 32,
      distance: "90m",
      image: require("../Images/profile-pic.png"),
    },
  ];

  const isUserOnline = true;

  const handleViewMore = () => {
    navigation.navigate("UsersList");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.leftSection}>
            <View style={styles.profileContainer}>
              <Image
                source={require("../Images/profile-pic.png")}
                style={styles.profileImage}
              />
              {isUserOnline && <View style={styles.statusIndicator} />}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>Cesar Lopez</Text>
              <Text style={styles.welcomeText}>Welcome back</Text>
            </View>
          </View>
          <View style={styles.rightSection}>
            <Ionicons name="menu" size={24} color="black" />
            <Ionicons
              name="notifications-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Find your people"
            placeholderTextColor="#777"
          />
        </View>
        {/* Friends Online Section */}
        <View style={styles.friendsContainer}>
          <Text style={styles.friendsTitle}>Friends Online</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {friendsData.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={require("../Images/profile-pic.png")}
                    style={styles.friendAvatar}
                  />
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: friend.isOnline ? "green" : "grey" },
                    ]}
                  />
                </View>
                <Text style={styles.friendName}>{friend.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Users Near You Section */}
        <View style={styles.nearYouContainer}>
          <Text style={styles.nearYouTitle}>Near You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {usersNearYou.map((user, index) => (
              <View key={index} style={styles.userCard}>
                <Image source={user.image} style={styles.userImage} />
                <Text style={styles.userName}>
                  {user.name}, {user.age}
                </Text>
                <Text style={styles.userDistance}>
                  Distance {user.distance}
                </Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={handleViewMore}
              style={styles.viewMoreContainer}
            >
              <Text style={styles.viewMoreText}>View More</Text>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/* Recently News Section */}
        <View style={styles.recentlyNewsContainer}>
  <Text style={styles.recentlyNewsTitle}>Recently News</Text>
  <View style={styles.newsGrid}>
    <View style={styles.newsItemLarge}>
      <View style={styles.newsHeader}>
        <Text style={styles.newsItemText}>Friend's Post</Text>
        <Ionicons
          name="chevron-forward"  // Upward arrow icon
          size={20}
          color="black"
          style={styles.newsIcon}
        />
      </View>
    </View>
    <View style={styles.newsColumn}>
      <TouchableOpacity style={styles.newsItemSmall}>
        <View style={styles.newsHeader}>
          <Text style={styles.newsItemText}>Matches</Text>
          <Ionicons
            name="chevron-forward"  // Upward arrow icon
            size={20}
            color="black"
            style={styles.newsIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.newsItemSmall}>
        <View style={styles.newsHeader}>
          <Text style={styles.newsItemText}>Likes</Text>
          <Ionicons
            name="chevron-forward"  // Upward arrow icon
            size={20}
            color="black"
            style={styles.newsIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  </View>
</View>


      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Discover")}
        >
          <Ionicons name="search-outline" size={24} color="white" />
          <Text style={styles.iconLabel}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Messages")}
        >
          <Ionicons name="chatbubble-outline" size={24} color="white" />
          <Text style={styles.iconLabel}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Personality")}
        >
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.iconLabel}>Personality</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 70, // Ensures content doesn’t overlap footer
  },
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainer: {
    position: "relative",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  welcomeText: {
    fontSize: 14,
    color: "#777",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 15,
  },
  searchContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  friendsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  friendsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  friendItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  avatarContainer: {
    position: "relative",
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
  },
  friendName: {
    marginTop: 5,
    fontSize: 12,
    color: "#000",
  },
  nearYouContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  nearYouTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userCard: {
    width: 100,
    marginRight: 10,
    alignItems: "center",
  },
  userImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  userName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  userDistance: {
    fontSize: 12,
    color: "#777",
  },
  viewMoreContainer: {
    marginTop: 30,
    marginBottom: 60,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginLeft: 0,
  },
  viewMoreText: {
    fontSize: 16,
    color: "#000",
    marginRight: 5,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 12,
    color: "#fff",
    marginTop: 5,
  },
recentlyNewsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  recentlyNewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  newsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newsItemLarge: {
    width: "55%",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    height: 220,
    marginBottom: 10,
    position: "relative",
  },
  newsItemSmall: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    position: "relative",
  },
  newsColumn: {
    width: "41%",
    justifyContent: "space-between",
  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
  },
  newsItemText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  newsIcon: {
    marginTop: 5,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyComponent;
