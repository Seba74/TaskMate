import { fontSize } from 'constants/tokens'
import { colors } from 'constants/colors'
import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.xl,
		color: colors.text,
	},
})
