import React, { useState } from 'react';
import { Image, Button, Modal, Spin } from 'antd';
import ReactJson from 'react-json-view';
import './App.css';

// 1. SET OPIN CONFIGURATION
var options = {
  'mediaProperties' : ['blt44c3fa8af828ad1f'],
  "baseURL" : "https://stag-nba-api.opin.media",
	"sessionType": "cookie",
  "cookieDomain": "",
  "env": "stag"
};

// 2. INTIALIZE WITH OPiN constructor.
// Note: "window" keyword is needed only for react app
// var opin = new OPiN(options) for vanilla javascript
var opin = new window.OPiN(options)
var envData={
  'countryCode': 'IN'   //filter Partner based on Country
}
opin.setLocale('en-US') //sets Translation Language

/**
 * Main APP Function
 */
const App = () => {
	const [loader, setLoader] = useState(false);
	const [enableExecuteAgain, setEnableExecuteAgain] = useState(false);

	const [partners, setPartners] = useState([]);
	const [signInTranslations, setSignInTranslations] = useState(null)
	

	/**
	 * syncTranslations function Executed 
	 * @param {*} partner - This is a partner instance
	 * @param {Object} tags - This is the translation tag object 
	 */
	const syncTranslations = (partner, tags) => {
		return partner.syncTranslations(tags)
	}

  /*
   * Detect Partner function Executed
   */
  const detectPartner = () => {
		setLoader(true)
    // 3. Gets the list of partners
    opin.detectPartners(envData)
			.then((partners) => {
        // use the partners list to display in UI
				setPartners(partners);
				setLoader(false);
    		// access partner data from partners[0].data
				// or use various methods provided by the SDK
		}).catch((err) => {
  		// error while detecting partners
		})
	}
	
	/**
	 * execute Work Flow function Executed
	 * @param {*} partner - This is a partner instance
	 */
  const executeWorkflow = (partner) => {
		if (signInTranslations){
			const { data } = signInTranslations;
			setEnableExecuteAgain(!data.login_redirect)
		}
    const dom_selector = '#opin-wrapper'
    partner.executeWorkflow(dom_selector)
		.then(jwtToken => {
			/** 
			 * The JWT Token is given back in this block.
			 * Note: This does not work in OAUTH and SAML based login types when Full Page is redirected for Sign In screen.
			 * We need a endpoint hosted by the SDK integrator to get the token. We call it '/opint' endpoint. 
			**/
			alert("You have logged in!")
			alert(`This is .executeWorkflow() JWT response : ${jwtToken}`);
			
			setEnableExecuteAgain(false)
			//Clearing out dom selectors HTML content
			document.querySelector(dom_selector).innerHTML = '';
		})
		.catch(err => {
			//When subscription error occurs
			alert(err.type)
			setEnableExecuteAgain(false)

			//Clearing out dom selectors HTML content
			document.querySelector(dom_selector).innerHTML = '';
		});
	}

	/**
	 * Logout user
	 */
	const logout = () => {
		setLoader(true)
		return opin.logout()
		.then(() =>{
			setSignInTranslations(null)
			setPartners([])
			setLoader(false)
		})
	}
	
	/**
	 * Gets logged in partner
	 */
	const getLoggedInPartner = () => {
		return opin.getLoggedInPartner()
	}

	/**
	 * renders Logged in partner
	 */
	const renderLoggedInPartner = () => {
		return (
			<>
				<p>Welcome you're logged In </p>
				<Button 
					type="primary"
					onClick={()=>logout()}
				>
					Logout
				</Button>
			</>
		)
	}

	/**
	 * renders the sign in box
	 */
	const renderSignInBox = () => {
		const parterData = signInTranslations.data
		const { logo, partner_configuration_name, login_redirect, partner_type } = parterData

		if(enableExecuteAgain){
			return (
				<>
					<Button 
						type="primary"
						onClick={()=>executeWorkflow(signInTranslations)}
					>
						Try Execute Workflow Again
					</Button>
					<br /><br />
					<hr />
				</>
			)
		}

		return (
			<>
				<Image
					width={200}
					src={logo}
					placeholder={
						<Spin size="large" />
					}
				/>
				<h2>{ signInTranslations.getName() } - {( login_redirect ? "Redirect Full Page" : "Same Window" )}</h2>
				<Button 
					type="primary"
					onClick={()=>executeWorkflow(signInTranslations)}
				>
					Execute Workflow
				</Button>
			</>
		)
	}

  /*
   * Parter List Display
   */
  const partnerList = ()=> {
		const styleObj = {
			color : "blue"
		}

		// Checks if partners list is empty
		if(partners && partners.length <= 0){
			return(
				<h2 style={{ color: `#a93f3f` }}>No Partner found please click detect button or check SDK configuration!</h2>
			)
		}

    return (
        <div>
					{ partners.map( partner => {
							return (
								<div style={{ border : `1px solid grey`, margin: `1% 30%`}} key={partner.getConfigurationUid()}>
									<h2 style={styleObj}>{ partner.getName() } - {( partner.data.login_redirect ? "(Full Page Redirect Partner)" : "(Non Full Page redirect Partner)" )}</h2>
									<Button
										type="primary"
										onClick={()=>setSignInTranslations(partner)}
									>
											Activate
									</Button><br/><br/>
								</div>
							)
						})
					}
        </div>
    )
	}
	
	/**
	 * Main render function
	 */
	return (
		<div className="App"><br/>
			{/* Checks if a partner is already logged in */}
			{ opin.hasLoggedInPartner() ? loader ? <Spin size="large" /> : renderLoggedInPartner() : (
				<div>
					{/* Checks if the user has clicked on any partner then renders the sign in box for the partner or else renders the list of partners */}	
					{signInTranslations ? renderSignInBox() : (
						<>
							<Button onClick={() => detectPartner()}>Detect Partner</Button><br/><br/>
							{loader ? <Spin size="large" /> : partnerList()}
						</>
					)}
				</div>
			)}
			<div id="opin-wrapper" style={{height:`100vh`}} />
		</div>
	);
}

export default App;
