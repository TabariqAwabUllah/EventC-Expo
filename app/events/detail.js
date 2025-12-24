import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EventDetail = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const event = params.event ? JSON.parse(params.event) : null;

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

        {/* RSVP Button */}
        <TouchableOpacity style={styles.rsvpButton}>
          <Text style={styles.rsvpButtonText}>RSVP / Attend</Text>
        </TouchableOpacity>
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
  rsvpButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  rsvpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
