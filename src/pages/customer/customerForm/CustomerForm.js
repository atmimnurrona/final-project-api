import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {findCustomerByIdAction, saveCustomerAction} from "../../../actions/customerAction"
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import  {CustomInput, Button, Form, FormGroup, Input, Label, Card, CardHeader, CardBody, Col} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import Container from "../../../components/Containers/Container";
import DropdownList from "../../../components/DropdownList/DropdownList";
import HeaderMaster from "../../../components/navbar/NavbarMaster";


const CustomerForm = ({error, isLoading, saveCustomer, saveCustomerAction, customer, findCustomerByIdAction}) => {
    const {id} = useParams()
    const [redirect] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        idNumber: 0,
        address: "",
        employeeType: "",
        contractLength: 0,
        contractStart: ""
    })
    const history = useHistory()

    useEffect(() => {
        if (id !== data.id) {
            findCustomerByIdAction(id);
            setData(customer)
            console.log("ini useeffect", customer)
        }
    }, [customer])

    useEffect(() => {
        if (saveCustomer) {
            history.push('/customer')
        }
    }, [saveCustomer, history])

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setData({...data, [name]: value})

        console.log("ini handle change", data)
    }

    const handleEmployee = (e) => {
        setData({...data, employeeType: e})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveCustomerAction(data)

        console.log("ini handle submit",data)
    }

    if (redirect === true) {
        return <Redirect to="/customer"/>
    }

    return (
        <div>
            <Container error={error} />
            <HeaderMaster/>
            <div className="container-fluid" style={{marginTop:"10px"}}>
                <h1 style={{fontSize:"3vw", color:"#e42556", margin:"3%", textAlign:"center"}}>Form Customer</h1>
                <div className="col-md-13">
                    <div className="form form-container">
                        {!isLoading ?
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="name" sm={2}>Customer's Name</Label>
                                    <Col sm={10}>
                                        <Input
                                            required
                                            onChange={handleChange}
                                            value={data?.name || ''}
                                            type="text"
                                            name="name"
                                            // id="email"
                                            placeholder="input name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="email" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input
                                            required
                                            onChange={handleChange}
                                            value={data?.email || ''}
                                            type="email"
                                            name="email"
                                            // id="email"
                                            placeholder="input email"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="idNumber" sm={2}>ID Number</Label>
                                    <Col sm={10}>
                                        <Input
                                            required
                                            onChange={handleChange}
                                            value={data?.idNumber || ''}
                                            type="number"
                                            name="idNumber"
                                            // id="idNumber"
                                            placeholder="input ID number"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="exampleText" sm={2}>Address</Label>
                                    <Col sm={10}>
                                        <Input
                                            required
                                            onChange={handleChange}
                                            value={data?.address || ''}
                                            type="textarea"
                                            name="address"
                                            placeholder="address"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="select" sm={2}>Type of customer</Label>
                                    <Col sm={10}>
                                        <DropdownList
                                            data={[
                                                {value: "NON", label: "NON"},
                                                {value: "REGULAR", label: "REGULAR"},
                                                {value: "CONTRACT", label: "CONTRACT"}
                                            ]}
                                            value={data?.employeeType}
                                            placeholder="Select Employee Type"
                                            handleDropdown={handleEmployee}
                                        />
                                    </Col>
                                </FormGroup>

                                {data.employeeType == "CONTRACT"
                                &&

                                    <div>
                                <FormGroup row>
                                    <Label for="contractStart" sm={2}>Contract Start</Label>
                                    <Col sm={10}>
                                        <Input
                                            onChange={handleChange}
                                            value={data?.contractStart || ''}
                                            type="date"
                                            name="contractStart"
                                            id="contractStart"
                                            placeholder="contract start"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="contractLength" sm={2}>Contract Length</Label>
                                    <Col sm={10}>
                                        <Input
                                            onChange={handleChange}
                                            value={data?.contractLength || ''}
                                            type="number"
                                            name="contractLength"
                                            id="contractLength"
                                            placeholder="contract length"/>
                                    </Col>
                                </FormGroup>
                                    </div>
                                }
                                <FormGroup check row>
                                    <Col sm={{size: 10, offset: 2}}>
                                        <Button style={{background:"#e42256"}}>
                                            <FontAwesomeIcon icon={faSave}/>
                                            {id !== null ? "  Update" : "  Submit"}
                                        </Button> {' '}
                                        <Button href="/customer" style={{background:"#e42256"}}>
                                            <FontAwesomeIcon icon={faArrowLeft}/>
                                              Cancel
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form> :
                            <div>Loading...</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // call reducer
        error: state.findCustomerByIdReducer.error || state.saveCustomerReducer.error,
        customer: state.findCustomerByIdReducer.data,
        isLoading: state.findCustomerByIdReducer.isLoading,
        update: state.updateCustomerReducer,
        saveCustomer: state.saveCustomerReducer.data
    }
}

const mapDispatchToProps = {findCustomerByIdAction, saveCustomerAction}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)
