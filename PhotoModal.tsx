import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import FullScreenImageModal from './FullScreenImageModal';
import Button from './Button';

interface PhotoModalProps {
  visible: boolean;
  photos: Array<{ url: string; timestamp: string }>;
  address: string;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ visible, photos, address, onClose }) => {
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <TouchableOpacity onPress={() => openFullScreen(photo.url)}>
                  <Image source={{ uri: photo.url }} style={styles.photo} />
                </TouchableOpacity>
                <Text style={styles.timestamp}>{photo.timestamp}</Text>
              </View>
            ))}
          </ScrollView>
          <Button text="Close" onPress={onClose} color="#2196F3" />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    margin: 10,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PhotoModal;
