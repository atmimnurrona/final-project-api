import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandshake, faInfoCircle, faPencilAlt, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";

const CustomerRow = ({data, onUpdate, number}) => {
    return (
        <tr>
            <td>{number}</td>
            <td>{data.name}</td>
            <td>{data.idNumber} </td>
            <td>{data.email}</td>
            {/*<td>{data.address}</td>*/}
            <td>{data.employeeType}</td>
            {/*<td>{data.needType}</td>*/}
            <td>
                <Button href={`/customer/detail/${data.id}`} style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </Button>{' '}
                <Button href={`/customer/edit/${data.id}`} style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faPencilAlt}/>
                </Button>{' '}
                <Button href={`/transaction/form/${data.id}`} style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faHandshake}/>
                </Button>{' '}
                <Button style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>{' '}
                {/*<Button outline color="primary">*/}
                {/*    <Link to={`/customer/detail/${data.id}`}>Detail</Link>*/}
                {/*</Button>{' '}*/}
                {/*<Button onClick={onUpdate} outline color="primary">*/}
                {/*    <Link to={`/customer/edit/${data.id}`}>Edit</Link>*/}
                {/*</Button>{' '}*/}
                {/*<Button outline color="primary">*/}
                {/*    <Link to={`/transaction/form/${data.id}`}>Transaction</Link>*/}
                {/*</Button>*/}
            </td>
        </tr>
    )
}

export default CustomerRow;
