import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Button from './Button';
import FullScreenImageModal from './FullScreenImageModal';

interface PhotoReviewModalProps {
  visible: boolean;
  photos: Array<{ uri: string; timestamp: string }>;
  address: string;
  onClose: () => void;
  onReplace: (index: number) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
}

const PhotoReviewModal: React.FC<PhotoReviewModalProps> = ({ visible, photos, address, onClose, onReplace, onDelete, onAdd }) => {
  const [isFullScreenVisible, setFullScreenVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const openFullScreen = (photo: string) => {
    setSelectedPhoto(photo);
    setFullScreenVisible(true);
  };

  const closeFullScreen = () => {
    setFullScreenVisible(false);
    setSelectedPhoto(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{address}</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <TouchableOpacity onPress={() => openFullScreen(photo.uri)}>
                  <Image source={{ uri: photo.uri }} style={styles.photo} />
                </TouchableOpacity>
                <Text style={styles.timestamp}>{photo.timestamp}</Text>
                <View style={styles.buttonContainer}>
                  <Button text="Replace" onPress={() => onReplace(index)} color="#2196F3" />
                  <Button text="Delete" onPress={() => onDelete(index)} color="#f44336" />
                </View>
              </View>
            ))}
          </ScrollView>
          <Button text="Add New Photo" onPress={onAdd} color="#4CAF50" style={styles.buttonSpacing} />
          <Button text="Confirm and Save" onPress={() => {}} color="#4CAF50" style={styles.buttonSpacing} />
          <Button text="Cancel and Close" onPress={onClose} color="#f44336" style={styles.buttonSpacing} />
        </View>
      </View>
      {selectedPhoto && (
        <FullScreenImageModal
          visible={isFullScreenVisible}
          imageUrl={selectedPhoto}
          onClose={closeFullScreen}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  scrollView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#e0e0e0', // Grey background color
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    padding: 10,
  },
  photo: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  timestamp: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonSpacing: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PhotoReviewModal;
