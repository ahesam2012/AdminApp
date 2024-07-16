import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, Alert } from 'react-native';
import Button from './Button';
import PhotoModal from './PhotoModal';
import EditPhotoModal from './EditPhotoModal';

interface AddressItemProps {
  address: string;
  timestamp: string;
  imageUrlThumbnail: string;
  photos: string[];
  onUpload: () => void;
}

const screenWidth = Dimensions.get('window').width;

const AddressItem: React.FC<AddressItemProps> = ({ imageUrlThumbnail, address, timestamp, photos, onUpload }) => {
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;



  const handleDeleteWholeAddress = () => {
    // Handles deleting here.
    
    const eradicate = () => {
      // Deletes here
      console.log("Handles big time deletes here..");
    }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: eradicate },
      ],
      { cancelable: true }
    );

  }

  const jiggle = () => {
    Animated.sequence([
      Animated.timing(animation, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(animation, { toValue: -1, duration: 100, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const jiggling = animation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  return (
    <TouchableWithoutFeedback onPress={jiggle}>
      <Animated.View style={[styles.container, { transform: [{ rotate: jiggling }] }]}>
        <Image source={{ uri: imageUrlThumbnail }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
          <View style={styles.buttonContainer}>
            <Button text="View" onPress={() => setViewModalVisible(true)} color="#007bff" />
            <Button text="Upload" onPress={onUpload} color="#28a745" />
            <Button text="Edit" onPress={() => setEditModalVisible(true)} color="#ffc107" />
          </View>
          <Button text="Delete" onPress={handleDeleteWholeAddress} color="#f44336" style={styles.deleteButton} />
        </View>

        <PhotoModal
          visible={isViewModalVisible}
          photos={photos.map(url => ({ url, timestamp }))}
          address={address}
          onClose={() => setViewModalVisible(false)}
        />

        <EditPhotoModal
          visible={isEditModalVisible}
          photos={photos.map(url => ({ url, timestamp }))}
          address={address}
          onClose={() => setEditModalVisible(false)}
          onReplace={(index) => {
            // Handle replace logic here
          }}
          onDelete={(index) => {
            // Handle delete logic here
          }}
          onAdd={() => {
            // Handle add logic here
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    width: screenWidth - 32, // 16 padding on both sides
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  address: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    marginTop: 10, // Add margin to space out from the previous buttons
  },
});

export default AddressItem;
