import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import useAuthStore from '../store/Authstore';
import useBookStore from '../store/Bookstore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors';

export default function Profile() {
  const { user, logout } = useAuthStore();
  const { mybooks, getmybooks, deletebook, loading } = useBookStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getmybooks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getmybooks();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" }
    ]);
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deletebook(id), style: "destructive" }
    ]);
  };

  const renderBookItem = ({ item }) => (
    <View style={styles.bookCard}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={1}>{item.bookname}</Text>
        <View style={styles.starRow}>
          {[1,2,3,4,5].map((star) => (
             <Ionicons
               key={star}
               name={star <= item.starrating ? "star" : "star-outline"}
               size={14}
               color="#FFD700"
             />
          ))}
        </View>
        <Text style={styles.bookCaption} numberOfLines={2}>{item.caption}</Text>
        <Text style={styles.bookDate}>
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
        <Ionicons name="trash-outline" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyComponent = () => (
    !loading && !refreshing ? (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ color: '#666' }}>You haven't added any books yet.</Text>
      </View>
    ) : null
  );

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          {user?.profile?.avatar ? (
            <Image source={{ uri: user.profile.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
               <Ionicons name="person" size={40} color={COLORS.primary} />
            </View>
          )}
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.username || 'User Name'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
            <Text style={styles.userMember}>
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'recently'}
            </Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Recommendations Header */}
      <View style={styles.recommendationsHeader}>
        <Text style={styles.recommendationsTitle}>Your Recommendations</Text>
        <Text style={styles.recommendationsCount}>{mybooks?.length || 0} books</Text>
      </View>

      {/* Books List */}
      <FlatList
        data={mybooks}
        keyExtractor={(item) => item._id}
        renderItem={renderBookItem}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, 
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  profileCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  userMember: {
    fontSize: 12,
    color: COLORS.placeholderText,
  },
  logoutBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  recommendationsCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  bookImage: {
    width: 60,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bookCaption: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: 4,
  },
  bookDate: {
    fontSize: 10,
    color: COLORS.placeholderText,
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});