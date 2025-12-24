import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const EventsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const events = [
    {
      id: '1',
      title: 'Local Music Fest 2024',
      date: 'Aug 15 at 19:00',
      location: 'City Park Amphitheater',
      description: 'Experience a vibrant evening of local bands and delicious food trucks. All genres',
    },
    {
      id: '2',
      title: 'Tech Innovations Summit',
      date: 'Sep 22 at 09:00',
      location: 'Convention Center Hall A',
      description: 'Join industry leaders and innovators for a day of insightful talks, workshops, and',
    },
    {
      id: '3',
      title: 'Community Art Workshop',
      date: 'Oct 05 at 14:00',
      location: 'Downtown Art Studio',
      description: 'Unleash your creativity in our free community art workshop. All skill levels are',
    },
    {
      id: '4',
      title: 'Farmers Market Harvest Fair',
      date: 'Nov 10 at 10:00',
      location: 'Main Street Plaza',
      description: 'Celebrate the autumn harvest with fresh produce, artisanal goods, live music, and',
    },
    {
      id: '5',
      title: 'Winter Wonderland Gala',
      date: 'Dec 01 at 18:30',
      location: 'Grand Ballroom Hotel',
      description: 'An elegant evening of fine dining, dancing, and charity auctions to support local',
    },
  ];

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => router.push({
        pathname: '/events/detail',
        params: { event: JSON.stringify(item) }
      })}
    >
      <Text style={styles.eventTitle}>{item.title}</Text>

      <View style={styles.eventInfo}>
        <MaterialCommunityIcons name="calendar-blank" size={14} color="#94A3B8" />
        <Text style={styles.eventInfoText}>{item.date}</Text>
      </View>

      <View style={styles.eventInfo}>
        <MaterialCommunityIcons name="map-marker" size={14} color="#94A3B8" />
        <Text style={styles.eventInfoText}>{item.location}</Text>
      </View>

      <Text style={styles.eventDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <MaterialCommunityIcons name="magnify" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="tune" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/events/add')}>
        <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default EventsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    gap: 12,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
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
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
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
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: '#6366F1',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
