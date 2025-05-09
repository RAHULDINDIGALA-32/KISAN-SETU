import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BASE_URL = 'http://172.17.198.119:3000/api/community';

const Community = ({ isAuthenticated }) => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [commentSections, setCommentSections] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const toggleCommentSection = (postId) => {
    setCommentSections((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };


  const handleAddPost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newPostText, image: newPostImage }),
      });
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setNewPostText('');
      setNewPostImage('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleUpvote = async (postId) => {
    await fetch(`${BASE_URL}/posts/${postId}/upvote`, { method: 'POST' });
    fetchPosts();
  };

  const handleDownvote = async (postId) => {
    await fetch(`${BASE_URL}/posts/${postId}/downvote`, { method: 'POST' });
    fetchPosts();
  };

  const handleAddComment = async (postId, commentText) => {
    await fetch(`${BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commentText }),
    });
    fetchPosts();
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
            <Text style={styles.postText}>{item.text}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
            <View style={styles.postActions}>
              <TouchableOpacity onPress={() => handleUpvote(item._id)}>
                <Icon name="thumb-up-outline" style={styles.upvoteIcon} />
                <Text style={styles.upvote}>{item.upvotes || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleCommentSection(item._id)}>
                <Icon name="comment-outline" style={styles.commentIcon} />
                <Text style={styles.commentCount}>{item.comments?.length || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDownvote(item._id)}>
                <Icon name="thumb-down-outline" style={styles.downvoteIcon} />
                <Text style={styles.downvote}>{item.downvotes || 0}</Text>
              </TouchableOpacity>
            </View>
            {commentSections[item._id] && (
              <View style={styles.commentSection}>
                <FlatList
                  data={item.comments || []}
                  renderItem={({ item: comment }) => (
                    <View style={styles.commentContainer}>
                      <Text style={styles.commentText}>{comment.text}</Text>
                    </View>
                  )}
                  keyExtractor={(comment) => comment._id}
                />
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                  onSubmitEditing={(event) => handleAddComment(item._id, event.nativeEvent.text)}
                />
              </View>
            )}
          </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>

      {!isAuthenticated && (
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.newPostInput}
            placeholder="Share Your Knowledge"
            value={newPostText}
            onChangeText={setNewPostText}
          />
          <TextInput
            style={styles.newPostInput}
            placeholder="Image URL"
            value={newPostImage}
            onChangeText={setNewPostImage}
          />
          <TouchableOpacity style={styles.addPostButton} onPress={handleAddPost}>
            <Text style={styles.addPostButtonText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFDff' },
  newPostContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  newPostInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  addPostButton: { backgroundColor: '#D89D5Bff', padding: 10, borderRadius: 5, alignItems: 'center' },
  addPostButtonText: { color: '#FDFDFDff', fontSize: 16 },
  postContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  postText: { fontSize: 16, color: '#1D3237ff' },
  postImage: { width: '100%', height: 200, marginTop: 10, marginBottom: 10 },
  postActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  upvoteIcon: { fontSize: 24, color: '#76A039' },
  downvoteIcon: { fontSize: 24, color: '#D89D5Bff' },
  upvote: { color: '#76A039', marginLeft: 5 },
  downvote: { color: '#D89D5Bff', marginLeft: 5 },
  commentIcon: { fontSize: 24, color: '#555' },
  commentContainer: { padding: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  commentText: { fontSize: 14, color: '#1D3237ff' },
  commentInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginTop: 10 },
  
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#76A039',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#D89D5Bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FDFDFDff',
    fontSize: 16,
  },
});

export default Community;