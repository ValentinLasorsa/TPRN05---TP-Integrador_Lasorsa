import React from "react";
import {TouchableOpacity, Text, StyleSheet } from "react-native";

const botonReusable = ({ event, style, text }) => {

    const handleButton = () => {
        event();
    };
    return (
        <>
            <TouchableOpacity onPress={() => handleButton()} style={[styles.buttonContainer, style]}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: '60%',
        backgroundColor: 'rgb(25,170,250)',
        borderRadius: 2,
        paddingVertical: 12,
        marginTop: 16,
        marginBottom: 16,
        paddingBlock: 1,
        paddingInline: 6,
    },
    buttonText: {
        padding: 5,
        color:'#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
});

export default botonReusable ;