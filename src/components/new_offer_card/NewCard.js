import CardStyle from './NewCard.module.css'
import React from 'react';

const NewCard = ({_onSubmit}) => {
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

                    <input type="submit" value="Submit" onSubmit={_onSubmit}></input>
                </form>
            </div>
    );
}

export default NewCard;
