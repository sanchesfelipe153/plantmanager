import React from "react"

import AppLoading from "expo-app-loading"
import { Jost_400Regular, Jost_600SemiBold, useFonts } from "@expo-google-fonts/jost"

import Routes from "./src/routes"

const App = () => {
	const [fontsLoaded] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold,
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return <Routes />
}

export default App
