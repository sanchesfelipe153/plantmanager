import React, { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { EnvironmentButton } from "../components/EnvironmentButton"

import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import { PlantCardPrimary } from "../components/PlantCardPrimary"
import api from "../services/api"

import colors from "../styles/colors"
import fonts from "../styles/fonts"

interface EnvironmentProps {
	key: string
	title: string
}

interface PlantProps {
	id: string
	name: string
	about: string
	water_tips: string
	photo: string
	environments: [string]
	frequency: {
		times: number
		repeat_every: string
	}
}

export const PlantSelect = () => {
	const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
	const [plants, setPlants] = useState<PlantProps[]>([])
	const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
	const [selectedEnvironment, setSelectedEnvironment] = useState("all")
	const [loading, setLoading] = useState(true)

	const [page, setPage] = useState(1)
	const [loadingMore, setLoadingMore] = useState(false)
	const [loadedAll, setLoadedAll] = useState(false)

	async function fetchPlants() {
		const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8}`)

		if (!data) {
			return setLoading(true)
		}

		if (page > 1) {
			setPlants((oldValue) => [...oldValue, ...data])
			setFilteredPlants((oldValue) => [...oldValue, ...data])
		} else {
			setPlants(data)
			setFilteredPlants(data)
		}
		setLoading(false)
		setLoadingMore(false)
	}

	useEffect(() => {
		async function fetchEnvironments() {
			const { data } = await api.get("plants_environments?_sort=title&_order=asc")
			setEnvironments([
				{
					key: "all",
					title: "Todos",
				},
				...data,
			])
		}
		fetchEnvironments()
	}, [])
	useEffect(() => {
		fetchPlants()
	}, [])

	const handleEnvironmentClick = (environment: string) => {
		setSelectedEnvironment(environment)

		if (environment === "all") {
			return setFilteredPlants(plants)
		}
		const filtered = plants.filter((plant) => plant.environments.includes(environment))
		setFilteredPlants(filtered)
	}

	const handleFetchMore = (distance: number) => {
		if (distance < 1) {
			return
		}

		setLoadingMore(true)
		setPage((oldValue) => oldValue + 1)
		fetchPlants()
	}

	if (loading) {
		return <Loading />
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header />
				<Text style={styles.title}>Em qual ambiente</Text>
				<Text style={styles.subtitle}>você quer colocar sua planta?</Text>
			</View>
			<View>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.environmentList}
					data={environments}
					renderItem={({ item }) => (
						<EnvironmentButton
							title={item.title}
							active={item.key === selectedEnvironment}
							onPress={() => handleEnvironmentClick(item.key)}
						/>
					)}
				/>
			</View>
			<View style={styles.plants}>
				<FlatList
					numColumns={2}
					showsVerticalScrollIndicator={false}
					data={filteredPlants}
					renderItem={({ item }) => <PlantCardPrimary data={item} />}
					onEndReachedThreshold={0.1}
					onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
					ListFooterComponent={() => (loadingMore ? <ActivityIndicator color={colors.green} /> : <></>)}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	header: {
		paddingHorizontal: 30,
	},
	title: {
		fontSize: 17,
		color: colors.heading,
		fontFamily: fonts.heading,
		lineHeight: 20,
		marginTop: 15,
	},
	subtitle: {
		fontSize: 17,
		color: colors.heading,
		fontFamily: fonts.text,
		lineHeight: 20,
	},
	environmentList: {
		height: 40,
		justifyContent: "center",
		paddingBottom: 5,
		marginLeft: 32,
		marginVertical: 32,
	},
	plants: {
		flex: 1,
		paddingHorizontal: 32,
		justifyContent: "center",
	},
})
