import { View, Text, Vibration, StyleSheet, Modal, Pressable } from 'react-native'
import React from 'react'
import { useEffect } from 'react';

const ModalMsj =({ msg, modalVisible, setVisibleModal, success }) =>{

    useEffect(() => {
        if (modalVisible) {
            Vibration.vibrate();
        }
    }, [modalVisible])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setVisibleModal(!modalVisible);
                }}>
                <View >
                    {success ? (
                        <View style={styles.modalViewSuccess}>
                            <Text style={styles.modalText}>{msg}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setVisibleModal(!modalVisible)}>
                                <Text style={styles.textStyle}>Cerrar modal</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.modalViewError}>
                            <Text style={styles.modalText}>{msg}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setVisibleModal(!modalVisible)}>
                                <Text style={styles.textStyle}>Cerrar modal</Text>
                            </Pressable>
                        </View>
                    )}

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalViewSuccess: {
        margin: 20,
        backgroundColor: 'green',
        borderRadius: 20,
        padding: 35,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalViewError: {
        margin: 20,
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'black',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        color: 'white',
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModalMsj