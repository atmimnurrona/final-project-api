import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandshake, faInfoCircle, faPencilAlt, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import CustomerDetail from "../CustomerDetail";

const CustomerRow = ({data, onUpdate, number}) => {

    return (
        <tr>
            <td>{number}</td>
            <td>{data.name}</td>
            <td>{data.idNumber} </td>
            <td>{data.email}</td>
            {/*<td>{data.address}</td>*/}
            <td>{data.employeeType}</td>
            <td>
                {/*<CustomerDetail/>{' '}*/}
                <Button onClick={data} href={`/customer/${data.id}/detail`} style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </Button>{' '}
                <Button onClick={onUpdate} href={`/customer/${data.id}/edit`} style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faPencilAlt}/>
                </Button>{' '}
                <Button href={`/transaction/form/${data.id}`} style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faHandshake}/>
                </Button>{' '}
                <Button style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>{' '}
            </td>
        </tr>
    )
}

export default CustomerRow;
