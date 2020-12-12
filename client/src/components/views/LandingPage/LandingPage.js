import React, { useCallback, useEffect, useState } from "react"
import { FaCode } from "react-icons/fa"
import axios from "axios"
import { Icon, Col, Card, Row, Carousel } from "antd"
import Meta from "antd/lib/card/Meta"
import ImageSlider from "../../utils/ImageSlider"
import Checkbox from "./Sections/CheckBox"
import Radiobox from "./Sections/RadioBox"
import SearchFeature from "./Sections/SearchFeature"
import { continents, price } from "./Sections/Datas"
import Title from "antd/lib/skeleton/Title"
function LandingPage() {
	const [Products, setProducts] = useState([])
	const [Skip, setSkip] = useState(0)
	const [Limit, setLimit] = useState(4)
	const [PostSize, setPostSize] = useState(4)
	const [Filters, setFilters] = useState({
		continents: [],
		price: [],
	})
	const [SearchTerm, setSearchTerm] = useState("")

	const getProducts = (body) => {
		axios.post("/api/product/products", body).then((response) => {
			if (response.data.success) {
				if (body.loadMore) {
					setProducts([...Products, ...response.data.productsInfo])
				} else {
					setProducts(response.data.productsInfo)
				}
				setPostSize(response.data.postSize)
			} else {
				alert("상품들을 가져오는데 실패 했습니다.")
			}
		})
	}
	useEffect(() => {
		let skip = 0
		let limit = 4
		let body = {
			skip: skip,
			limit: limit,
			loadMore: false,
		}
		const getProductsFunction = (body) => {
			axios.post("/api/product/products", body).then((response) => {
				if (response.data.success) {
					if (!body.loadMore) {
						setProducts(response.data.productsInfo)
						setPostSize(response.data.postSize)
					}
				} else {
					alert("상품들을 가져오는데 실패 했습니다.")
				}
			})
		}

		getProductsFunction(body)
	}, [])

	const loadMoreHander = () => {
		let skip = Skip + Limit
		let body = {
			skip: skip,
			limit: Limit,
			loadMore: true,
		}
		getProducts(body)
		setSkip(skip)
	}
	const renderCards = Products.map((product, index) => {
		return (
			<Col lg={6} md={8} xs={24} key={index}>
				<Card cover={<ImageSlider images={product.images} />}>
					<Title>{product.title}</Title>
					<Meta title={product.title} description={`${product.price}`} />
				</Card>
			</Col>
		)
	})

	const showFilteredResults = (filters) => {
		let body = {
			skip: 0,
			limit: Limit,
			filters: filters,
		}
		getProducts(body)
		setSkip(0)
	}
	const handleFilters = (filters, category) => {
		const newFilters = { ...Filters }

		newFilters[category] = filters

		if (category === "price") {
			let priceValues = handlePrice(filters)
			newFilters[category] = priceValues
		}

		showFilteredResults(newFilters)
		setFilters(newFilters)
	}

	const handlePrice = (value) => {
		const data = price
		let array = []
		for (let key in data) {
			if (data[key]._id === parseInt(value, 10)) {
				array = data[key].array
			}
		}
		return array
	}

	const updateSearchTerm = (newSearchTerm) => {
		let body = {
			skip: 0,
			limit: Limit,
			filters: Filters,
			searchTerm: newSearchTerm,
		}
		setSearchTerm(newSearchTerm)

		setSkip(0)
		getProducts(body)
	}
	return (
		<div style={{ width: "75%", margin: "3rem auto" }}>
			<div style={{ textAlign: "center" }}>
				<h2>
					Let's Travel Anywhere <Icon type="rocket" />
				</h2>

				{/* Filter  */}
				<Row gutter={[16, 16]}>
					<Col lg={12} xs={24}>
						{/* Checkbox	 */}
						<Checkbox
							list={continents}
							handleFilters={(filters) => handleFilters(filters, "continents")}
						/>
					</Col>
					<Col lg={12} xs={24}>
						{/* RadioBox */}
						<Radiobox
							list={price}
							handleFilters={(filters) => handleFilters(filters, "price")}
						/>
					</Col>
				</Row>

				{/* Search */}
				<div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem auto" }}>
					<SearchFeature refreshFunction={updateSearchTerm} />
				</div>
				{/* Cards */}

				{<Row gutter={(16, 16)}>{renderCards}</Row>}
			</div>

			<br />
			{PostSize >= Limit && (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<button onClick={loadMoreHander}>더보기</button>
				</div>
			)}
		</div>
	)
}

export default LandingPage
