import React from "react"
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { Button } from "../components/Button"
import colors from "../styles/colors"
import fonts from "../styles/fonts"

export const Confirmation = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>😄</Text>
				<Text style={styles.title}>Prontinho</Text>
				<Text style={styles.subtitle}>Agora vamos começar a cuidar das suas plantinhas com muito cuidado.</Text>
				<View style={styles.footer}>
					<Button title="Começar" />
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
