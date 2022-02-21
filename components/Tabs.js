import React, { useState } from 'react'


function Tabs() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };


    return (
        <>
            <div className='container'>
                <div className='row'>
                    <input className="ten columns" type="text" placeholder="Search.." />
                    <button className='button-primary two columns'>+ New</button>
                </div>
                <div className='blocTabs'>
                    <div className={toggleState === 1 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(1)}>Clients</div>
                    <div className={toggleState === 2 ? "tabs activeTabs" : "tabs"} onClick={() => toggleTab(2)}>Contacts</div>
                </div>
                <div className='contentTabs'>
                    <div  className={toggleState === 1 ? "content  activeContent" : "content"}>
                        <h5>Clients</h5>
                        <hr />
                        <center>List of Clients</center>
                    </div>
                    <div  className={toggleState === 2 ? "content  activeContent" : "content"}>
                        <h5>Contacts</h5>
                        <hr />
                        <center>List of Contacts</center>
                    </div>
                </div>
            </div>
            <style jsx>{`
            *, ::before, ::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            }

            body {
            background: #fff;
            }

            .container {
            display: flex;
            flex-direction: column;
            position: relative;
            background: #f1f1f1;
            margin: 100px auto 0;
            word-break: break-all;
            border: 1px solid rgba(0, 0, 0, 0.274);
            }

            .row {
                padding: 10px 15px;
                display: flex;
                gap: 15px;
            }

            .blocTabs {
            display: flex;
            }



            .tabs {
            padding: 15px;
            text-align: center;
            width: 50%;
            background: rgba(128, 128, 128, 0.075);
            cursor: pointer;
            border-bottom: 1px solid rgba(0, 0, 0, 0.274);
            box-sizing: content-box;
            position: relative;
            outline: none;
            }

            .tabs:not(:last-child){
            border-right: 1px solid rgba(0, 0, 0, 0.274);
            }

            .activeTabs  {
            background: white;
            border-bottom: 1px solid transparent;
            }

            .activeTabs::before {
            content: "";
            display: block;
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% + 2px);
            height: 5px;
            background: rgb(88, 147, 241);
            }

            button {
            border: none;
            }
            .contentTabs {
            flex-grow : 1;
            }
            .content {
            background: white;
            padding: 20px;
            width: 100%;
            height: 100%;
            display: none;
            }
            
            .activeContent {
            display: block;
            }
            `}</style>
        </>
    )
}

export default Tabs