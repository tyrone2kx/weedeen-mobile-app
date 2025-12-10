import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from './Avatar';

interface IProps {
  avatars: { name: string; avatar?: string }[];
  size?: number;
  /**
   * default - 4
   *
   * no of avatars to render in the stack, remaining avatars / unrendered avatars will be shown as +unrendered avatars
   *
   * add prop `hideUnrendered` to not show number unrendered avatars
   */
  noToShow?: number;
  /**
   * default - false
   *
   * whether to show number of unrendered avatars or not
   */
  hideUnrendered?: boolean;
}

const AvatarStack = ({
  avatars,
  size,
  noToShow = 4,
  hideUnrendered = false,
}: IProps) => {
  const avatarList = avatars.slice(0, noToShow); // Display maximum 3 avatars
  const unrenderedAvatars = avatars.length - avatarList.length;

  return (
    <View style={styles.container}>
      {avatarList.map((avatar, index) => (
        <View key={index} style={styles.avatar}>
          <Avatar
            image={avatar.avatar}
            name={avatar.name}
            showName
            size={size}
          />
        </View>
      ))}
      {unrenderedAvatars > 0 && !hideUnrendered ? (
        <View
          style={[styles.unrenderedContainer, { width: size, height: size }]}
        >
          <Text style={styles.unrenderedText}>+{unrenderedAvatars}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: -10,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'white',
  },
  unrenderedContainer: {
    backgroundColor: 'gray',
    borderRadius: 20,
    marginLeft: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unrenderedText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AvatarStack;
