import {FormGroup, Card, CardBody, CardHeader, Container, Form, Input, Label, Button} from "reactstrap";
import Containers from "../../../components/Containers"
import {Redirect, useHistory, useParams} from 'react-router-dom'
import {saveTransactionAction} from "../../../actions/transactionAction";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {findCustomerByIdAction} from "../../../actions/customerAction";

const TransactionForm = ({ savedTransaction, isLoading, error , saveTransactionAction, customer, findCustomerByIdAction}) => {
    const {id} = useParams()
    const [redirect] = useState(false)
    const [data, setData] = useState({
        customer : ""
    })
    const history = useHistory()

    const handleCustomer = () => {
        setData({
            ...data,
            customer : customer.id
        })
    }

    useEffect(() => {
        if (id  !== data.customer) {
            findCustomerByIdAction(id);
            setData({
                ...data,
                customer : id
            })
        }
    }, [])

    useEffect(() => {
        console.log(`CUSTOMER `, customer, `DATA ` ,data)
    }, [data])

    useEffect(() => {
        if(savedTransaction) {
            history.push('/master/transaction')
        }
    }, [savedTransaction, history])

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setData({...data, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveTransactionAction(data)
        console.log(data)
    }
    if (redirect === true) {
        return <Redirect to='/transaction'/>
    }

    return(
        <Containers error={error}>
            <Container>
                <Card body inverse style={{ backgroundColor: '#333' }}>
                    <CardHeader tag="strong" className="text-center">
                        FORM
                    </CardHeader>

                    <CardBody>
                        {!isLoading ?
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="notes">Note</Label>
                                    <Input required
                                           onChange={handleChange} type="text" value={data?.notes || ''}
                                           name="notes" bsSize="lg" placeholder="Notes"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="income">Income</Label>
                                    <Input required
                                           onChange={handleChange} type="number" value={data?.income || ''}
                                           name="income" bsSize="lg" placeholder="Income"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="outcome">Outcome</Label>
                                    <Input required
                                           onChange={handleChange} type="number" value={data?.outcome || ''}
                                           name="outcome" bsSize="lg" placeholder="outcome"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="loan">Loan</Label>
                                    <Input required
                                           onChange={handleChange} type="number" value={data?.loan || ''}
                                           name="loan" bsSize="lg" placeholder="Loan"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="">Tenor</Label>
                                    <Input required
                                           onChange={handleChange} type="number" value={data?.tenor || ''}
                                           name="tenor" bsSize="lg" placeholder="tenor"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="interestRate">Interest</Label>
                                    <Input required
                                           onChange={handleChange} type="number" value={data?.interestRate || ''}
                                           name="interestRate" bsSize="lg" placeholder="Interest Rate"
                                    />
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
            </Container>
        </Containers>
    )
}

const mapStateToProps = (state) => {
    return {
        customer: state.findCustomerByIdReducer.data,
        savedTransaction: state.saveTransactionReducer.data,
        isLoading: state.saveTransactionReducer.isLoading,
        error: state.saveTransactionReducer.error
    }
}

const mapDispatchToProps = {findCustomerByIdAction ,saveTransactionAction}

export default connect(mapStateToProps, mapDispatchToProps) (TransactionForm)