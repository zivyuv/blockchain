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
                    <div className='text-info'>
                    <label><strong>Headline</strong></label>
                    <input type="text" id="headline" name="healine" placeholder="Enter Headline.." ref={headerRef}/>  

                    <label ><strong>Item Description</strong></label>
                    <textarea type="text" id="content" name="content" placeholder="Enter Content.." ref={contentRef} style={{width:"100%"}} rows='2'/>  

                    <label ><strong>Price</strong></label>
                    <input type="text" id="price" name="price" placeholder="Enter Price.." ref={priceRf}/>  
                    
                    <label ><strong>Upload Item</strong></label>
                    {/* insert option to browse item from computer */}
                    <input type="url" id="url" name="url" placeholder="Enter url.." ref={urlRef}/>  
                    </div>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
    );
}

export default NewCard;
