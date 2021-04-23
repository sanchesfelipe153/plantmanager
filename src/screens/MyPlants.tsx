import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { formatDistance } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Header } from "../components/Header"

import colors from "../styles/colors"
import fonts from "../styles/fonts"
import waterdrop from "../assets/waterdrop.png"
import { loadPlants, PlantProps } from "../libs/storage"
import { PlantCardSecondary } from "../components/PlantCardSecondary"

export const MyPlants = () => {
	const [myPlants, setMyPlants] = useState<PlantProps[]>([])
	const [loading, setLoading] = useState(true)
	const [nextWatered, setNextWatered] = useState<string>()

	useEffect(() => {
		const loadStoredData = async () => {
			const storedPlants = await loadPlants()

			if (storedPlants.length > 0) {
				const nextTime = formatDistance(
					new Date(storedPlants[0].dateTimeNotification).getTime(),
					new Date().getTime(),
					{ locale: ptBR }
				)
				setNextWatered(`Não esqueça de regar a ${storedPlants[0].name} à ${nextTime}`)
			}

			setMyPlants(storedPlants)
			setLoading(false)
		}

		loadStoredData()
	}, [])

	return (
		<View style={styles.container}>
			<Header />

			<View style={styles.spotlight}>
				<Image source={waterdrop} style={styles.spotlightImage} />
				<Text style={styles.spotlightText}>{nextWatered}</Text>
			</View>

			<View style={styles.plants}>
				<Text style={styles.plantsTitle}>Próximas regadas</Text>

				<FlatList
					contentContainerStyle={{ flex: 1 }}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => String(item.id)}
					data={myPlants}
					renderItem={({ item }) => <PlantCardSecondary data={item} />}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 30,
		paddingTop: 50,
		backgroundColor: colors.shape,
	},
	spotlight: {
		backgroundColor: colors.blue_light,
		paddingHorizontal: 20,
		borderRadius: 20,
		height: 110,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	spotlightImage: {
		width: 60,
		height: 60,
	},
	spotlightText: {
		flex: 1,
		color: colors.blue,
		paddingHorizontal: 20,
	},
	plants: {
		flex: 1,
		width: "100%",
	},
	plantsTitle: {
		fontSize: 24,
		fontFamily: fonts.heading,
		color: colors.heading,
		marginVertical: 20,
	},
})
