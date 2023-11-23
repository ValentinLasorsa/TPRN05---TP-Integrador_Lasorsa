import React from "react";
import {TouchableOpacity, Text, StyleSheet } from "react-native";

/*
<Button title={text} onPress={onPress} style={[styles.buttonContainer, style]} />
*/
const ReusableButton = ({ event, style, text }) => {

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
        width: '40%',
        backgroundColor: 'rgb(33,150,243)',
        borderRadius: 2,
        paddingVertical: 12,
        marginTop: 15,
        marginBottom: 15,
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

export default ReusableButton ;