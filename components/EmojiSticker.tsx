import { View, Text, ImageURISource, Image } from 'react-native'
import React from 'react'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler'
const AnimatedImage = Animated.createAnimatedComponent(Image)
const AnimatedView = Animated.createAnimatedComponent(View)

const EmojiSticker = ({
  imageSize,
  stickerSource,
}: {
  imageSize: number
  stickerSource: ImageURISource
}) => {
  const scaleImage = useSharedValue(imageSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const onDoubleTap = useAnimatedGestureHandler<any>({
    onActive: (event) => {
      if (scaleImage.value) {
        scaleImage.value = scaleImage.value * 2
      }
    },
  })

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context: any) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context: any) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
  })

  const imageStyle = useAnimatedStyle(() => {
    return { width: withSpring(scaleImage.value), height: withSpring(scaleImage.value) }
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode='contain'
            style={[imageStyle, { height: imageSize, width: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  )
}

export default EmojiSticker
