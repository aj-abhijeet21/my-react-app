import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

const IconButton = ({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap
  label: string
  onPress: () => void
}) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color='#fff' />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
})

export default IconButton
