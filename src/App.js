import React, { useState } from 'react';
import { Image, Button, Modal, Spin } from 'antd';
import ReactJson from 'react-json-view';
import './App.css';

// 1. SET OPIN CONFIGURATION
var options = {
  'mediaProperties' : ['blt988d82fa41b9e28a'],
  "baseURL" : "https://dev-nba-api.opin.media"
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
	const [partners, setPartners] = useState([]);
	const [loggedInPartner, setLoggedInPartner] = useState(null)
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
    var dom_selector = '#opin-wrapper'
    partner.executeWorkflow(dom_selector);
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
	 * fetches the logged in partners trasnlations
	 */
	const fetchLoggedInSyncTranslations = () => {
		setLoader(true)
		getLoggedInPartner()
		.then((partner) => {
			return syncTranslations(partner)
		})
		.then((partner) => {
			setLoggedInPartner(loggedInPartner)
			setLoader(false)
		})
	}

	/**
	 * 
	 */
	const renderSyncTrasnlations = () => {
		// const {} = loggedInPartner
		console.log("loggedInPartner ", loggedInPartner);
		return (
			<p>Sync Trasnlations data</p>
		)
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
				<br />
				<br />
				<Button
					type="primary"
					onClick={()=>fetchLoggedInSyncTranslations()}
				>
					Sync Translations
				</Button>
				<div>
				{ 
					!loggedInPartner && loader ? <Spin size="large" /> : 
					loggedInPartner && !loader ? renderSyncTrasnlations() : ""
				}
				</div>
			</>
		)
	}

	/**
	 * renders the sign in box
	 */
	const renderSignInBox = () => {
		const parterData = signInTranslations.data
		const { logo, partner_configuration_name, login_redirect, partner_type } = parterData
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
    return (
        <div>
					{ partners.map( partner => {							
							return (
								<div key={partner.getConfigurationUid()}>
									<h2 style={styleObj}>{ partner.getName() } - {( partner.data.login_redirect ? "Redirect Full Page" : "Same Window" )}</h2>
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
			<div id="opin-wrapper" style={{height:300}} />
		</div>
	);
}

export default App;
