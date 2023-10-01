import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ContentModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.content}>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                onClose();
              }}
            >
              <Icon name='close-circle-sharp' size={26} color='#EFEEF0' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContentModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(24, 14, 37, 0.4)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {

    backgroundColor: 'white',
    height: '60%',
    minWidth: '100%',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderColor: '#C8C5CB'
  },
  content: {
    margin: 10
  },
  closeButton: {
    position: 'absolute',
    right: 5, top: 5
  }
});
