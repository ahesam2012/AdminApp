import React from 'react';
import { View, Modal, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Button from './Button';

interface FullScreenImageModalProps {
  visible: boolean;
  imageUrl: string;
  onClose: () => void;
}

const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <Image source={{ uri: imageUrl }} style={styles.fullScreenImage} />
        <Button text="Close" onPress={onClose} color="#f44336" style={styles.closeButton} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  fullScreenImage: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});

export default FullScreenImageModal;
