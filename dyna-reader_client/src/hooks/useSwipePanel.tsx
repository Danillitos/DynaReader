// useSwipePanel.ts
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolation } from 'react-native-reanimated';

export function useSwipePanel() {
    const height = Dimensions.get('window').height
    const MIN_TRANSLATE_Y = -height * 0.89
    const MAX_TRANSLATE_Y = 0
    const startY = useSharedValue(MAX_TRANSLATE_Y)
    const translateY = useSharedValue(MAX_TRANSLATE_Y)

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            startY.value = translateY.value
        })
        .onUpdate((event) => {
            const nextY = startY.value + event.translationY
            translateY.value = Math.min(MAX_TRANSLATE_Y, Math.max(MIN_TRANSLATE_Y, nextY))
        })
        .onEnd(() => {
            const distanceTotal = MAX_TRANSLATE_Y - MIN_TRANSLATE_Y;
            
            const limiarUp   = MAX_TRANSLATE_Y - distanceTotal * 0.15; 
            const limiarDown = MIN_TRANSLATE_Y + distanceTotal * 0.3; 

            if (translateY.value <= limiarUp) {
                translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 50 });
                
            }
            else if (translateY.value >= limiarDown) {

                translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
            }
            else {
                const meio = (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2;
                translateY.value = translateY.value < meio
                ? withSpring(MIN_TRANSLATE_Y, { damping: 50 })
                : withSpring(MAX_TRANSLATE_Y, { damping: 50 });
            }
        })
    
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }]
    }))

    const arrowAnimatedStyle = useAnimatedStyle(() => {
        const angle = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
            [0, Math.PI],
            Extrapolation.CLAMP
        )

        const offsetY = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
            [0, -50],
            Extrapolation.CLAMP
        )
        return {
            transform: [
                { rotate: `${angle}rad`},
                { translateY: offsetY }
            ]

        }
    })

    const bookTextAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
            [1, 0],
            Extrapolation.CLAMP
        )

        const offsetY = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
            [20, 0],
            Extrapolation.CLAMP
        )

        return {
            opacity,
            transform: [{translateY: offsetY}]
        }
    })
    
    return {
        panGesture,
        animatedStyle,
        arrowAnimatedStyle,
        bookTextAnimatedStyle,
        height
    }
}
