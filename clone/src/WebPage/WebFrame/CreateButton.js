import React, {useState} from "react";
import CreateRoom from "./createRoom";
import styled from 'styled-components';

const Button = styled.button`
    font-size: 14px;
    color: #FFFFFF;
    background-color: #A593E0;
    border-radius: 2px;
    border: 0;
    padding: 10px;
    text-decoration : none;
`;

function CreateButton() {

    const [open, setOpen] = useState(false);

    const openState = () => {
        setOpen(true);
    }

    const closeState = () => {
        setOpen(false);
    }

    return (
        <>
            <Button onClick={openState}>Create Room</Button>
            {open && <CreateRoom isOpen={openState} close={closeState}/>}
        </>
    );
}

// class CreateButton extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isModalOpen: false
//         };
//     }
//
//     openModal = () => {
//         this.setState({isModalOpen: true});
//     };
//
//     closeModal = () => {
//         this.setState({isModalOpen: false});
//     };
//
//     render() {
//         return (
//             <>
//                 <Button onClick={this.openModal}>Create Room</Button>
//                 <CreateRoom isOpen={this.state.isModalOpen} close={this.closeModal}/>
//             </>
//         );
//     }
// }

export default CreateButton;