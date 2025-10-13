import './AllCards.css';

export function AllCards({cards}) {

    if(!cards) return <div>Loading......</div>              // This is to avoid the rendering of cards before they are successfully fetched

    // console.log(cards)

    return <div> 
        {
            cards.map(function(cardEle, i) {
                console.log(cardEle.name);
                return <div class="main-container">
                <p> Name : {cardEle.name}</p>
                <p> Description : {cardEle.description}</p>

                <p> Interests : </p>
                <ul>
                    {
                        cards?.[0]?.interests?.length
                        ? cardEle.interests.map((ele, index) => <li>{index + 1} : {ele} </li>)
                        : <div>No element</div>
                    }
                </ul>

                <p> Socials : </p>   
                <ul>
                    {
                        cards?.[0]?.socials?.length
                        ? cardEle.socials.map((ele, index) => {

                            const platform = Object.keys(ele);
                            // console.log(platform);
                            const link = Object.values(ele);
                            // console.log(link);
                            return <div class="links-div">
                                <a href={link} class="links">{platform}</a> 
                            </div> 
                        })
                        : <li>No element</li>
                    }
                </ul>
                </div>
            })
        }
    </div>
}
