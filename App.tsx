import React, { useEffect } from "react"

import AppLoading from "expo-app-loading"
import { Jost_400Regular, Jost_600SemiBold, useFonts } from "@expo-google-fonts/jost"
import * as Notifications from "expo-notifications"

import Routes from "./src/routes"
import { PlantProps } from "./src/libs/storage"

const App = () => {
	useEffect(() => {
		const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
			const data = notification.request.content.data.plant as PlantProps
			console.log(data)
		})

		return () => subscription.remove()
	}, [])

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
