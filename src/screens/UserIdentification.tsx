import React, { useState } from "react"
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import { useNavigation } from "@react-navigation/core"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Button } from "../components/Button"

import colors from "../styles/colors"
import fonts from "../styles/fonts"

export const UserIdentification = () => {
	const [isFocused, setFocused] = useState(false)
	const [name, setName] = useState<string>()
	const navigation = useNavigation()

	const handleInputBlur = () => {
		Keyboard.dismiss()
		setFocused(false)
	}
	const handleInputFocus = () => {
		setFocused(true)
	}
	const handleInputChange = (value: string) => {
		setName(value)
	}

	const handleSubmit = async () => {
		if (!name) {
			return Alert.alert("Me diz como chamar você 😢")
		}

		try {
			await AsyncStorage.setItem("@plantmanager:user", name)
			navigation.navigate("Confirmation", {
				title: "Prontinho",
				subtitle: "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
				buttonTitle: "Começar",
				icon: "smile",
				nextScreen: "PlantSelect",
			})
		} catch {
			Alert.alert("Não foi possível salvar o seu nome! 😢")
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.content}>
						<View style={styles.form}>
							<View style={styles.header}>
								<Text style={styles.emoji}>{!!name ? "😄" : "😃"}</Text>
								<Text style={styles.title}>
									Como podemos {"\n"}
									chamar você?
								</Text>
							</View>
							<TextInput
								style={[styles.input, (isFocused || !!name) && { borderColor: colors.green }]}
								placeholder="Digite seu nome"
								onChangeText={handleInputChange}
								onBlur={handleInputBlur}
								onFocus={handleInputFocus}
							/>
							<View style={styles.footer}>
								<Button title="Confirmar" onPress={handleSubmit} />
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "space-around",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	content: {
		flex: 1,
		width: "100%",
	},
	form: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 54,
		alignItems: "center",
	},
	header: {
		alignItems: "center",
	},
	emoji: {
		fontSize: 44,
	},
	input: {
		borderBottomWidth: 1,
		borderColor: colors.gray,
		color: colors.heading,
		width: "100%",
		fontSize: 18,
		marginTop: 50,
		padding: 10,
		textAlign: "center",
	},
	title: {
		fontSize: 24,
		lineHeight: 32,
		textAlign: "center",
		color: colors.heading,
		fontFamily: fonts.heading,
		marginTop: 20,
	},
	footer: {
		marginTop: 40,
		width: "100%",
		paddingHorizontal: 20,
	},
})
