import React, { useState, useEffect } from 'react';
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
	const [syncLoader, setSyncLoader] = useState(false);

	const [partners, setPartners] = useState([]);
	const [loggedInPartner, setLoggedInPartner] = useState(null)
	const [signInTranslations, setSignInTranslations] = useState(null)


	useEffect(() => {
	}, [])
	

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
			setLoggedInPartner(null)
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
	 * fetches the logged in partners translations
	 */
	const fetchLoggedInSyncTranslations = () => {
		setSyncLoader(true)
		//gets logged in partner information
		getLoggedInPartner()
		.then((partner) => {
			// calls sync translations
			return syncTranslations(partner)
		})
		.then((partner) => {
			//sets the logged in partner
			setLoggedInPartner(partner)
			setSyncLoader(false)
		})
	}

	/**
	 * renders sync translation data 
	 */
	const renderSyncTrasnlations = () => {
		const { partner_name, partner_type, logged_in_short_description, partner_configuration_name, partner_configuration_uid } 
		= loggedInPartner.data
		return (
			<>
				<h2 style={{
					color : "blue"
				}}>{partner_name} </h2>
				<p><b>UID :</b> {partner_configuration_uid} </p>
				<p><b>Partner Configuration Name :</b> {partner_configuration_name}</p>
				<p><b>Partner Type :</b> {partner_type}</p>
				<p><b>Description :</b> {logged_in_short_description}</p>
			</>
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
				<br />
				<br />
				<div>
				{ 
					!loggedInPartner && syncLoader ? <Spin size="large" /> : 
					loggedInPartner && !syncLoader ? renderSyncTrasnlations() : ""
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
