import React from "react"

import { Feather } from "@expo/vector-icons"
import {
	Dimensions,
	Image,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { useNavigation } from "@react-navigation/core"

import colors from "../styles/colors"
import fonts from "../styles/fonts"
import wateringImage from "../assets/watering.png"

export const Welcome = () => {
	const navigation = useNavigation()

	const handleStart = () => {
		navigation.navigate("UserIdentification")
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Gerencie suas plantas de forma fácil</Text>
				<Image style={styles.image} source={wateringImage} resizeMode="contain" />
				<Text style={styles.subtitle}>
					Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
				</Text>
				<TouchableOpacity style={styles.button} onPress={handleStart}>
					<Feather name="chevron-right" style={styles.buttonIcon} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	wrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		paddingHorizontal: 20,
	},
	title: {
		fontFamily: fonts.heading,
		fontSize: 28,
		textAlign: "center",
		color: colors.heading,
		paddingHorizontal: 20,
		lineHeight: 34,
	},
	image: {
		height: Dimensions.get("window").width * 0.8,
	},
	subtitle: {
		fontFamily: fonts.text,
		fontSize: 18,
		textAlign: "center",
		color: colors.heading,
		paddingHorizontal: 20,
	},
	button: {
		backgroundColor: colors.green,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 16,
		marginTop: 10,
		height: 56,
		width: 56,
	},
	buttonIcon: {
		color: colors.white,
		fontSize: 28,
	},
})
