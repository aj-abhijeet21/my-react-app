import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, ImageURISource, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react'
import Button from './components/Button'
import ImageViewer from './components/ImageViewer'
import IconButton from './components/IconButton'
import CircleButton from './components/CircleButton'
import EmojiPicker from './components/EmojiPicker'
import EmojiList from './components/EmojiList'
import EmojiSticker from './components/EmojiSticker'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { captureRef } from 'react-native-view-shot'
import * as MediaLibrary from 'expo-media-library'
import domtoimage from 'dom-to-image'

const PlaceholderImage = require('./assets/background-image.jpg')

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions()
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmoji, setPickedEmoji] = useState<ImageURISource | null>(null)
  const imageRef = useRef<any>()

  if (status === null) {
    requestPermission()
  }

  const onReset = () => {
    setSelectedImage('')
    setPickedEmoji(null)
  }

  const onStickerAdd = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        })

        await MediaLibrary.saveToLibraryAsync(localUri)
        if (localUri) {
          alert('Saved!')
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      domtoimage
        .toJpeg(imageRef.current, { quality: 1, width: 320, height: 440 })
        .then((dataUrl) => {
          let link = document.createElement('a')
          link.download = 'sticker-smash.jpg'
          link.href = dataUrl
          link.click()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
      console.log(result)
    } else {
      alert("You haven't selected any image")
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onStickerAdd} />
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme='primary' label='Choose a photo' onPress={pickImageAsync} />
          <Button label='Use this photo' onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style='light' />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
