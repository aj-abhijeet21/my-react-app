import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'

const ImageViewer = ({
  placeholderImageSource,
  selectedImage,
}: {
  placeholderImageSource: ImageSourcePropType
  selectedImage?: string
}) => {
  const imageSource = selectedImage !== '' ? { uri: selectedImage } : placeholderImageSource
  return (
    <View>
      <Image source={imageSource} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})
export default ImageViewer
