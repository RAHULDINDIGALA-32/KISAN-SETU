import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const BASE_URL='http://172.16.216.138:3000/api/community'


const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://172.16.216.138:3000/api/community/posts');
      const data = await response.json();
      setPosts(data);  
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
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
    <ScrollView style={styles.container}>
      <View style={styles.newPostContainer}>
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
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postText}>{item.text}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
            <View style={styles.postActions}>
              <TouchableOpacity onPress={() => handleUpvote(item._id)}>
                <Text style={styles.upvote}>👍 {item.upvotes || 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDownvote(item._id)}>
                <Text style={styles.downvote}>👎 {item.downvotes || 0}</Text>
              </TouchableOpacity>
            </View>
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
        keyExtractor={(item) => item._id}
      />
    </ScrollView>
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
  postActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  upvote: { color: '#76A039' },
  downvote: { color: '#D89D5Bff' },
  commentContainer: { padding: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  commentText: { fontSize: 14, color: '#1D3237ff' },
  commentInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginTop: 10 },
});

export default Community;
