import CardStyle from './NewCard.module.css'
import React, {useRef} from 'react';

const NewCard = ({postOffer}) => {

    const headerRef = useRef();
    const contentRef = useRef();
    const priceRf = useRef();
    const urlRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredHeader = headerRef.current.value;
        const enteredContent = contentRef.current.value;
        const enteredPrice = priceRf.current.value;
        const enteredUrl = urlRef.current.value;
        
        postOffer(enteredHeader, enteredContent, enteredPrice)
        .then(_ => {
            console.log("card added");
        })
    }
    return (
            <div className={CardStyle.container }>
                <form onSubmit={submitHandler}>
                    <label >Headline</label>
                    <input type="text" id="headline" name="healine text-info" placeholder="Enter Healine.." ref={headerRef}/>  

                    <label >Content</label>
                    <input type="text" id="content" name="content" placeholder="Enter Content.." ref={contentRef} rows="3"/>  

                    <label >Price</label>
                    <input type="text" id="price" name="price" placeholder="Enter Price.." ref={priceRf}/>  
                    
                    <label >Url to social network</label>
                    <input type="url" id="url" name="url" placeholder="Enter url.." ref={urlRef}/>  

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
    );
}

export default NewCard;
