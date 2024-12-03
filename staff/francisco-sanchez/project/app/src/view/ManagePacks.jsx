import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContext from './useContext'

import { Button } from '../library/index';

export default function ManagePacks(props) {

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    const handleAssignPacks = event => {
        console.log('Assign Pack Clicked');
        props.onAssignPackClick()
    };

    const handleCreatePacks = event => {
        console.log('Create Pack Clicked');
        props.onCreatePackClick()
    };


    return (
        <div>
            <h1>Manage Packs</h1>
            <p>This will be the page to manage packs</p>

            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Single hour</td>
                        <td>50 EUR</td>
                        <td><a href="">✏️</a> <a href="">❌</a></td>
                    </tr>
                    <tr>
                        <td>Pack 5 hours</td>
                        <td>235 EUR</td>
                        <td><a href="">✏️</a> <a href="">❌</a></td>
                    </tr>
                    <tr>
                        <td>Single hour</td>
                        <td>450 EUR</td>
                        <td><a href="">✏️</a> <a href="">❌</a></td>
                    </tr>

                </tbody>
            </table>

            <div className="flex flex-col ">
                <Button className="btn m-2" onClick={handleAssignPacks}>Assign pack WIP</Button>
                <Button className="btn m-2" onClick={handleCreatePacks}>Create new WIP</Button>

            </div>

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </div>
    )

}