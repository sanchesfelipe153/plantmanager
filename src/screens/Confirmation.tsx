import React from "react"
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/core"

import { Button } from "../components/Button"

import colors from "../styles/colors"
import fonts from "../styles/fonts"

interface Params {
	title: string
	subtitle: string
	buttonTitle: string
	icon: "smile" | "hug"
	nextScreen: string
}

const emojis = {
	smile: "😄",
	hug: "🤗",
}

export const Confirmation = () => {
	const navigation = useNavigation()
	const route = useRoute()

	const params = route.params as Params

	const handleMoveOn = () => {
		navigation.navigate(params.nextScreen)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>{emojis[params.icon]}</Text>
				<Text style={styles.title}>{params.title}</Text>
				<Text style={styles.subtitle}>{params.subtitle}</Text>
				<View style={styles.footer}>
					<Button title={params.buttonTitle} onPress={handleMoveOn} />
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		padding: 30,
	},
	emoji: {
		fontSize: 78,
	},
	title: {
		fontSize: 22,
		lineHeight: 38,
		textAlign: "center",
		color: colors.heading,
		fontFamily: fonts.heading,
		marginTop: 15,
	},
	subtitle: {
		fontSize: 17,
		textAlign: "center",
		color: colors.heading,
		fontFamily: fonts.text,
		paddingVertical: 10,
	},
	footer: {
		marginTop: 40,
		width: "100%",
		paddingHorizontal: 75,
	},
})
