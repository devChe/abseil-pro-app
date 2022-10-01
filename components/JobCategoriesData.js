import React from 'react'
import { async } from '@firebase/util'
import { db } from '../src/config/firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const JobCategoriesData = ({category}) => {

    const deleteCategory = async (id) => {
        const categoryDoc = doc(db, "jobCategories", id);
        await deleteDoc(categoryDoc);
        window.location.reload(false)
      }
  return (
    <>
        <tr>
            <td style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                    {category.name}
                </div>
                <div>
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => {deleteCategory(category.id)}} width="35" className='trashIcon' />
                </div>
            </td>
        </tr>
        <style jsx>{`
            td, th {
                border: 1px solid #dddddd;
                padding: 8px;
                white-space: nowrap;
                transition: .15s ease;
                
            }

            tr:hover {
                background-color: lightgrey;
                color: white;
                cursor: pointer;
            }
            
            tr:active {
                background: darkgrey;
            }
        `}</style>
    </>
  )
}

export default JobCategoriesData