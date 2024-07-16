import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AddressItem from '../Components/AddressItem';

let testImage = "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg";

const CompletedJobs: React.FC<{ numItems: number }> = ({ numItems }) => {
  const jobs = [
    { address: '123 Main St', timestamp: '2024-07-01 12:34', imageUrls: [testImage] },
    { address: '456 Elm St', timestamp: '2024-07-02 14:56', imageUrls: [testImage, testImage] },
    { address: '789 Maple Ave', timestamp: '2024-07-03 09:12', imageUrls: [testImage, testImage, testImage] },
  ];

  const handleUpload = (index: number) => {
    console.log(`Upload photos for job ${index}`);
  };

  const handleDelete = () => {
    console.log("handling delete here..");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {jobs.slice(0, numItems).map((job, index) => (
          <AddressItem
            key={index}
            address={job.address}
            timestamp={job.timestamp}
            imageUrlThumbnail={job.imageUrls[0]}
            photos={job.imageUrls}
            onUpload={() => handleUpload(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
});

export default CompletedJobs;
