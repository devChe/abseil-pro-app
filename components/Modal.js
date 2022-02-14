/* eslint-disable @next/next/link-passhref */
import { AOS } from 'aos'
import Link from 'next/link'
import React from 'react'

function Modal({logout, user}) {
    
    return (
        <div>
            <div id="myModal" className="modal">

                {/* Modal content */}
                <div className="modal-content" data-aos="fade-down">
                    <h2>Please login</h2>
                    <div>
                        <Link href="/login"><button>Login</button></Link>
                    </div>
                </div>

            </div>
            <style jsx>{`
                .modal {
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0,0,0,0.7);
                }

                /* Modal Content/Box */
                .modal-content {    
                    background-color: #fefefe;
                    margin: 15% auto; /* 15% from the top and centered */
                    border: 1px solid #888;
                }
            `}</style>
        </div>
    )
}

export default Modal