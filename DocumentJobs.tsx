import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../Components/Button';
import * as ImagePicker from 'expo-image-picker';
import PhotoReviewModal from '../Components/PhotoReviewModal';

const DocumentJobs: React.FC = () => {
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState<Array<{ uri: string, timestamp: string }>>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const takePhoto = async () => {
    if(address === '') {
      Alert.alert("Enter an address first!");
      return;
    }
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      const newPhoto = {
        uri: result.assets[0].uri,
        timestamp: new Date().toLocaleString(),
      };
      setPhotos(prevPhotos => [...prevPhotos, newPhoto]);
      promptForMorePhotos();
    } else {
      setModalVisible(true);
    }
  };

  const promptForMorePhotos = () => {
    Alert.alert(
      'Take another photo?',
      '',
      [
        { text: 'No', onPress: () => setModalVisible(true) },
        { text: 'Yes', onPress: () => takePhoto() },
      ],
      { cancelable: false }
    );
  };

  const handleReplacePhoto = async (index: number) => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      const newPhoto = {
        uri: result.assets[0].uri,
        timestamp: new Date().toLocaleString(),
      };
      const updatedPhotos = [...photos];
      updatedPhotos[index] = newPhoto;
      setPhotos(updatedPhotos);
    } else {
      setModalVisible(true);
    }
  };

  const handleDeletePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const handleAddPhoto = () => {
    takePhoto();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <Button text="Take Photo(s)" onPress={takePhoto} color="#007bff" />
      <PhotoReviewModal
        visible={modalVisible}
        photos={photos}
        address={address}
        onClose={() => {
                        setModalVisible(false);
                        setPhotos([]);
        }}
        onReplace={handleReplacePhoto}
        onDelete={handleDeletePhoto}
        onAdd={handleAddPhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background color
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#f0f0f0', // Light grey background color for the input container
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default DocumentJobs;
