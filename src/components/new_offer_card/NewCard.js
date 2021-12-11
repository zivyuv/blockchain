import CardStyle from './NewCard.module.css'
import React, {useRef} from 'react';

const NewCard = ({postOffer}) => {

    const headerRef = useRef();
    const contentRef = useRef();
    const priceRf = useRef();
    const submitHandler = (event) => {
    event.preventDefault();

    const enteredHeader = userNameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    return (
            <div className={CardStyle.container}>
                <form>
                    <label >Headline</label>
                    <input type="text" id="headline" name="healine" placeholder="Enter Healine.."/>  

                    <label >Content</label>
                    <input type="text" id="content" name="content" placeholder="Enter Content.."/>  

                    <label >Price</label>
                    <input type="text" id="price" name="price" placeholder="Enter Price.."/>  
                    
                    <label >Url to social network</label>
                    <input type="url" id="url" name="url" placeholder="Enter url.."/>  

                    <input type="submit" value="Submit" onSubmit={() => postOffer()}></input>
                </form>
            </div>
    );
}

export default NewCard;
