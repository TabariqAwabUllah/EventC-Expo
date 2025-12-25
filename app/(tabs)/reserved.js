import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../FirebaseConfig';

const Reserved = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Refresh when tab is focused
  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsData = [];

      // Fetch created events
      const createdEventsQuery = query(
        collection(db, 'events'),
        orderBy('createdAt', 'desc')
      );
      const createdSnapshot = await getDocs(createdEventsQuery);

      createdSnapshot.forEach((doc) => {
        const data = doc.data();
        eventsData.push({
          id: doc.id,
          title: data.title,
          date: `${data.date} at ${data.time}`,
          location: data.location,
          description: data.description,
          type: 'created',
          timestamp: data.createdAt
        });
      });

      // Fetch RSVP'd events
      const rsvpQuery = query(
        collection(db, 'rsvps'),
        orderBy('rsvpedAt', 'desc')
      );
      const rsvpSnapshot = await getDocs(rsvpQuery);

      rsvpSnapshot.forEach((doc) => {
        const data = doc.data();
        eventsData.push({
          id: data.eventId,
          title: data.eventTitle,
          date: data.eventDate,
          location: data.eventLocation,
          description: data.eventDescription,
          type: 'rsvp',
          rsvpId: doc.id,
          timestamp: data.rsvpedAt
        });
      });

      // Sort by timestamp (newest first)
      eventsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events: ', error);
    } finally {
      setLoading(false);
    }
  };

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => router.push({
        pathname: '/events/detail',
        params: {
          id: item.id,
          title: item.title,
          date: item.date,
          location: item.location,
          description: item.description
        }
      })}
    >
      <View style={styles.eventCardHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={[styles.badge, item.type === 'created' ? styles.createdBadge : styles.rsvpBadge]}>
          <Text style={styles.badgeText}>
            {item.type === 'created' ? 'Created' : 'RSVP\'d'}
          </Text>
        </View>
      </View>

      <View style={styles.eventInfo}>
        <MaterialCommunityIcons name="calendar-blank" size={14} color="#94A3B8" />
        <Text style={styles.eventInfoText}>{item.date}</Text>
      </View>

      <View style={styles.eventInfo}>
        <MaterialCommunityIcons name="map-marker" size={14} color="#94A3B8" />
        <Text style={styles.eventInfoText}>{item.location}</Text>
      </View>

      <Text style={styles.eventDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reserved Events</Text>
      </View>

      {events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="bookmark-outline" size={64} color="#6B7280" />
          <Text style={styles.emptyText}>No events yet</Text>
          <Text style={styles.emptySubtext}>Create or RSVP to events to see them here</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Reserved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 12,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  eventCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  createdBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  rsvpBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  eventInfoText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  eventDescription: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});