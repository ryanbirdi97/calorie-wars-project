import { StyleSheet } from 'react-native';
import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../firebase';

export default function Chat() {
  const email = auth.currentUser?.email;
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('users')
      .doc(email)
      .onSnapshot((doc) => {
        setAvatar(doc.data().avatar);
        setUsername(doc.data().username);
      });
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
    db.collection('chats').add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      isTyping={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: email,
        name: username,
        avatar: avatar,
      }}
    />
  );
}

const styles = StyleSheet.create({});
