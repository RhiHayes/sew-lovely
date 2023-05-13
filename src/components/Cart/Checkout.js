import React from 'react';
import classes from "./Checkout.module.css"

const Checkout = () => {
    return (
        <div className={classes.thank_you_container}>
        <h1 className={classes.thank_you_title}>Thank you for choosing Sew Lovely!</h1>
        <p>If you want to view some of my other projects, please check out my socials!</p>
        <span><a href="https://www.linkedin.com/in/rhiannon-nicole-hayes/" target="_blank" ><img className={`${classes.grow} ${classes.socials}`} src="https://share-project.site/images/homepage-images/linkedin.png"/></a></span>
        <span><a href="https://github.com/RhiHayes" target="_blank"><img className={`${classes.grow} ${classes.socials}`}  src="https://share-project.site/images/homepage-images/github.png"/></a></span>
        <br />
        <p>OR click the icon to email me!<br /><img className={classes.arrow} src="https://emojigraph.org/media/emojidex/down-arrow_2b07-fe0f.png" /></p>
        <a href="mailto:rhiannon.nicole.hayes@gmail.com"><img className={`${classes.rhi} ${classes.grow}`} src="https://rhidesigns.art/rhi-images/rhi-mail.png"/></a>
        </div>
    )
}

export default Checkout;
