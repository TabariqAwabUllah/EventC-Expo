import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../../FirebaseConfig';

const EditEvent = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-fill form with existing event data
    if (params.title) setTitle(params.title);
    if (params.description) setDescription(params.description);
    if (params.date) setDate(params.date);
    if (params.time) setTime(params.time);
    if (params.location) setLocation(params.location);
    if (params.capacity) setCapacity(params.capacity);
  }, [params]);

  const handleUpdate = async () => {
    // Reset error
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Event title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }
    if (!date.trim()) {
      setError('Date is required.');
      return;
    }
    if (!time.trim()) {
      setError('Time is required.');
      return;
    }
    if (!location.trim()) {
      setError('Location is required.');
      return;
    }
    if (!capacity || isNaN(capacity) || parseInt(capacity) <= 0) {
      setError('Capacity must be a positive number.');
      return;
    }

    try {
      setLoading(true);

      // Update event in Firestore
      await updateDoc(doc(db, 'events', params.id), {
        title: title.trim(),
        description: description.trim(),
        date: date.trim(),
        time: time.trim(),
        location: location.trim(),
        capacity: parseInt(capacity),
        updatedAt: new Date().toISOString(),
      });

      // Show success message
      Alert.alert('Success', 'Event updated successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (err) {
      console.error('Error updating event: ', err);
      setError('Failed to update event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Event</Text>
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

        {/* General Error Message */}
        {error && !error.includes('Capacity') ? (
          <View style={styles.generalErrorContainer}>
            <Text style={styles.generalErrorText}>{error}</Text>
          </View>
        ) : null}

        {/* Image Upload */}
        {/* <TouchableOpacity style={styles.uploadContainer}>
          <MaterialCommunityIcons name="image-outline" size={48} color="#6B7280" />
          <Text style={styles.uploadText}>Tap to upload image</Text>
          <Text style={styles.uploadSubtext}>PNG, JPG, up to 5MB</Text>
        </TouchableOpacity> */}

        {/* Update Button */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Updating...' : 'Update Event'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditEvent;

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
  saveButtonDisabled: {
    backgroundColor: '#4F46E5',
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  generalErrorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  generalErrorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
  },
});
