import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, RefreshControl ,KeyboardAvoidingView,Platform} from 'react-native'
import React, { useEffect, useState } from 'react'
import useBookStore from '../store/Bookstore'
import COLORS from '../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home () {
  const { books, getbooks, loading, currentPage, totalPages } = useBookStore()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getbooks(1)
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await getbooks(1)
    setRefreshing(false)
  }

  const loadMore = () => {
    if (currentPage < totalPages && !loading) {
      getbooks(currentPage + 1)
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {item.user?.profile?.avatar ? (
          <Image source={{ uri: item.user.profile.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
             <Ionicons name="person" size={20} color="#fff" />
          </View>
        )}
        <Text style={styles.username}>{item.user?.username || 'Unknown User'}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.bookname}>{item.bookname}</Text>
        <View style={styles.ratingContainer}>
          {[1,2,3,4,5].map((star) => (
             <Ionicons
               key={star}
               name={star <= item.starrating ? "star" : "star-outline"}
               size={18}
               color="#FFD700"
             />
          ))}
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
  )

  const renderEmptyComponent = () => (
    !loading && !refreshing ? (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text>No books found. Be the first to add one!</Text>
      </View>
    ) : null
  );

  return (
  <KeyboardAvoidingView
              style={styles.keyboardContainer}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
    <View style={styles.container}>
      <FlatList
        data={books || []}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && !refreshing ? <ActivityIndicator size="large" color="#0000ff" style={{ margin: 20 }} /> : null}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.border,
    paddingTop: 40,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius:10
  },
  cardBody: {
    padding: 16,
  },
  bookname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  caption: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 8,
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  }
})