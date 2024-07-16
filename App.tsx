import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, useColorScheme, StatusBar, Text, TouchableOpacity } from 'react-native';
import DocumentJobs from './Screens/DocumentJobs';
import CompletedJobs from './Screens/CompletedJobs';
import UploadStatus from './Screens/UploadStatus';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [numItems, setNumItems] = useState(10);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Document Jobs') {
                return <Entypo name="video-camera" size={24} color="black" />
              } else if (route.name === 'Completed Jobs') {
                return <FontAwesome6 name="building-circle-check" size={24} color="black" />
              } else {
                return <AntDesign name="checkcircle" size={24} color="black" />
              }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#fff', // Keep bottom tab background white
            },
            headerRight: () => (
              <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => setShowPicker(!showPicker)} style={styles.filterButton}>
                  <Text style={styles.filterLabel}>Show Options</Text>
                </TouchableOpacity>
                {showPicker && (
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={numItems}
                      style={styles.picker}
                      onValueChange={(itemValue) => setNumItems(itemValue)}
                      mode="dropdown"
                    >
                      <Picker.Item label="1" value={1} style={styles.pickerItem} />
                      <Picker.Item label="10" value={10} style={styles.pickerItem} />
                      <Picker.Item label="20" value={20} style={styles.pickerItem} />
                      <Picker.Item label="30+" value={30} style={styles.pickerItem} />
                    </Picker>
                  </View>
                )}
              </View>
            ),
          })}
        >
          <Tab.Screen name="Document Jobs" component={DocumentJobs} />
          <Tab.Screen name="Completed Jobs">
            {(props) => <CompletedJobs {...props} numItems={numItems} />}
          </Tab.Screen>
          <Tab.Screen name="Upload Status" component={UploadStatus} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#fff', // White background color
    borderTopColor: '#000', // Black top border color
    borderTopWidth: 1,
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#000', // Black background color
    borderTopColor: '#fff', // White top border color
    borderTopWidth: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10, // Ensure it's above other content
  },
  filterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 14,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 100,
    elevation: 5,
  },
  picker: {
    width: '100%',
  },
  pickerItem: {
    color: '#000', // Ensures the text color is black
    backgroundColor: '#fff', // Ensures the background color is white
  },
});

export default App;
