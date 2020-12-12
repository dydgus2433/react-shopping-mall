import React, { useState } from "react"
import { Collapse, Radio } from "antd"
const { Panel } = Collapse

function RadioBox(props) {
	const [Value, setValue] = useState(0)
	const renderRadioboxList = () =>
		props.list &&
		props.list.map((value, index) => (
			<React.Fragment key={value._id}>
				<Radio value={value._id}>
					<span>{value.name}</span>
				</Radio>
			</React.Fragment>
		))

	const handleChange = (event) => {
		setValue(event.target.value)
		props.handleFilters(event.target.value)
	}
	return (
		<div>
			<Collapse defaultActiveKey={["0"]}>
				<Panel header="Price" key="2">
					<Radio.Group onChange={handleChange} value={Value}>
						{renderRadioboxList()}
					</Radio.Group>
					{/* <Checkbox>Checkbox</Checkbox> */}
				</Panel>
			</Collapse>
		</div>
	)
}

export default RadioBox
