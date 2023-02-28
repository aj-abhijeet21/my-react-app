import {
  View,
  Text,
  FlatList,
  Platform,
  Pressable,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native'
import React, { useState } from 'react'

const EmojiList = ({
  onSelect,
  onCloseModal,
}: {
  onSelect: React.Dispatch<any>
  onCloseModal: () => void
}) => {
  const [emoji] = useState<ImageURISource[]>([
    require('../assets/emojis/emoji1.png'),
    require('../assets/emojis/emoji2.png'),
    require('../assets/emojis/emoji3.png'),
    require('../assets/emojis/emoji4.png'),
    require('../assets/emojis/emoji5.png'),
    require('../assets/emojis/emoji6.png'),
  ])

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS == 'web' ? true : false}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item)
            onCloseModal()
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  )
}
const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
})
export default EmojiList
