import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Footer = ({ navigation }) => {
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home-outline" size={24} color="white" />
                <Text style={styles.iconLabel}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Discover')}>
                <Ionicons name="search-outline" size={24} color="white" />
                <Text style={styles.iconLabel}>Discover</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Messages')}>
                <Ionicons name="chatbubble-outline" size={24} color="white" />
                <Text style={styles.iconLabel}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Personality')}>
                <Ionicons name="person-outline" size={24} color="white" />
                <Text style={styles.iconLabel}>Personality</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingTop: 20,
        paddingBottom: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute', // Fix position at the bottom
        bottom: 0, // Stick to the bottom of the screen
        width: '100%', // Ensure it spans the full width
    },
    iconContainer: {
        alignItems: 'center',
    },
    iconLabel: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },
});


export default Footer;
