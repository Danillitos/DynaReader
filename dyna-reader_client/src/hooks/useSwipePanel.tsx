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
            const distanceTotal = Math.abs(MIN_TRANSLATE_Y);
            
            const openThreshold = distanceTotal * 0.7
            const closeThreshold = distanceTotal * 0.3

            const currentPositionFromBottom = Math.abs(translateY.value)

            if (currentPositionFromBottom >= openThreshold) {
                translateY.value = withSpring(MIN_TRANSLATE_Y);
                
            }
            else if (currentPositionFromBottom <= closeThreshold) {
                translateY.value = withSpring(MAX_TRANSLATE_Y);
            }
            else {
                const middle = (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2;
                translateY.value = translateY.value < middle
                ? withSpring(MIN_TRANSLATE_Y)
                : withSpring(MAX_TRANSLATE_Y);
            }
        })
    
    const togglePanel = () => {
        const isAtBottom = translateY.value === MAX_TRANSLATE_Y
        translateY.value = withSpring(
            isAtBottom ? MIN_TRANSLATE_Y : MAX_TRANSLATE_Y,
            { damping: 95, stiffness: 350 }
        )
    }

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
        height,
        togglePanel
    }
}
