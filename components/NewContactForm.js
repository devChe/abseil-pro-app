import React from 'react'

function NewContactForm({
    client,
    addContact,
    email,
    setEmail,
    name,
    setName,
    phone,
    setPhone,
    position,
    setPosition
}) {
  return (
    <>
        <div>
            <div>
                <label>Contact Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Contact Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
                <label>Contact Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Contact Position</label>
                <input value={position} onChange={(e) => setPosition(e.target.value)} />
            </div>
        </div>
        <button onClick={addContact}>Submit</button>
    </>
  )
}

export default NewContactForm