import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../../FirebaseConfig';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';

const EventDetail = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isRSVPd, setIsRSVPd] = useState(false);
  const [rsvpDocId, setRsvpDocId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCreatedEvent, setIsCreatedEvent] = useState(false);

  // Reconstruct event object from individual params
  const event = params.title ? {
    id: params.id,
    title: params.title,
    date: params.date,
    location: params.location,
    description: params.description
  } : null;

  useEffect(() => {
    if (event?.id) {
      checkRSVPStatus();
      checkIfCreatedEvent();
    }
  }, [event?.id]);

  const checkIfCreatedEvent = async () => {
    try {
      const eventDoc = await getDocs(query(
        collection(db, 'events'),
        where('__name__', '==', event.id)
      ));
      setIsCreatedEvent(!eventDoc.empty);
    } catch (error) {
      console.error('Error checking if event is created: ', error);
    }
  };

  const checkRSVPStatus = async () => {
    try {
      const q = query(
        collection(db, 'rsvps'),
        where('eventId', '==', event.id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsRSVPd(true);
        setRsvpDocId(querySnapshot.docs[0].id);
      } else {
        setIsRSVPd(false);
        setRsvpDocId(null);
      }
    } catch (error) {
      console.error('Error checking RSVP status: ', error);
    }
  };

  const handleRSVP = async () => {
    if (loading) return;

    try {
      setLoading(true);

      if (isRSVPd && rsvpDocId) {
        // Remove RSVP
        await deleteDoc(doc(db, 'rsvps', rsvpDocId));
        setIsRSVPd(false);
        setRsvpDocId(null);
        Alert.alert('Success', 'RSVP removed successfully!');
      } else {
        // Add RSVP
        const docRef = await addDoc(collection(db, 'rsvps'), {
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
          eventLocation: event.location,
          eventDescription: event.description,
          rsvpedAt: new Date().toISOString(),
        });
        setIsRSVPd(true);
        setRsvpDocId(docRef.id);
        Alert.alert('Success', 'RSVP confirmed!');
      }
    } catch (error) {
      console.error('Error toggling RSVP: ', error);
      Alert.alert('Error', 'Failed to process RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push({
      pathname: '/events/edit',
      params: {
        id: event.id,
        title: event.title,
        date: event.date,
        location: event.location,
        description: event.description
      }
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteDoc(doc(db, 'events', event.id));
              Alert.alert('Success', 'Event deleted successfully!', [
                {
                  text: 'OK',
                  onPress: () => router.back(),
                },
              ]);
            } catch (error) {
              console.error('Error deleting event: ', error);
              Alert.alert('Error', 'Failed to delete event. Please try again.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Event Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://www.cvent.com/sites/default/files/styles/focus_scale_and_crop_800x450/public/image/2023-11/Business_Travel_Trends_Bleisure_Event-Cvent_CONNECT_2023.jpg.webp?itok=F_USbJO1' }}
          style={styles.eventImage}
        />
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Event Content */}
      <View style={styles.contentContainer}>
        {/* Event Title */}
        <Text style={styles.eventTitle}>{event.title}</Text>

        {/* Event Date & Time */}
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="calendar-blank" size={20} color="#6366F1" />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>

        {/* Event Location */}
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="map-marker" size={20} color="#6366F1" />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        {/* About Event Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map Preview Placeholder</Text>
          </View>
        </View>

        {/* Organizer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Organizer</Text>
          <View style={styles.organizerContainer}>
            <View style={styles.organizerAvatar}>
              <MaterialCommunityIcons name="account" size={24} color="#6366F1" />
            </View>
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerName}>Alex Johnson</Text>
              <Text style={styles.organizerRole}>EventFlow Management</Text>
            </View>
          </View>
        </View>

        {/* Edit and Delete Buttons - Only for Created Events */}
        {isCreatedEvent && (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={handleEdit}
              disabled={loading}
            >
              <MaterialCommunityIcons name="pencil" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
              disabled={loading}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* RSVP Button - Only for non-created events */}
        {!isCreatedEvent && (
          <TouchableOpacity
            style={[styles.rsvpButton, isRSVPd && styles.removeButton, loading && styles.disabledButton]}
            onPress={handleRSVP}
            disabled={loading}
          >
            <Text style={styles.rsvpButtonText}>
              {loading ? 'Processing...' : isRSVPd ? 'Remove' : 'RSVP / Attend'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1E293B',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  infoText: {
    color: '#E2E8F0',
    fontSize: 14,
    lineHeight: 20,
  },
  locationTextContainer: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  mapPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  mapPlaceholderText: {
    color: '#64748B',
    fontSize: 14,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  organizerAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#1E293B',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  organizerRole: {
    color: '#94A3B8',
    fontSize: 14,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#6366F1',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  rsvpButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  removeButton: {
    backgroundColor: '#EF4444',
  },
  disabledButton: {
    opacity: 0.6,
  },
  rsvpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
