import React, {useState, useEffect} from 'react'
import {Redirect, useHistory, useParams} from 'react-router-dom'
import {findCustomerByIdAction, saveCustomerAction} from "../../../actions/customerAction"
import {} from "react-router-dom"
import {connect} from "react-redux"
import  {Button, Form, FormGroup, Input, Label, Card, CardHeader, CardBody} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import Container from "../../../components/Containers/Container";
import DropdownList from "../../../components/DropdownList/DropdownList";


const CustomerForm = ({error, isLoading, saveCustomer, saveCustomerAction, customer, findCustomerById}) => {
    const {id} = useParams()
    const [redirect] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        idNumber: 0,
        address: "",
        employeeType: "",
        needType: ""
    })
    const history = useHistory()
    // const [employeeType, setEmployeeType] = useState("")
    // const [needType, setNeedType] = useState("")

    useEffect(() => {
        if (id && parseInt(id) !== data.id) {
            findCustomerById(id);
            setData(customer)
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

    }

    const handleEmployee = (e) => {
        setData({...data, employeeType: e})
    }

    const handleNeed = (e) => {
        setData({...data, needType: e})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveCustomerAction(data)
        console.log("handleSubmit", data)
    }

    if (redirect === true) {
        return <Redirect to="/customer"/>
    }

    return (
        <div>
            <Container error={error} />
            <Card body inverse style={{ backgroundColor: '#333' }}>
                <CardHeader tag="strong" className="text-center">FORM</CardHeader>
                <CardBody>
                    {!isLoading ?
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="name" sm={5} size="lg">Name</Label>
                                <Input required
                                       onChange={handleChange} type="text" value={data?.name || ''}
                                       name="name" bsSize="lg" placeholder="Name"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="idNumber" sm={5} size="lg">Id Card</Label>
                                <Input required
                                       onChange={handleChange} type="number" value={data?.idNumber || ''}
                                       name="idNumber" bsSize="lg" placeholder="Id Card"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email" sm={5} size="lg">Email</Label>
                                <Input required
                                       onChange={handleChange} type="email" value={data?.email || ''}
                                       name="email" bsSize="lg" placeholder="Email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="address" sm={5} size="lg">Address</Label>
                                <Input required
                                       onChange={handleChange} type="text" value={data?.address || ''}
                                       name="address" bsSize="lg" placeholder="Address"
                                />
                            </FormGroup>
                            <FormGroup>
                                <DropdownList
                                    label="Type of customer"
                                    data={[
                                        {value: "NON", label: "NON"},
                                        {value: "REGULAR", label: "REGULAR"},
                                        {value: "CONTRACT", label: "CONTRACT"}
                                    ]}
                                    value={data?.employeeType}
                                    placeholder="Select Employee Type"
                                    handleDropdown={handleEmployee}
                                />
                                {console.log(data)}
                            </FormGroup>

                            <FormGroup>

                                <DropdownList
                                    label="Need Type"
                                    data={[
                                        {value: "CAPITAL", label: "CAPITAL"},
                                        {value: "CONSUMPTIVE", label: "CONSUMPTIVE"},
                                        {value: "INVESTMENT", label: "INVESTMENT"}
                                    ]}
                                    value={data?.needType}
                                    placeholder="Select Need Type"
                                    handleDropdown={handleNeed}
                                />
                                {console.log(data)}
                            </FormGroup>

                            <Button color="primary">
                                <FontAwesomeIcon icon={faSave}/>
                                {id > 0 ? "Update" : "Submit"}
                            </Button>
                        </Form> :
                        <div>
                            Loading ...
                        </div>
                    }
                </CardBody>
            </Card>
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

const mapDispatchToProps = {findCustomerById: findCustomerByIdAction, saveCustomerAction}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)
