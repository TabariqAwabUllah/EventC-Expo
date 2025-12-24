import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const AddEvent = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    // Basic validation
    if (!capacity || isNaN(capacity) || parseInt(capacity) <= 0) {
      setError('Capacity must be a positive number.');
      return;
    }
    setError('');
    // Handle save logic here
    console.log('Event saved');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Event</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Event Title */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Annual Tech Conference"
            placeholderTextColor="#6B7280"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us more about your event..."
            placeholderTextColor="#6B7280"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Date */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="calendar" size={20} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="2024-12-25"
              placeholderTextColor="#6B7280"
              value={date}
              onChangeText={setDate}
            />
          </View>
        </View>

        {/* Time */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="18:00"
              placeholderTextColor="#6B7280"
              value={time}
              onChangeText={setTime}
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="e.g., City Convention Center"
              placeholderTextColor="#6B7280"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Capacity */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Capacity</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="account-group" size={20} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="e.g., 500"
              placeholderTextColor="#6B7280"
              value={capacity}
              onChangeText={setCapacity}
              keyboardType="numeric"
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Image Upload */}
        <TouchableOpacity style={styles.uploadContainer}>
          <MaterialCommunityIcons name="image-outline" size={48} color="#6B7280" />
          <Text style={styles.uploadText}>Tap to upload image</Text>
          <Text style={styles.uploadSubtext}>PNG, JPG, up to 5MB</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    height: 56,
    color: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
  },
  inputWithIcon: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  uploadContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#334155',
    borderStyle: 'dashed',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  uploadSubtext: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
