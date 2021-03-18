import {InputGroupText, InputGroup, FormGroup, Form, Input, Label, Button, Col} from "reactstrap";
import Container from "../../../components/Containers/Container";
import {Redirect, useHistory, useParams} from 'react-router-dom'
import {saveTransactionAction} from "../../../actions/transactionAction";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import {findCustomerByIdAction} from "../../../actions/customerAction";
import HeaderMaster from "../../../components/navbar/NavbarMaster";

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
        <div>
            <Container error={error}/>
                <HeaderMaster/>
                <div className="container" style={{marginTop:"10px"}}>
                    <h1 style={{fontSize:"3vw", color:"#e42556", margin:"3%", textAlign:"center"}}>Form Transaction</h1>
                    <div className="col-md-13">
                        <div className="form form-container">
                            {!isLoading ?
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup row>
                                        <Label for="notes" sm={2}>Note</Label>
                                        <Col sm={10}>
                                            <Input
                                                required
                                                onChange={handleChange}
                                                value={data?.notes || ''}
                                                type="text"
                                                name="notes"
                                                id="notes"
                                                placeholder="input note"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="income" sm={2}>Income</Label>
                                        <Col sm={10}>
                                            <InputGroup>
                                                <InputGroupText>Rp</InputGroupText>
                                                <Input required
                                                       onChange={handleChange}
                                                       value={data?.income || ''}
                                                       placeholder="income"
                                                       min={0} max={100}
                                                       type="number"
                                                       step="1" />
                                                <InputGroupText>.00</InputGroupText>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="outcome" sm={2}>Outcome</Label>
                                        <Col sm={10}>
                                            <InputGroup>
                                                <InputGroupText>Rp</InputGroupText>
                                                <Input required
                                                       onChange={handleChange}
                                                       value={data?.outcome || ''}
                                                       placeholder="outcome"
                                                       min={0} max={100}
                                                       type="number"
                                                       step="1" />
                                                <InputGroupText>.00</InputGroupText>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="loan" sm={2}>Loan</Label>
                                        <Col sm={10}>
                                            <InputGroup>
                                                <InputGroupText>Rp</InputGroupText>
                                                <Input required
                                                       onChange={handleChange}
                                                       value={data?.loan || ''}
                                                       placeholder="loan"
                                                       min={0} max={100}
                                                       type="number"
                                                       step="1" />
                                                <InputGroupText>.00</InputGroupText>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="tenor" sm={2}>Tenor</Label>
                                        <Input required
                                               onChange={handleChange}
                                               type="number"
                                               value={data?.tenor || ''}
                                               name="tenor"
                                               placeholder="tenor"/>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="interestRate" sm={2}>Interest Rate</Label>
                                        <Col sm={10}>
                                            <InputGroup>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    value={data?.interestRate || ''}
                                                    placeholder="interest rate" min={0} max={100} type="number" step="1" />
                                                <InputGroupText>%</InputGroupText>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{size: 10, offset: 2}}>
                                            <Button style={{background:"#e42256"}}>
                                                <FontAwesomeIcon icon={faSave}/>
                                                {id > 0 ? "  Update" : "  Submit"}
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

            {/*        <Container>*/}
            {/*        <Card body inverse style={{ backgroundColor: '#333' }}>*/}
            {/*            <CardHeader tag="strong" className="text-center">Form Transaction</CardHeader>*/}
            {/*            <CardBody>*/}
            {/*                {!isLoading ?*/}
            {/*                    <Form onSubmit={handleSubmit}>*/}
            {/*                        <FormGroup>*/}
            {/*                            <Label htmlFor="notes" sm={5} size="lg">Note</Label>*/}
            {/*                            <Input required*/}
            {/*                                   onChange={handleChange} type="text" value={data?.notes || ''}*/}
            {/*                                   name="notes" bsSize="lg" placeholder="Notes"*/}
            {/*                            />*/}
            {/*                        </FormGroup>*/}
            {/*                        <FormGroup>*/}
            {/*                            <Label htmlFor="income" sm={5} size="lg">Income</Label>*/}
            {/*                            <Input required*/}
            {/*                                   onChange={handleChange} type="number" value={data?.income || ''}*/}
            {/*                                   name="income" bsSize="lg" placeholder="Income"*/}
            {/*                            />*/}
            {/*                        </FormGroup>*/}
            {/*                        <FormGroup>*/}
            {/*                            <Label htmlFor="outcome" sm={5} size="lg">Outcome</Label>*/}
            {/*                            <Input required*/}
            {/*                                   onChange={handleChange} type="number" value={data?.outcome || ''}*/}
            {/*                                   name="outcome" bsSize="lg" placeholder="outcome"*/}
            {/*                            />*/}
            {/*                        </FormGroup>*/}
            {/*                        <FormGroup>*/}
            {/*                            <Label htmlFor="loan" sm={5} size="lg">Loan</Label>*/}
            {/*                            <Input required*/}
            {/*                                   onChange={handleChange} type="number" value={data?.loan || ''}*/}
            {/*                                   name="loan" bsSize="lg" placeholder="Loan"*/}
            {/*                            />*/}
            {/*                        </FormGroup>*/}
            {/*                        <FormGroup>*/}
            {/*                            <Label htmlFor="tenor" sm={5} size="lg">Tenor</Label>*/}
            {/*                            <Input required*/}
            {/*                                   onChange={handleChange} type="number" value={data?.tenor || ''}*/}
            {/*                                   name="tenor" bsSize="lg" placeholder="tenor"*/}
            {/*                            />*/}
            {/*                        </FormGroup>*/}
            {/*                        <FormGroup>*/}
            {/*                            <Label htmlFor="interestRate" sm={5} size="lg">Interest</Label>*/}
            {/*                            <Input required*/}
            {/*                                   onChange={handleChange} type="number" value={data?.interestRate || ''}*/}
            {/*                                   name="interestRate" bsSize="lg" placeholder="Interest Rate"*/}
            {/*                            />*/}
            {/*                        </FormGroup>*/}

            {/*                        <Button color="primary">*/}
            {/*                            <FontAwesomeIcon icon={faSave}/>*/}
            {/*                            {id > 0 ? "Update" : "Submit"}*/}
            {/*                        </Button>*/}
            {/*                    </Form> :*/}
            {/*                    <div>*/}
            {/*                        Loading ...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </CardBody>*/}
            {/*        </Card>*/}
            {/*    </Container>*/}
            {/*</Container>*/}
        </div>
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