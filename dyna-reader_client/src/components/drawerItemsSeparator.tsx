import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";

interface Props {
    label: string,
    onPress?: () => void,
    color?: string,
}

export default function DrawerItemSeparator({label, onPress, color='#1E1E1E'}: Props) {
    return (
        <>
            <View style={styles.separator}/>
            <TouchableOpacity onPress={onPress} style={styles.item}>
                <Text style={[styles.text, {color}]}>{label}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
  separator: {
    width: '85%',
    height: 1,
    margin: 5,
    backgroundColor: '#ddd',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
  },
});
