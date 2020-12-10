import React, { useCallback, useEffect, useState } from "react"
import { FaCode } from "react-icons/fa"
import axios from "axios"
import { Icon, Col, Card, Row, Carousel } from "antd"
import Meta from "antd/lib/card/Meta"
import ImageSlider from "../../utils/ImageSlider"
import Checkbox from "./Sections/CheckBox"
import { continents } from "./Sections/Datas"
function LandingPage() {
	const [Products, setProducts] = useState([])
	const [Skip, setSkip] = useState(0)
	const [Limit] = useState(4)
	const [PostSize, setPostSize] = useState(4)
	const [Filters, setFilters] = useState({
		continents: [],
		price: [],
	})

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
		let body = {
			skip: Skip,
			limit: Limit,
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
	}, [Limit, Skip])

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

		showFilteredResults(newFilters)
	}

	return (
		<div style={{ width: "75%", margin: "3rem auto" }}>
			<div style={{ textAlign: "center" }}>
				<h2>
					Let's Travel Anywhere <Icon type="rocket" />
				</h2>

				{/* Filter  */}
				{/* Checkbox	 */}
				<Checkbox
					list={continents}
					handleFilters={(filters) => handleFilters(filters, "continents")}
				/>
				{/* RadioBox */}
				{/* Searcj */}
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
