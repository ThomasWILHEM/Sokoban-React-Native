import React from 'react';
import {View, Text, Button, StyleSheet} from "react-native";

const Victory = ({ onRestart }) => {
    const handlePress = () => {
        onRestart();
    }

    return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <Text style={styles.title}>Victoire!</Text>
                <Button title="Rejouer" onPress={handlePress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    panel: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
    },
});


export default Victory;